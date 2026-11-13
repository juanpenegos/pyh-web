// LÓGICA del formulario de Contacto (hook). FormularioContacto.tsx solo dibuja lo que esto le da.
// - Valida con src/aplicacion/validacion/contacto.ts al salir de cada campo y al enviar.
// - Estados: escribiendo → enviando → recibido (o error, con un aviso arriba del botón).
// - Si la dirección trae ?motivo=facturacion, ese motivo queda elegido.
// - Campo trampa: si un robot lo llena, se hace como si todo saliera bien, sin enviar nada.
// - Un mismo envío lleva siempre el mismo idSolicitud (el backend no duplica el mensaje).
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { MotivoContacto } from '@dominio/contacto';
import type { TextosFormularioContacto } from '@dominio/paginas/contacto';
import { esquemaContacto, type EntradaContacto } from '@aplicacion/validacion/contacto';
import { validar, type ErroresFormulario } from '@aplicacion/validacion/validar';
import { leerCampana, leerMotivo } from '@aplicacion/contacto/campana';
import { comoErrorServicio } from '@aplicacion/errores/ErrorServicio';
import { emitirEvento } from '@ui/utilidades/analitica';

// Lo que va escribiendo la persona (la casilla empieza sin marcar, por eso es boolean)
export type Valores = Omit<EntradaContacto, 'motivo' | 'aceptaPolitica'> & { aceptaPolitica: boolean };
export type NombreCampo = keyof Valores;

const VACIO: Valores = { nombre: '', empresa: '', celular: '', correo: '', mensaje: '', aceptaPolitica: false };
const ORDEN: NombreCampo[] = ['nombre', 'empresa', 'celular', 'correo', 'mensaje', 'aceptaPolitica'];

export function useFormularioContacto(textos: TextosFormularioContacto, servicio: ServicioContacto) {
  const [motivo, setMotivo] = useState<MotivoContacto>(textos.motivos[0].valor);
  const [valores, setValores] = useState<Valores>(VACIO);
  const [tocados, setTocados] = useState<Partial<Record<NombreCampo, boolean>>>({});
  const [erroresServidor, setErroresServidor] = useState<ErroresFormulario<Valores>>({});
  const [estado, setEstado] = useState<'escribiendo' | 'enviando' | 'recibido'>('escribiendo');
  const [aviso, setAviso] = useState<{ texto: string; reintentar: boolean } | null>(null);
  const [trampa, setTrampa] = useState('');
  const idSolicitud = useRef<string | null>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const tituloExito = useRef<HTMLHeadingElement>(null);

  // Motivo que viene en la dirección (?motivo=facturacion)
  useEffect(() => {
    const desdeUrl = leerMotivo(window.location.search);
    if (desdeUrl) setMotivo(desdeUrl);
  }, []);

  // Al terminar, el foco pasa al título "Mensaje recibido." (el lector de pantalla lo anuncia)
  useEffect(() => {
    if (estado === 'recibido') tituloExito.current?.focus();
  }, [estado]);

  const opcionMotivo = textos.motivos.find((m) => m.valor === motivo) ?? textos.motivos[0];
  const erroresReglas = validar(esquemaContacto, { ...valores, motivo });
  const errorDe = (campo: NombreCampo) => erroresServidor[campo] ?? (tocados[campo] ? erroresReglas[campo] : undefined);

  function cambiar<K extends NombreCampo>(campo: K, valor: Valores[K]) {
    setValores((v) => ({ ...v, [campo]: valor }));
    setErroresServidor((e) => ({ ...e, [campo]: undefined }));
    idSolicitud.current = null; // Datos nuevos = envío nuevo
  }

  const tocar = (campo: NombreCampo) => setTocados((t) => ({ ...t, [campo]: true }));

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    if (estado === 'enviando') return;
    setTocados(Object.fromEntries(ORDEN.map((c) => [c, true])));

    const resultado = esquemaContacto.safeParse({ ...valores, motivo });
    if (!resultado.success) {
      setAviso({ texto: textos.revisaCampos, reintentar: false });
      const primero = ORDEN.find((c) => erroresReglas[c]);
      if (primero) formulario.current?.querySelector<HTMLElement>(`#contacto-${primero}`)?.focus();
      return;
    }

    if (trampa) {
      setEstado('recibido');
      return;
    }

    setAviso(null);
    setEstado('enviando');
    emitirEvento({ event: 'contact_form_submit', topic: motivo });
    idSolicitud.current ??= crypto.randomUUID();

    try {
      await servicio.enviar({
        ...resultado.data,
        empresa: resultado.data.empresa || undefined,
        origen: 'web-contacto',
        campana: leerCampana(window.location.search),
        idSolicitud: idSolicitud.current,
      });
      emitirEvento({ event: 'contact_form_success', topic: motivo });
      idSolicitud.current = null;
      setEstado('recibido');
    } catch (error) {
      const e = comoErrorServicio(error);
      setErroresServidor((e.campos ?? {}) as ErroresFormulario<Valores>);
      const general = e.codigo === 'UNKNOWN' || e.codigo === 'SERVICE_UNAVAILABLE';
      setAviso({ texto: e.campos ? textos.revisaCampos : e.mensaje, reintentar: general });
      setEstado('escribiendo');
    }
  }

  function otroMensaje() {
    setValores(VACIO);
    setTocados({});
    setErroresServidor({});
    setAviso(null);
    setEstado('escribiendo');
  }

  return {
    motivo, setMotivo, opcionMotivo,
    valores, cambiar, tocar, errorDe,
    trampa, setTrampa,
    estado, aviso,
    enviar, otroMensaje,
    formulario, tituloExito,
  };
}
