interface ITWEEN {
  Group(): void
  Tween(): void
}

declare module 'three/examples/jsm/libs/tween.module.min' {
  export const TWEEN: ITWEEN
}
