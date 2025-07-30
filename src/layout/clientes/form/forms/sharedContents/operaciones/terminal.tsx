import { PropsWithChildren, useContext, useEffect, useState } from "react";
import Grid from "@app/components/Grid";
import { ClientField, ClientFormContext } from "../../context";
import { getNameField } from "../../../utils";
import { useRouter } from 'next/router';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { toast } from "react-toastify";
import { UserContext } from "@app/context";
import { ClientsControllers } from "@app/logic/backend/clients";

const Header = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <Grid.Item
    slg={2}
    smd={2}
    ssm={1}
    className="flex justify-between items-center w-[75%]"
  >
    <p className="text-gray-800 text-md">{title}</p>
    {children}
  </Grid.Item>
);
const FIELD = getNameField("terminal");
const FIELD_AMEX = getNameField("terminalAMEX");

export default function Terminal() {
  const [amex, setAmex] = useState<any>(false)
  const user = useContext(UserContext)
  const router = useRouter()
  const isNew = router.query?.type ? true : false
  const {id_company} = router.query;
  const { formProps, clientProps } = useContext(ClientFormContext);

  useEffect(() => {
    getStateAmexSupport()
  }, [])

  const getStateAmexSupport = async () => {
    const res = await ClientsControllers.getStatusAmex(id_company)
    if(res.status === 200){
      const { mensaje } = res.response
      setAmex(mensaje !== 'Pendiente')
    }
  }

  const handleChangeAmexSupport = async(e: CheckboxChangeEvent) => {
    let body = {
      idagep_empresa:id_company
    }
    const res = await ClientsControllers.updateStatusAmex(body)
    if(res.response.msg === 'Cliente previamente registrado con AMEX WL'){
      toast.info(res.response.msg);
    } else if(res.response.msg === 'Solicitud realizada'){
      setAmex(true);
      toast.success(res.response.msg);
    } else {
      setAmex(false);
      toast.info(res.response.msg);
    }
  };

  return (
    <>
      <p className="text-primary-color text-xl font-medium mb-5">Terminal</p>

      <Grid lg={3} gap={3}>
        <ClientField field={FIELD.IDAGEP_ADQUIRIENTE} />
        <ClientField field={FIELD.COMISION_TD} />
        <ClientField field={FIELD.INTERCAMBIO_TD} />

        <ClientField field={FIELD.IDAGEP_TIPO_TASA} />
        <ClientField field={FIELD.COMISION_TC} />
        <ClientField field={FIELD.INTERCAMBIO_TC} />

        <ClientField field={FIELD.AFILIACION} />
        <ClientField field={FIELD.COMISION_TI} />
        <ClientField field={FIELD.INTERCAMBIO_TI} />
        <ClientField field={FIELD.FIID} />
      </Grid>

      <div className="flex justify-between items-center w-full">
        <ClientField field={FIELD.MSI} />
      </div>

      <Grid lg={2} md={2} sm={1} className="w-full" gap={3}>
        <Grid lg={2} md={2} sm={1} gap={3}>
          <Header title="3 meses sin intereses">
            <ClientField field={FIELD.MSI_3} />
          </Header>
          <ClientField field={FIELD.COMISION_3} />
          <ClientField field={FIELD.INTERCAMBIO_3} />

          <Header title="6 meses sin intereses">
            <ClientField field={FIELD.MSI_6} />
          </Header>
          <ClientField field={FIELD.COMISION_6} />
          <ClientField field={FIELD.INTERCAMBIO_6} />

          <Header title="9 meses sin intereses">
            <ClientField field={FIELD.MSI_9} />
          </Header>
          <ClientField field={FIELD.COMISION_9} />
          <ClientField field={FIELD.INTERCAMBIO_9} />
        </Grid>

        <Grid lg={2} md={2} sm={1} gap={3}>
          <Header title="12 meses sin intereses">
            <ClientField field={FIELD.MSI_12} />
          </Header>
          <ClientField field={FIELD.COMISION_12} />
          <ClientField field={FIELD.INTERCAMBIO_12} />

          <Header title="18 meses sin intereses">
            <ClientField field={FIELD.MSI_18} />
          </Header>
          <ClientField field={FIELD.COMISION_18} />
          <ClientField field={FIELD.INTERCAMBIO_18} />
        </Grid>
      </Grid>
      {
        !isNew && (
          <>
          <p className="text-primary-color text-xl font-medium my-5">AMEX</p>
            <Checkbox disabled={formProps.disabled[clientProps.activeTab ?? 0] || amex} name="amex" onChange={(e:CheckboxChangeEvent) => handleChangeAmexSupport(e)} checked={amex}></Checkbox>
            <label htmlFor="amex" className="ml-2">Solicitar soporte para Amex</label>
          </>
        )
      }

      {/* <Grid lg={3} gap={3}>
        <ClientField field={FIELD_AMEX.IDAGEP_TIPO_TASA} />
        <ClientField field={FIELD_AMEX.COMISION_TD} />
        <ClientField field={FIELD_AMEX.INTERCAMBIO_TD} />

        <ClientField field={FIELD_AMEX.AFILIACION} />
        <ClientField field={FIELD_AMEX.COMISION_TC} />
        <ClientField field={FIELD_AMEX.INTERCAMBIO_TC} />

        <ClientField field={FIELD_AMEX.FIID} />
        <ClientField field={FIELD_AMEX.COMISION_TI} />
        <ClientField field={FIELD_AMEX.INTERCAMBIO_TI} />
      </Grid>

      <div className="flex justify-between items-center w-full">
        <ClientField field={FIELD_AMEX.MSI} />
      </div>

      <Grid lg={2} md={2} sm={1} gap={3}>
        
        <Grid lg={2} md={2} sm={1} gap={3}>
          <Header title="3 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_3} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_3} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_3} />

          <Header title="6 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_6} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_6} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_6} />

          <Header title="9 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_9} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_9} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_9} />
        </Grid>

        <Grid lg={2} md={2} sm={1} gap={3}>
          <Header title="12 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_12} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_12} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_12} />

          <Header title="18 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_18} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_18} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_18} />
        </Grid>

        <Grid lg={2} md={2} sm={1} gap={3}>
          <Header title="24 meses sin intereses">
            <ClientField field={FIELD_AMEX.MSI_24} />
          </Header>
          <ClientField field={FIELD_AMEX.COMISION_24} />
          <ClientField field={FIELD_AMEX.INTERCAMBIO_24} />
        </Grid>
      </Grid> */}
    </>
  );
}
