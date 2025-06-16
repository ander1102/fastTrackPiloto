import withAppContext, {AppContextProps,} from "@app/components/HOC/withAppContext";
import EmptyDetailsComponent from "@app/components/EmptyTemplate/EmptyDetailsComponent";
import { LeadsControllers } from "@app/logic/backend/leads";
import { Client, ClientDocuments } from "@app/types/Clients";
import useValueHandler from "@app/hooks/useValueHandler";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { execWithLoader } from "@app/utils/DOM";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { LeadsLayout } from "@app/layout/app/layout";
import DetailLeadsHeader from "@app/layout/leads/detailHeader";
import LeadsFormLayout from "@app/layout/leads/form";
import { INIT_LEAD } from "@app/constants/leads";
import { Lead, LeadInfoStructure } from "@app/types/Leads";


const CONTEXT = "dashboard/leads/editlead";
//TODO FIX ALL PAGES

function EditLead({ setTitle, permission, user }: AppContextProps) {
  const router = useRouter();
  const { id_company } = router.query;

  // component states
  const [lead, setLead] = useState<LeadInfoStructure | null>(null);
  const [sellers, setSellers] = useState<any>()
  const [isSuccess, setIsSuccess] = useValueHandler<boolean | null>(null);

  
  const getLeadData = async () => {
    if (!id_company) return INIT_LEAD;

    let leadComplete: LeadInfoStructure;

    const leadRes = await LeadsControllers.getLeadInfo({
      idagep_leads: +id_company,
      operacion : "R"
    });

    if (leadRes.error || !leadRes.isSuccess) return INIT_LEAD;
    
    leadComplete = leadRes.response
    leadComplete = {
      ...leadComplete,
    };
    return leadComplete;
  };

  const getSeller = async () => {
    if (!id_company) return INIT_LEAD;
    const seller = await LeadsControllers.getSellers({
      idagep_leads: +id_company,
      operacion : "R"
    })
    return seller;
  }

  useEffectAsync(async () => {
    if (id_company) { toRefresh() }
    setSellers(await getSeller())
  }, []);

  useEffect(() => {
    if (lead?.infoLead[0]?.nombre) {
      setTitle(`Lead ${lead?.infoLead[0]?.nombre}`);
    }
  }, [lead?.infoLead[0]?.nombre]);

  if (isSuccess() === false)
    return (
      <EmptyDetailsComponent title="Ha ocurrido un error">
        El cliente <b>{id_company}</b> no existe o no se encuentra disponible
      </EmptyDetailsComponent>
  );

  const toRefresh = async () =>{
    const lead = await execWithLoader(getLeadData, [], CONTEXT, 0.5);
    setIsSuccess(!!lead);
    setLead(lead) 
  }

  return (
    <LeadsLayout  >
      <div className="flex flex-col pt-5 pb-15 h-full flex-1 bg-white">
        {lead && (
          <>
            <div className="px-10 h-[15vh] pb-3" >
              <DetailLeadsHeader />
            </div>
            <div className={"datatable-custom !pb-0 !pt-4 !px-10 h-[85vh] overflow-hidden"}>
              <LeadsFormLayout vendedor={user.persona.nombre} lead={lead} sellers={sellers} permission={permission} toRefresh={toRefresh} user={user}/>
            </div>
          </>
        )}
      </div>
    </LeadsLayout>
  );
}

export default withAppContext(EditLead, CONTEXT, {
  title: "Lead",
});
