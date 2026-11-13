// CONECTOR de la isla del formulario de Contacto.
// Las islas de React no pueden recibir objetos con funciones desde una página .astro,
// así que este archivo hace de "página" para la isla: toma los servicios ya elegidos en
// src/infraestructura/servicios.ts y se los pasa al formulario (inyección de dependencias).
// El formulario (src/ui/organismos/contacto/FormularioContacto.tsx) sigue sin saber cuál es cuál.
import FormularioContacto from '@ui/organismos/contacto/FormularioContacto';
import { servicios } from '@infraestructura/servicios';
import type { TextosFormularioContacto } from '@dominio/paginas/contacto';

export default function FormularioContactoIsla({ textos }: { textos: TextosFormularioContacto }) {
  return <FormularioContacto textos={textos} servicio={servicios.contacto} />;
}
