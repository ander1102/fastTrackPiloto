import { SetStateAction, useEffect, useRef, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import General from "./general";
import { LeadInfoStructure } from "@app/types/Leads";
import { PermissionProps } from "@app/types/User";
import SeguimientoLead from "./seguimiento";
import SaveBtn from "./saveBtn";
import { DEFAULT_LEAD_COTIZACION, DEFAULT_LEAD_GENERAL, DEFAULT_LEAD_SEGUIMIENTO } from "@app/constants/leads";
import PDFButton from "@app/components/Buttons/ButtonExportPDF";
import { generateStatement } from "@app/utils/pdf/LeadCotizacionPDF";
import Cotizador from "@app/components/Cotizador";
import CotizacionLead from "./cotizacion";
import { INIT_CLIENT } from "@app/components/Cotizador/constants";
interface LeadsLayoutProps extends PermissionProps {
  vendedor: String;
  lead: LeadInfoStructure;
  toRefresh: any;
  sellers: any;
  user:any
}

export default function LeadsFormLayout(props:LeadsLayoutProps) {
  const [originalInfo, setOriginlInfo] = useState(props.lead);
  const [allInfo, setAllInfo] = useState(props.lead);
  const [generalInfo, setGeneralInfo] = useState(() => DEFAULT_LEAD_GENERAL());
  const [seguimientoInfo, setSeguimientoInfo] = useState(() => DEFAULT_LEAD_SEGUIMIENTO());
  const [cotizacionInfo, setCotizacionInfo] = useState(() => DEFAULT_LEAD_COTIZACION());
  const [statement, setStatement]=useState<String>()
  useEffect(() => {
    setGeneralInfo(props.lead.infoLead[0]);
    allInfo.infoSeguimiento?.length > 0 && setSeguimientoInfo(allInfo.infoSeguimiento[0])
    allInfo.infoCotizacion?.length > 0 && setCotizacionInfo(allInfo.infoCotizacion[0])
  }, [props.lead]);

  useEffect(()=>{
    setOriginlInfo(props.lead)
    setAllInfo(props.lead)
  },[props.lead])

  useEffect(()=>{
    const fetchData = async () => {

      const data = await generateStatement({
        lead: props.lead,
        vendedor: props.vendedor
      });
      setStatement(data);
    };
    fetchData();
  },[props.lead])

  const onRefresh = (curr: SetStateAction<Partial<LeadInfoStructure>>) => {
    setAllInfo((prev: any) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const data = {
    ...INIT_CLIENT,
    infoCotizacion: props.lead.infoCotizacion[0],
    nombre: props.lead.infoLead[0].nombre ?? "",
    agente: props.lead.infoLead[0].agente?.nombre ?? "",
    gerente: props.lead.infoLead[0].gerente?.nombre ?? "",
    razonSocial: props.lead.infoLead[0].nombreNegocio ?? "",
  }
  
  return (
    <div className="w-full flex flex-col h-full overflow-hidden overflow-y-scroll">
      <div className="w-full flex justify-between items-center py-2" >
        <SaveBtn originalInfo={originalInfo} allInfo={allInfo} toRefresh={props.toRefresh}/>
      </div>
      <TabView>
        <TabPanel header="Lead">
          <General
            lead={generalInfo}
            date={new Date(allInfo.fecha).toString()}
            estatus={allInfo.estatus}
            estatusOriginal={originalInfo.estatus}
            onRefresh={onRefresh}
            user={props.user}
          />
        </TabPanel>
        <TabPanel header="Seguimiento">
          <SeguimientoLead seguimiento={seguimientoInfo} onRefresh={onRefresh} />
        </TabPanel>
        <TabPanel header="Cotización">
          <Cotizador initialValues={data} onChange={(value) => {
            onRefresh({infoCotizacion: [{...value.infoCotizacion}]}) }}
          />
        </TabPanel>
      </TabView>
    </div>
  );
}
