import Grid from "@app/components/Grid";
import { ClientField } from "../../context";
import { getNameField } from "../../../utils";
import { PropsWithChildren } from "react";

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
const FIELD = getNameField("ventaLinea");
const FIELD_AMEX = getNameField("ventaLineaAMEX");

export default function ventaLinea() {
  return (
    <>
      <p className="text-primary-color text-xl font-medium mb-5">
        Venta en linea
      </p>
      <div className="flex justify-between items-center w-full">
        <ClientField field="ecommerce" />
      </div>
      
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

      <Grid lg={2} md={2} sm={1}  gap={3}>
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

      {/* <p className="text-[#386EB1] text-xl font-medium my-5">AMEX</p> */}

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
