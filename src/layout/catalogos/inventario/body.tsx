import { useState } from "react";
import EmptyTemplate from "@app/components/EmptyTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ButtonDetailsLeads } from "@app/components/Buttons";
import { StatusBodyTemplate } from "@app/layout/app/layout";
import { InputSwitch } from "primereact/inputswitch";
import { CatalogsController } from "@app/logic/backend/catalogos";
import { toast } from "react-toastify";

export const BodyStore = ({productos, onRefresh, totalRecords, isCalling}:any) => {

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    pagina: 1,
  });

  const statusTemprale = ({estatus, unidadesMin}:any) => {
    const color:any = {
      "alto": "#32B81A",
      "medio": "#ffa44e",
      "bajo": "#FF5758"
    }
    return(
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{backgroundColor: color[estatus], width: "8px", height: "8px", borderRadius: '50px', marginRight: 5 }} />
        <span>{unidadesMin} unidades</span>
      </div>
    )
  }


  const handleSwitchChange = async(e:any) => {
    const {id, value} = e.target
    let body ={
      "idagep_productos": id, 
      "alerta": value ? 1 : 0,
      "operacion": "UA"
    }
    const res = await CatalogsController.alertInventario(body)
    if (res.response?.estatus === 200) {
      const { mensaje }: any = res.response;
      toast.success(mensaje);
      onRefresh({
        idagep_productos: id,
        habilitado: e.value ? 1 : 0,
      });
    }

  }

  const onPage = (event: any) => {    
    setlazyState(event);
    onRefresh({ pagina:(event.page+1)})
  };

  return(
    <DataTable
      id={'TablaLeads'}
      value={productos ?? []}
      metaKeySelection={false}
      totalRecords={totalRecords}
      paginator
      className="p-datatable-customers"
      scrollHeight="95%"
      scrollable
      rows={10}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      dataKey="idagep_productos"
      rowHover
      filterDisplay="menu"
      loading={isCalling}
      responsiveLayout="scroll"
      globalFilterFields={["nombre"]}
      emptyMessage={EmptyTemplate}
      style={{ color: "#60A5FA", border: '0px solid transparent' }}
      lazy
      onPage={onPage}
      first={lazyState.first}
    >
      <Column  field="nombre" header="Nombre del producto" body={(item) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
        {
          item.img !== '' &&
          <img src={`data:image/png;base64,${item.img}`} width={40} height={40} alt="" style={{marginRight: '20px', borderRadius: 4}}/>
        }
        <div>{item.nombre}</div>
      </div>
      )}/>
      <Column  field="referencia" header="Referencia de producto" />
      <Column field="existencia" header="En existencia" body={(item: any) => <>{item.existencia} unidades</>}  />
      <Column field="unidadesMin" header="Unidades mínimas" body={(item: any) => 
        <div>
          {statusTemprale(item)}
        </div>
      }  
      />
      <Column
        header="Alerta Mínimo"
        align="center"
        body={(item: any) => (
          <InputSwitch
            checked={item.alerta === 1}
            name={item.nombre}
            id={`${item.idagep_productos}`}
            onChange={(e) => handleSwitchChange(e)}
          />
        )}
      />
      <Column
          header=""
          body={(item: any) => (
            <ButtonDetailsLeads destino={`/dashboard/catalogos/inventario/${item.idagep_productos}`}/>
          )}
        />
    </DataTable>
  )
}