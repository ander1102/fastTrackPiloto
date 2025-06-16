import { useEffect, useMemo, useState } from "react";
import { DateFormat } from "@app/common/format";
import withAppContext, {
  AppContextProps,
} from "@app/components/HOC/withAppContext";
import useCall from "@app/hooks/useCall";
import PageLayout from "@app/layout/app/layout";
import DepositsBody from "@app/layout/deposits/body";
import DepositsHeader from "@app/layout/deposits/header";
import { DepositsControllers } from "@app/logic/backend/deposits";
import { DepositGetByDate, DepositsGet } from "@app/types/Deposits";
import { User } from "@app/types/User";
import { USER_ADMINS } from "@app/constants";
import { Dropdown } from "primereact/dropdown";
import { IndexLiquidacion } from "@app/layout/deposits/liquidacion";

export const DEPOSIT_CONTEXT = "dashboard/depositos";
const date = new Date();
const start = DateFormat.month.start(date, true);
const end = DateFormat.month.end(date, true);

const getInitialParams = (user: User): [body: DepositsGet] => {
  return [
    {
      idagep_empresa: user.idagep_empresa ?? 0, // 1 es master, puede leer los depósitos de todos los admins
      monto: 0,
      tipoDep: 1,
      referencia: "",
      operacion: "R",
      fechaInicio: start.toSimpleFormatString(),
      fechaFin: end.toSimpleFormatString(),
      montoTotal: 0,
      montoReserva: 0,
      porcentaje: 0,
      transacciones: ''
    },
  ];
};

function Depositos({ user, setTitle }: AppContextProps) {
  let options = [{label:"Depósitos", value: "deposits"}, {label: "Liquidaciones", value: "liquidations"}]
  const [selector, setSelector] = useState("deposits")
  const isAdmin = useMemo(
    () => USER_ADMINS.some((x) => x === user.idagep_empresa),
    [user]
  );

  useEffect(() => {
    onRefresh({
      idagep_empresa: user.idagep_empresa ?? 0,
      fechaInicio: start.toSimpleFormatString(),
      fechaFin: end.toSimpleFormatString(),
    })
  }, [])

  
  const resumen = useCall(DepositsControllers, "getAllDeposits", () => ({
    initialParams: getInitialParams(user),
    skipFistCall: false,
  }));

  const onFilter = (key: number, searchParams: number[]) => {
    if (searchParams.length === 0) {
      resumen.setFilter(key, deposit => deposit, "value"); // No filtra, devuelve todos los depósitos
      return;
    }
    
    resumen.setFilter(key, (deposit) => {
      let finalSearch: any[] = [];
      searchParams.map((id) => {
        finalSearch.push(...deposit.filter(x => x.idagep_empresa === id));
      });
      return finalSearch.sort(function (a, b) {
        let dateA: any = new Date(a.FechaHora);
        let dateB: any = new Date(b.FechaHora);
        return dateB - dateA;
      });
    }, "value");
  };

  const onRefresh = ({ fechaInicio, fechaFin }: DepositGetByDate) => {
    resumen.refresh([
      {
        idagep_empresa: user.idagep_empresa ?? 0,
        monto: 0,
        tipoDep: 1,
        referencia: "",
        operacion: "R",
        fechaInicio,
        fechaFin,
        montoTotal: 0,
        montoReserva: 0,
        porcentaje: 0,
        transacciones: ''
      },
    ]);
  };

  const loading = resumen.isCalling;

  const deposits = resumen.item;

  const _originalData = resumen.originalItem;
  
  return (
    <PageLayout>
      {
        user.idagep_empresa === 1 &&
        <div style={{padding: "10px 28px", display: 'flex', justifyContent: 'flex-end'}}>
          <Dropdown style={{ width: "200px", borderRadius: '10px' }} options={options} onChange={(e) => setSelector(e.value)} value={selector}/>
        </div>
      }
      {
        selector === "deposits" ?
        <>
          <DepositsHeader
            onRefresh={onRefresh}
            onFilter={onFilter}
            loader={loading}
            user={user}
            isAdmin={isAdmin}
            deposits={deposits}
          />
          <DepositsBody
            originalItem={_originalData}
            loader={loading}
            deposits={deposits}
            isAdmin={isAdmin}
          />
        </>
        :
        <>
          <IndexLiquidacion 
            user={user}
            isAdmin={isAdmin}
            setTitle={setTitle}
          />
        </>
      }
    </PageLayout>
  );
}

export default withAppContext(Depositos, DEPOSIT_CONTEXT, {
  title: "Depositos",
});
