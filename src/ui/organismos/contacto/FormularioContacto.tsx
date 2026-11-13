// FORMULARIO DE CONTACTO (organismo, isla de React) — "Déjanos tu mensaje." (D-Contacto / M-Contacto).
// Solo dibuja: la lógica (validar, enviar, estados) está en useFormularioContacto.ts.
// No sabe a dónde va el mensaje: recibe el servicio por props (WhatsApp, falso o backend).
// Sin JavaScript el formulario se ve, pero no envía nada (method="post" para que los datos
// nunca queden en la dirección); la página muestra un aviso con WhatsApp, teléfono y correo.
import type { ServicioContacto } from '@aplicacion/puertos/ServicioContacto';
import type { TextosFormularioContacto } from '@dominio/paginas/contacto';
import { rellenar } from '@aplicacion/comun/textos';
import Titular from '@ui/atomos/Titular';
import Icono from '@ui/atomos/Icono';
import Boton from '@ui/atomos/Boton';
import Cargando from '@ui/atomos/Cargando';
import Casilla from '@ui/atomos/Casilla';
import { AreaTexto, Entrada } from '@ui/atomos/Control';
import Campo from '@ui/moleculas/Campo';
import GrupoChips from '@ui/moleculas/GrupoChips';
import Alerta from '@ui/moleculas/Alerta';
import { useFormularioContacto } from './useFormularioContacto';
import './FormularioContacto.css';

interface Props {
  textos: TextosFormularioContacto;
  servicio: ServicioContacto;
}

export default function FormularioContacto({ textos, servicio }: Props) {
  const f = useFormularioContacto(textos, servicio);

  if (f.estado === 'recibido') {
    return (
      <div className="form-contacto">
        <span className="form-contacto__visto">
          <Icono nombre="visto" tamano={32} color="#00475D" grosor={3} />
        </span>
        <h2 ref={f.tituloExito} tabIndex={-1} className="form-contacto__titular titulo-paso">
          <Titular titular={textos.exito.titular} etiqueta="span" />
        </h2>
        <p className="form-contacto__texto">{rellenar(textos.exito.texto, { motivo: f.opcionMotivo.texto })}</p>
        <Boton variante="linea" className="form-contacto__boton" onClick={f.otroMensaje}>
          {textos.exito.otro}
        </Boton>
      </div>
    );
  }

  const enviando = f.estado === 'enviando';
  const c = textos.campos;
  const errorPolitica = f.errorDe('aceptaPolitica');

  return (
    <form ref={f.formulario} method="post" className="form-contacto" aria-label={textos.etiqueta} noValidate onSubmit={f.enviar}>
      <Titular titular={textos.titular} etiqueta="h2" className="form-contacto__titular" />

      <GrupoChips nombre="motivo" leyenda={textos.preguntaMotivo} opciones={textos.motivos} valor={f.motivo} alCambiar={f.setMotivo} />

      <div className="formulario__fila">
        <Campo id="contacto-nombre" etiqueta={c.nombre.etiqueta} error={f.errorDe('nombre')}>
          {(a) => (
            <Entrada
              {...a}
              name="nombre"
              autoComplete="name"
              placeholder={c.nombre.placeholder}
              value={f.valores.nombre}
              onChange={(e) => f.cambiar('nombre', e.target.value)}
              onBlur={() => f.tocar('nombre')}
            />
          )}
        </Campo>
        <Campo id="contacto-empresa" etiqueta={c.empresa.etiqueta} error={f.errorDe('empresa')}>
          {(a) => (
            <Entrada
              {...a}
              name="empresa"
              autoComplete="organization"
              placeholder={c.empresa.placeholder}
              value={f.valores.empresa}
              onChange={(e) => f.cambiar('empresa', e.target.value)}
              onBlur={() => f.tocar('empresa')}
            />
          )}
        </Campo>
        <Campo id="contacto-celular" etiqueta={c.celular.etiqueta} error={f.errorDe('celular')}>
          {(a) => (
            <Entrada
              {...a}
              type="tel"
              name="celular"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={c.celular.placeholder}
              value={f.valores.celular}
              onChange={(e) => f.cambiar('celular', e.target.value)}
              onBlur={() => f.tocar('celular')}
            />
          )}
        </Campo>
        <Campo id="contacto-correo" etiqueta={c.correo.etiqueta} error={f.errorDe('correo')}>
          {(a) => (
            <Entrada
              {...a}
              type="email"
              name="correo"
              autoComplete="email"
              placeholder={c.correo.placeholder}
              value={f.valores.correo}
              onChange={(e) => f.cambiar('correo', e.target.value)}
              onBlur={() => f.tocar('correo')}
            />
          )}
        </Campo>
      </div>

      <Campo id="contacto-mensaje" etiqueta={c.mensaje.etiqueta} error={f.errorDe('mensaje')}>
        {(a) => (
          <AreaTexto
            {...a}
            name="mensaje"
            placeholder={f.opcionMotivo.ayuda}
            value={f.valores.mensaje}
            onChange={(e) => f.cambiar('mensaje', e.target.value)}
            onBlur={() => f.tocar('mensaje')}
          />
        )}
      </Campo>

      {/* Campo trampa: las personas no lo ven; los robots lo llenan */}
      <div className="campo-trampa" aria-hidden="true">
        <label>
          {textos.trampa}
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" value={f.trampa} onChange={(e) => f.setTrampa(e.target.value)} />
        </label>
      </div>

      <div className="campo">
        <Casilla
          id="contacto-aceptaPolitica"
          name="aceptaPolitica"
          checked={f.valores.aceptaPolitica}
          conError={Boolean(errorPolitica)}
          aria-describedby={errorPolitica ? 'contacto-aceptaPolitica-error' : undefined}
          onChange={(e) => {
            f.cambiar('aceptaPolitica', e.target.checked);
            f.tocar('aceptaPolitica');
          }}
        >
          {textos.politica.antes}
          <a href={textos.politica.enlace.url} target="_blank" rel="noopener">
            {textos.politica.enlace.texto}
          </a>
          {textos.politica.despues}
        </Casilla>
        {errorPolitica && (
          <span id="contacto-aceptaPolitica-error" className="campo__error">
            {errorPolitica}
          </span>
        )}
      </div>

      <Alerta>{f.aviso?.texto}</Alerta>

      <Boton type="submit" variante="lima" className="form-contacto__boton" ocupado={enviando}>
        {enviando ? (
          <>
            {textos.enviando}
            <Cargando />
          </>
        ) : (
          <>
            {f.aviso?.reintentar ? textos.reintentar : textos.enviar}
            <Icono nombre="flecha" tamano={18} color="#00475D" grosor={2.5} />
          </>
        )}
      </Boton>
    </form>
  );
}
