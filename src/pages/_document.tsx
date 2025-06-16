import { Log } from "@app/common/log";
import {
  configLang,
  initSupportJavascriptFeatures,
} from "@app/logic/app/config";
import { Html, Head, Main, NextScript } from "next/document";

configLang();
initSupportJavascriptFeatures()
  .then()
  .catch((error) =>
    Log.debug.error(
      `Hubo un error al cargar las features de javascript a node: ` + error
    )
  );

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
