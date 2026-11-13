// ESTADO DEL CATÁLOGO EN LA PANTALLA: guarda lo elegido y lo mantiene igual a la dirección.
// - Al abrir la página lee los filtros de la dirección (?familia=…&q=…).
// - Cada cambio actualiza la dirección sin recargar, para poder compartir el enlace.
// Las reglas (marcar, limpiar, leer/escribir la dirección) están en src/aplicacion/catalogo;
// aquí solo se conectan con React y con el navegador.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { IdOrden } from '@dominio/filtros';
import type { CriterioFiltro } from '@aplicacion/catalogo/CriterioFiltro';
import {
  ESTADO_INICIAL,
  alternarOpcion,
  cambiarBusqueda,
  cambiarOrden,
  limpiarFiltros,
  type EstadoCatalogo,
} from '@aplicacion/catalogo/EstadoCatalogo';
import { escribirEstado, leerEstado } from '@aplicacion/catalogo/direccion';

export interface AccionesCatalogo {
  alternar: (grupo: string, opcion: string) => void;
  limpiar: () => void;
  ordenar: (orden: IdOrden) => void;
  buscar: (texto: string) => void;
}

export function useEstadoCatalogo(criterios: CriterioFiltro[]): [EstadoCatalogo, AccionesCatalogo] {
  // En el servidor no hay dirección: se arma con el estado inicial y se corrige al cargar
  const [estado, setEstado] = useState<EstadoCatalogo>(ESTADO_INICIAL);
  const leido = useRef(false);

  // Leer la dirección al cargar y cuando se usa "Atrás"/"Adelante" del navegador
  useEffect(() => {
    const leer = () => setEstado(leerEstado(new URLSearchParams(window.location.search), criterios));
    leer();
    leido.current = true;
    window.addEventListener('popstate', leer);
    return () => window.removeEventListener('popstate', leer);
  }, [criterios]);

  // Escribir la dirección en cada cambio (sin agregar pasos al historial)
  useEffect(() => {
    if (!leido.current) return;
    const parametros = escribirEstado(estado, criterios);
    const nueva = `${window.location.pathname}${parametros ? `?${parametros}` : ''}`;
    if (nueva !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', nueva);
    }
  }, [estado, criterios]);

  const alternar = useCallback((grupo: string, opcion: string) => setEstado((e) => alternarOpcion(e, grupo, opcion)), []);
  const limpiar = useCallback(() => setEstado(limpiarFiltros), []);
  const ordenar = useCallback((orden: IdOrden) => setEstado((e) => cambiarOrden(e, orden)), []);
  const buscar = useCallback((texto: string) => setEstado((e) => cambiarBusqueda(e, texto)), []);

  return [estado, { alternar, limpiar, ordenar, buscar }];
}
