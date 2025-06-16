import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@app/components/Buttons";
import IconButton from "@app/components/Buttons/ButtonIcon";

import { APIKeysIntegration } from "@app/types/Integrations";
import { User } from "@app/types/User";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { IntegrationsControllers } from "@app/logic/backend/integrations";
import { includesWholeWord } from "@app/common/format";
import { copyToClipboardNavigator } from "@app/utils/DOM";
import { INTEGRATION_DOC_VERSION } from "@app/constants";

const INITIAL = (user: User): APIKeysIntegration => ({
  api_key: "",
  api_secret: "",
  api_totp: "",
  estatus: "",
  fechaEnt: "",
  idagep_empresa: user.idagep_empresa ?? 0,
});

const getStatusOperation = (status: string): string | null => {
  if (status?.toLowerCase() === "activada") return "IB";
  if (status?.toLowerCase() === "desactivada") return "ID";
  return null;
};

const ApiKeyContent: {
  label: string;
  keyValue: keyof Omit<APIKeysIntegration, "idagep_empresa">;
}[] = [
  { label: "API KEY", keyValue: "api_key" },
  { label: "API SECRET", keyValue: "api_secret" },
  { label: "API TOTP", keyValue: "api_totp" },
];

interface IntegrationsApiKeysProps {
  user: User;
}

export function IntegrationsApiKeys({ user }: IntegrationsApiKeysProps) {
  const [apiKeys, setApiKeys] = useState(() => INITIAL(user));
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);

  const onToggle = () => {
    setHide((prev) => !prev);
  };

  const onStatus = async () => {
    const operacion = getStatusOperation(apiKeys.estatus);
    if (!operacion) return;

    setLoading(true);
    const res = await IntegrationsControllers.getApiKeys({
      idagep_empresa: user.idagep_empresa ?? 0,
      operacion,
    });
    setLoading(false);

    if (!res.isSuccess) return;
    const mensaje = (res.response as unknown as { mensaje: string })?.mensaje;
    if (includesWholeWord(mensaje, "activadas"))
      setApiKeys((prev) => ({
        ...prev,
        estatus: "Activada",
      }));
    else if (includesWholeWord(mensaje, "desactivadas"))
      setApiKeys((prev) => ({
        ...prev,
        estatus: "Desactivada",
      }));
  };

  useEffectAsync(async () => {
    setLoading(true);
    const res = await IntegrationsControllers.getApiKeys({
      idagep_empresa: user.idagep_empresa ?? 0,
      operacion: "R",
    });
    if (res.isSuccess) {
      setApiKeys(res.response);
    }
    setLoading(false);
  }, []);

  return (
    <article className="sm:max-w-[480px] w-full mt-5 p-4 sm:p-6 bg-beige rounded">
      <section className="flex flex-col justify-center gap-12 mb-10">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[#268A67]">ESTATUS</h3>

            {apiKeys && apiKeys.estatus === "Activada" ? (
              <div className="h-5 min-w-20 p-[10px] bg-[#61AA6A] rounded-lg flex justify-center items-center gap-1">
                <Image
                  alt=""
                  src="/Images/integrations/check.svg"
                  height={18}
                  width={18}
                />
                <span className="text-white text-xs">Activada</span>
              </div>
            ) : apiKeys.estatus === "Desactivada" ? (
              <div className="h-5 min-w-20 px-[10px] bg-[#D4605C] rounded-lg flex justify-center items-center gap-1">
                <Image
                  alt=""
                  src="/Images/integrations/remove.svg"
                  height={14}
                  width={14}
                />
                <span className="text-white text-xs">Desactivada</span>
              </div>
            ) : null}
          </div>
          <div className="border-b-2 border-[#B8DAD7]"></div>
        </div>

        {ApiKeyContent.map((ak) => (
          <ApiKeyRow
            key={ak.keyValue}
            apiKeys={apiKeys}
            hide={hide}
            loading={loading}
            onStatus={onStatus}
            onToggle={onToggle}
            {...ak}
          />
        ))}
      </section>

      {/* <Link
        className="w-36 h-10 mx-auto bg-[#3E3D3D] text-[#FFF] text-sm
        flex justify-center items-center rounded-xl hover:opacity-80 hover:bg-[#757A85]"
        href={`/pdf/Manual_de_Integracion_EfevooPay_${INTEGRATION_DOC_VERSION}.pdf`}
        target="_blank"
      >
        Descargar
      </Link> */}
    </article>
  );
}

interface ApiKeyRowProps {
  apiKeys: APIKeysIntegration;
  hide: boolean;
  keyValue: keyof Omit<APIKeysIntegration, "idagep_empresa">;
  label: string;
  loading: boolean;
  onStatus: () => Promise<void>;
  onToggle: () => void;
}

function ApiKeyRow({
  apiKeys,
  hide,
  keyValue,
  label,
  loading,
  onStatus,
  onToggle,
}: ApiKeyRowProps) {
  const onCopy = async (value: string) => {
    copyToClipboardNavigator(value);
  };

  return (
    <div className="flex flex-col gap-3">
      {keyValue === "api_key" ? (
        <div className="flex justify-between items-center">
          <h3 className="text-[#268A67]">{label}</h3>
          <div>
            <IconButton
              disabled={loading}
              imageClassName="w-6 h-6 hover:opacity-70"
              imagePath={`/Images/integrations/${hide ? "hide" : "show"}.svg`}
              onClick={onToggle}
            />
            <IconButton
              disabled={loading}
              imageClassName="w-5 h-5 hover:opacity-70"
              imagePath={`/Images/${
                apiKeys.estatus === "Activada" ? "lock" : "unlock"
              }.png`}
              onClick={onStatus}
            />
          </div>
        </div>
      ) : (
        <h3 className="text-[#268A67]">{label}</h3>
      )}

      <div className="w-full border-b-2 border-[#B8DAD7]"></div>

      <div className="w-full flex justify-between items-center gap-5">
        <div className="max-w-80 text-[#4A5056] font-light text-sm break-all">
          {hide ? "*".repeat(20) : apiKeys[keyValue]}
        </div>

        <div className="flex gap-3">
          <div
            className={`flex items-center gap-3 transition-all duration-200 ${
              hide ? "opacity-0" : "opacity-100"
            }`}
          >
            <Button
              className="!text-[14px] text-green-dark !px-3 !py-1 !bg-[#B8DAD7] !rounded-3xl hover:opacity-[.8] hover:!text-green-dark"
              onClick={() => onCopy(apiKeys[keyValue])}
            >
              Copiar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
