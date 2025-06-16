import Grid from "@app/components/Grid";

import { FormItem } from "@app/components/FormManager/FormItem";
import { ClientField, ClientFormContext } from "../../context";
import { useContext } from "react";
import EfevooCard from "@app/components/Efevoo/Card";
import { Badge } from "primereact/badge";
import useCall from "@app/hooks/useCall";
import { ClientsControllers } from "@app/logic/backend/clients";
import { useRouter } from "next/router";
import FormItemInputFile from "@app/layout/clientes/form/FormItemInputFile";

const getStatusBackground = (condition: boolean) =>
  condition ? "bg-lila" : "bg-light-gray-700";

// const RenderSolicitudStatus = () => {
//   const router = useRouter();
//   const { id_company } = router.query;
//   const kpis = useCall(ClientsControllers, "kpis", () => ({
//     initialParams: [
//       {
//         idagep_empresa: id_company ?? 0,
//       },
//     ] as [body: any],
//   }));

//   return (
//     <Grid.Item>
//       <ClientField field="idagep_catpago" />
//       <p>Resumen de solicitud</p>
//       <section className="flex flex-col gap-3">
//         <EfevooCard
//           icon="Cards"
//           title1="Servicio"
//           title2="Tarjeta de crédito"
//           contentClassName={getStatusBackground(
//             kpis.item?.tarjetaEstatus === "Activo"
//           )}
//         />
//         <EfevooCard
//           imageUrl="/Images/cards/d30.png"
//           title1="Modelo"
//           title2="Terminal Pro D30"
//           rightChildren={
//             !kpis.item?.terminalesD30 ? undefined : (
//               <Badge
//                 value={kpis.item?.terminalesD30 ?? 0}
//                 size="large"
//                 className="!bg-[white] !text-light-blue-600"
//               />
//             )
//           }
//           contentClassName={getStatusBackground(!!kpis.item?.terminalesD30)}
//         />
//         <EfevooCard
//           imageUrl="/Images/cards/d20.png"
//           title1="Modelo"
//           title2="Terminal Smart D20"
//           rightChildren={
//             !kpis.item?.terminalesD20 ? undefined : (
//               <Badge
//                 value={kpis.item?.terminalesD20 ?? 0}
//                 size="large"
//                 className="!bg-[white] !text-light-blue-600"
//               />
//             )
//           }
//           contentClassName={getStatusBackground(!!kpis.item?.terminalesD20)}
//         />
//         <EfevooCard
//           icon="Service"
//           title1="Servicio"
//           title2="Ligas de pago"
//           contentClassName={getStatusBackground(
//             kpis.item?.ecommerceEstatus === "Activo"
//           )}
//         />
//       </section>
//     </Grid.Item>
//   );
// };

export default function Operaciones() {
  const { clientProps } = useContext(ClientFormContext);
  const {
    values,
    errors,
    disabled,
    onDocumentChange,
    fulfillment,
    setFulfillment,
    activeTab,
  } = clientProps;

  const isNew = clientProps.isNew;
  return (
    <>
      <p className="text-[#6B3374] text-xl font-medium mb-5">
        Datos de operaciones con tarjetas
      </p>
      <Grid lg={3} md={3} sm={1}>
        <Grid.Item slg={isNew ? 3 : 2} smd={isNew ? 3 : 2} ssm={1}>
          <Grid lg={2} md={2} sm={1} gap={3}>
            <ClientField field="infoOperaciones.ventaMensual" />
            <ClientField field="infoOperaciones.ticketPromedio" />
            <ClientField field="infoOperaciones.ticketAlto" />
            <FormItem title="Horario de operación">
              <div className="flex w-[75%] gap-3">
                <ClientField field="infoOperaciones.horarioI" />
                <ClientField field="infoOperaciones.horarioF" />
              </div>
            </FormItem>

            <div className="flex  justify-between  w-[75%]">
              <p className="text-gray-800 text-md font-medium">
                Fondo de reserva
              </p>
              <ClientField field="fondoActivo" />
            </div>

            <ClientField field="porcetaje" />

            <div className="flex justify-between w-[75%]">
              <p className="text-gray-800 text-md font-medium">3DS</p>
              <ClientField field="3DS" />
            </div>

            <ClientField field="minimo3DS" />
          </Grid>

          <p className="text-[#6B3374] text-xl font-medium mb-5">
            Datos de cuenta bancaria
          </p>
          <Grid sm={2} md={2} lg={2} gap={3}>
            <ClientField field="infoOperaciones.banco" />
            <ClientField field="infoOperaciones.cuenta" />
            <ClientField field="infoOperaciones.clabe" />
            <ClientField field="infoOperaciones.titular" />
            <FormItemInputFile
              errors={errors}
              values={values}
              fileNames={["estadoDeCuenta"]}
              disabled={disabled}
              onDocumentChange={onDocumentChange}
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              canFulfillment={false}
              activeTab={activeTab}
            />
          </Grid>
        </Grid.Item>

        {/* {!isNew && <RenderSolicitudStatus />} */}
      </Grid>
    </>
  );
}
