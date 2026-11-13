// COMPORTAMIENTO COMÚN de las ventanas que tapan la página (menú móvil, hoja de filtros):
// - abrir() la muestra encima de todo y bloquea el desplazamiento de la página de atrás.
// - cerrar() la cierra (también se cierra con Escape, lo hace el navegador).
// - Si la pantalla crece hasta `cerrarDesde` (p. ej. '(min-width: 1100px)'), se cierra sola.
// Uso: const { ref, abrir, cerrar } = useDialogoModal('(min-width: 768px)');  <dialog ref={ref}>

import { useCallback, useEffect, useRef } from 'react';

export function useDialogoModal(cerrarDesde: string, alCerrar?: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const alCerrarRef = useRef(alCerrar);
  alCerrarRef.current = alCerrar;

  const abrir = useCallback(() => {
    ref.current?.showModal();
    document.body.style.overflow = 'hidden';
  }, []);

  const cerrar = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;

    const liberar = () => {
      document.body.style.overflow = '';
      alCerrarRef.current?.();
    };
    dialogo.addEventListener('close', liberar);

    const medida = window.matchMedia(cerrarDesde);
    const alCambiar = () => medida.matches && dialogo.open && dialogo.close();
    medida.addEventListener('change', alCambiar);

    return () => {
      dialogo.removeEventListener('close', liberar);
      medida.removeEventListener('change', alCambiar);
    };
  }, [cerrarDesde]);

  return { ref, abrir, cerrar };
}
