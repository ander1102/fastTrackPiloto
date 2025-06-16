import dynamic from "next/dynamic";

/**Genera componentes SSR forzando a renderizarse del lado del cliente */
export namespace ClientComponents {
  export const Image = dynamic(import("./Image"), {
    ssr: false,
  });
}
