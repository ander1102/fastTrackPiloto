import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { PermissionProps } from "@app/types/User";
import { LeadStatusBodyTemplate } from "../app/layout";
import { CorreoColumn, FechaTemplate } from "./templates";
import EmptyTemplate from "@app/components/EmptyTemplate";
import { ClientCollection } from "@app/types/Clients";
import { DataTable } from "primereact/datatable";
import { LeadsCollection, LeadsGetBody } from "@app/types/Leads";
import { Column } from "primereact/column";
import ButtonDetailsLeads from "@app/components/Buttons/ButtonDetailsLeads";
import { TableContainer } from "../app/containers";


interface ClientesBodyProps extends PermissionProps {
  onRefresh: (body: SetStateAction<Partial<LeadsGetBody>>) => void;
  item: ClientCollection[] | null;
  isCalling: boolean;
  totalRecords: number;
  setLeadSelected:any
  leadsSelected:any
}

export default function ClientesBody({
  permission,
  item,
  isCalling,
  onRefresh,
  totalRecords,
  setLeadSelected,
  leadsSelected
}: ClientesBodyProps) {

  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });
  
  const onPage = (event: any) => {
    setlazyState(event);
    onRefresh({ PageIndex:(event.page+1).toString()})
  };


  return (
    <TableContainer>
        <DataTable
          id={'TablaLeads'}
          value={item ?? []}
          onPage={onPage}
          metaKeySelection={false}
          selectionMode="multiple"
          selection={leadsSelected}
          onSelectionChange={(e) => setLeadSelected(e.value)}
          paginator
          className="datatable-custom"
          scrollHeight="95%"
          scrollable
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          dataKey="idagep_leads"
          rowHover
          filterDisplay="menu"
          loading={isCalling}
          responsiveLayout="scroll"
          globalFilterFields={["nombre"]}
          emptyMessage={EmptyTemplate}
          style={{ color: "#60A5FA", border: '0px solid transparent' }}
          lazy={canLazy}
          totalRecords={totalRecords}
          first={lazyState.first}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="idagep_leads" header="ID"    />
          <Column field="nombre" header="Nombre"  />
          <Column header="Correo elec." body={CorreoColumn}   />
          <Column field="nombreNegocio" header="Razón social"  />
          <Column field="giro" header="Giro"  />
          <Column header="Fecha y Hora" body={FechaTemplate}  />
          <Column field="ubicacion" header="Ubicación"  />
          <Column field="telefono" header="Teléfono"  />
          <Column field="vendedor" header="Vendedor" body={(item: LeadsCollection) => (item.vendedor === "Seleccionar vendedor" ? "" : item.vendedor)}/>
          <Column field="Cumpliento" header="Estado" body={(item: LeadsCollection) => ( <LeadStatusBodyTemplate expediente={item.estatus} id={item.idagep_leads} onRefresh={onRefresh} /> )}  />
          {permission.read && (
            <Column
              header=""
              body={(item: LeadsCollection) => (
                <ButtonDetailsLeads destino={`/dashboard/leads/${item.idagep_leads}`} />
              )}
            />
          )}
        </DataTable>
  </TableContainer>
  );
}
