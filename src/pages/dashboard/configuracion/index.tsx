import { useEffect, useState } from "react";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import ConfigurationBankDataTab from "@app/layout/configuracion/bankData";
import ConfigurationGeneralTab from "@app/layout/configuracion/general";
import ComercioDetails from "@app/layout/clientes/form/comercioFulfilment";
import ClientDireccion from "@app/layout/clientes/form/direccion";
import ClientRepresentante from "@app/layout/clientes/form/representante";
import ClientContactos from "@app/layout/clientes/form/contactos";
import { INIT_CLIENT, INIT_DOCUMENTS } from "@app/constants/client";
import { ButtonLoader } from "@app/components/Buttons";
import { PermissionProps, User } from "@app/types/User";
import { kpiReserveFundType } from "@app/types/reserveFund";
import { Refresh } from "@app/hooks/useCall";
import { TabView, TabPanel } from "primereact/tabview";
import { useFormClientes } from "@app/layout/clientes/useFormClientes";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { execWithLoader } from "@app/utils/DOM";
import { ClientsControllers } from "@app/logic/backend/clients";
import { Client, ClientDocuments } from "@app/types/Clients";
import { getFileExtension } from "@app/common/format";
import Grid from "@app/components/Grid";
import FormItemInputFile from "@app/layout/clientes/form/FormItemInputFile";
import { isEmpty } from "@app/common";
import { KpiContainer } from "@app/components/ViewKpis";
import { TabsExpediente } from "@app/layout/configuracion/expediente/tabsExpediente";
interface ClientFormLayoutProps extends PermissionProps {
  user: User;
  title: string;
  client?: Client;
  kpiReserveFund: kpiReserveFundType | undefined;
  refreshReserveFund: Refresh<[body: number]>;
}
export const CONTEXT = "dashboard/configuracion";

const Configuracion = (props: AppContextProps) => {
  const {
    client,
    formik,
    activeTab,
    setActiveTab,
    //boolenas
    isNew,
    disabled,
    canFulfillment,
    clientFulfillment,
    //seters
    setClient,
    setClientFulfillment,
    //actions
    handleOnDocumentChange,
  } = useFormClientes(INIT_CLIENT);
  const [person, setPerson] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [indexIntTab, setIndexIntTab] = useState<null | number>(null);

  const renderTitle = (title: string) => (
    <div className="flex items-center">
      <p className={`text-2xl text-[#6B3374] cursor-pointer flex items-center`}>
        {title}
      </p>
    </div>
  );

  useEffect(() => {
    if (formik?.values?.persona) {
      setPerson(formik?.values?.persona);
    }
  }, [formik.values.persona]);

  useEffectAsync(async () => {
    let response = await formik.values.persona;
    setPerson(response);
  }, [formik.values.persona]);

  const renderButtons = (disabled: boolean) =>
    disabled !== true && (
      <div className="flex justify-end">
        <div className="mt-5 mr-5">
          <ButtonLoader
            style={{ background: "#6B3374", border: "#6B3374", width: 200 }}
            loading={formik.isSubmitting}
            onClick={(event) => {
              event.preventDefault();
              formik.handleSubmit();
            }}
            type="submit"
          >
            Guardar
          </ButtonLoader>
        </div>
      </div>
    );

  const getClientData = async () => {
    const idagep_empresa = props.client.idagep_empresa;

    if (!idagep_empresa) return INIT_CLIENT;

    let client: Client;

    const clientres = await ClientsControllers.get({
      idagep_empresa: +idagep_empresa,
      id_login: props.user.persona.idagep_usuarios
    });

    if (clientres.error || !clientres.isSuccess) return INIT_CLIENT;
    client = clientres.response;

    const documents:any = await ClientsControllers.showDocuments({
      idagep_empresa: clientres.response.idagep_empresa,
      id_login: props.user.persona.idagep_usuarios
    });

    let tpmDocuments: ClientDocuments[] = INIT_DOCUMENTS;

    if (documents.isSuccess && documents.response) {
      tpmDocuments = tpmDocuments.map((document) => {
        const find = documents.response.docs.find(
          (x:any) => x.nombre === document.documentoTipo
        );
        if (find) {
          return {
            ...document,
            extension: find.ruta ? getFileExtension(find.ruta) : "",
            filename: find.ruta,
          };
        }
        return document;
      });
    }

    client = {
      ...client,
      documents: tpmDocuments,
    };
    return client;
  };

  useEffectAsync(async () => {
    const tpmClient = await execWithLoader(getClientData, [], CONTEXT, 0.5);
    setClient(tpmClient);
    setActiveTab(99);
  }, []);

  const renderStatusFullfilment = (client: Client) => {
    switch (client?.cumplimiento) {
      case "Validado":
        return (
          <p className="text-right text-lg mb-5">Documentación validada.</p>
        );
      case "Rechazado":
        return (
          <p className="text-right text-lg mb-5">Documentación rechazada.</p>
        );
      case "Revicion":
        return (
          <p className="text-right text-lg mb-5">
            Documentación en proceso de revisión.
          </p>
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    setIndexIntTab(null);
  }, [index]);

  const handleCatchInternalTabs = (intTab: number) => {
    setIndexIntTab(intTab);
  };

  return (
    <>
      <section className="container-header-tab">
        <KpiContainer title="Configuración"></KpiContainer>
      </section>
      <section className="container-body-tab">
        {index === 2 && renderButtons(client?.cumplimiento === "Validado")}
        <TabView
          className="p-tab"
          activeIndex={index}
          onTabChange={(e) => setIndex(e.index)}
        >
          <TabPanel header="General">
            <ConfigurationGeneralTab user={props.user} />
          </TabPanel>

          {props.userType === "admin" && (
            <TabPanel header="Datos bancarios">
              <div className="mt-5 w-full flex flex-col  px-10 py-8">
                {renderTitle("Configurar datos bancarios")}
                <ConfigurationBankDataTab user={props.user} client={client} />
              </div>
            </TabPanel>
          )}
          {props.userType === "admin" && (
            <TabPanel header="Expediente">
              <div className=" mt-5  w-full px-10 py-8">
                {renderStatusFullfilment(client)}
                <div>
                  <TabsExpediente
                    tab={index}
                    person={person}
                    handleCatchInternalTabs={(e: any) =>
                      handleCatchInternalTabs(e)
                    }
                  />
                </div>
                <div
                  className=" w-full flex flex-col"
                  style={{ backgroundColor: "#FAF9F7", padding: 20 }}
                >
                  {indexIntTab === null && (
                    <ComercioDetails
                      handleChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      setFieldValue={formik.setFieldValue}
                      disabled={disabled[0]}
                      fulfillment={clientFulfillment}
                      setFulfillment={setClientFulfillment}
                      canFulfillment={canFulfillment}
                      activeTab={activeTab}
                      person={person}
                    />
                  )}
                  {indexIntTab === 1 && (
                    <ClientDireccion
                      handleChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      setFieldValue={formik.setFieldValue}
                      disabled={disabled[0]}
                      fulfillment={clientFulfillment}
                      setFulfillment={setClientFulfillment}
                      canFulfillment={canFulfillment}
                      activeTab={activeTab}
                    />
                  )}
                  {indexIntTab === 2 && (
                    <ClientContactos
                      handleChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      setFieldValue={formik.setFieldValue}
                      disabled={disabled[0]}
                      fulfillment={clientFulfillment}
                      setFulfillment={setClientFulfillment}
                      canFulfillment={canFulfillment}
                      activeTab={activeTab}
                    />
                  )}
                  {indexIntTab === 3 && (
                    <>
                      <p
                        className={"text-lg mb-5"}
                        style={{
                          color: "#6B3374",
                          fontWeight: 500,
                          fontSize: 20,
                        }}
                      >
                        Documentación
                      </p>
                      <Grid sm={1} md={2} lg={2} gap={3}>
                        <FormItemInputFile
                          fulfillment={clientFulfillment}
                          setFulfillment={setClientFulfillment}
                          values={formik.values}
                          errors={formik.errors}
                          fileNames={
                            person === "moral"
                              ? ["acta", "rfc"]
                              : ["ine", "rfc"]
                          }
                          disabled={disabled[0]}
                          onDocumentChange={handleOnDocumentChange}
                          canFulfillment={canFulfillment}
                          activeTab={activeTab}
                        />
                      </Grid>
                      <Grid sm={1} md={2} lg={2} gap={3}>
                        <FormItemInputFile
                          fulfillment={clientFulfillment}
                          setFulfillment={setClientFulfillment}
                          values={formik.values}
                          errors={formik.errors}
                          fileNames={
                            person === "moral"
                              ? ["registroPublico", "address"]
                              : ["address"]
                          }
                          disabled={disabled[0]}
                          onDocumentChange={handleOnDocumentChange}
                          canFulfillment={canFulfillment}
                          activeTab={activeTab}
                        />
                      </Grid>
                    </>
                  )}
                  {indexIntTab === 4 && (
                    <ClientRepresentante
                      handleChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      setFieldValue={formik.setFieldValue}
                      disabled={disabled[0]}
                      onDocumentChange={handleOnDocumentChange}
                      fulfillment={clientFulfillment}
                      setFulfillment={setClientFulfillment}
                      canFulfillment={canFulfillment}
                      activeTab={activeTab}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
          )}
        </TabView>
      </section>
    </>
  );
};

export default withAppContext(Configuracion, CONTEXT, {
  title: "Configuración",
});
