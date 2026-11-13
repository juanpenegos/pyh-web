// GRUPO DE CHIPS (molécula): opciones de "elige una" con forma de píldora.
// Por dentro son botones de radio de verdad: se recorren con Tab y las flechas,
// y el lector de pantalla anuncia "1 de 5, seleccionado".
import Chip from '@ui/atomos/Chip';
import '@ui/estilos/formulario.css';

interface Opcion<T extends string> {
  valor: T;
  texto: string;
}

interface Props<T extends string> {
  nombre: string;           // name de los radios
  leyenda: string;          // Pregunta del grupo
  opciones: Opcion<T>[];
  valor: T;
  alCambiar: (valor: T) => void;
}

export default function GrupoChips<T extends string>({ nombre, leyenda, opciones, valor, alCambiar }: Props<T>) {
  return (
    <fieldset className="grupo-chips">
      <legend className="campo__etiqueta">{leyenda}</legend>
      <div className="grupo-chips__lista">
        {opciones.map((opcion) => {
          const elegido = opcion.valor === valor;
          return (
            <Chip como="label" key={opcion.valor} activo={elegido} className="grupo-chips__chip">
              <input
                type="radio"
                name={nombre}
                value={opcion.valor}
                checked={elegido}
                onChange={() => alCambiar(opcion.valor)}
                className="grupo-chips__radio"
              />
              {opcion.texto}
            </Chip>
          );
        })}
      </div>
    </fieldset>
  );
}
