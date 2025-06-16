import { Column } from "primereact/column";

import { useState, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import DepositEmpty from "@app/components/EmptyTemplate/DepositEmpty";
import { DetailsTemplate, StatusBodyTemplate } from "@app/layout/app/layout";
import { ClientsReferralsAllResponseData } from "@app/types/ClientsReferrals";
import { modalManager } from "@app/components/ModalComponent";
import DetailsCard from "@app/components/ModalComponent/modals/ventas/clientereferidos/DetailsCard";
import { ButtonDetails } from "@app/components/Buttons";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { UserContext } from "@app/context";
import { FormItem } from "@app/components/FormManager/FormItem";
import { toast } from "react-toastify";
import { ClientReferralsAllParams } from "@app/types/ClientsReferrals";
import { SetStateAction } from "react";
import { CatSeller, CatAgente } from "@app/components/Dropdowns";
import { DROPDOWN_ALL } from "@app/constants/form";
import { DataTableQuery } from "@app/types";
import { Dropdown } from "primereact/dropdown";
import { SellersController } from "@app/logic/backend/sellers";
interface BodyProps {
  items: Array<ClientsReferralsAllResponseData>;
  loader: boolean;
  onPage: (e: any) => void;
  lazyState: DataTableQuery;
  onRefresh: (body: SetStateAction<Partial<ClientReferralsAllParams>>) => void;
  totalRecords: number;
}
const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Correo copiado en portapapeles");
    })
    .catch((error) => {
      toast.error("Error al copiar en portapapeles");
    });
};

export default function Body({
  items,
  loader,
  onPage,
  lazyState,
  onRefresh,
  totalRecords
}: BodyProps) {
  const { user } = useContext(UserContext);
  const [gerente, setGerente] = useState<any>(null);
  const [seller, setSeller] = useState(null);
  const [optionsManager, setOptionsManager] = useState([{nombre: 'Todos', referencia: ''}]);
  const [optionSeller, setOptionSeller] = useState<any>([]);
  const rol_tipo = user.user.rol_tipo;
  const ShowDetailsButton = (item: ClientsReferralsAllResponseData) => {
    return (
      <ButtonDetails
        onClick={async () => {
          await modalManager.show(
            DetailsCard,
            { item },
            "dashboard/ventas/clientesreferidos"
          );
        }}
      />
    );
  };

  useEffect(() => {
    getManagerCatalog()
  }, [])

  useEffect(() => {
    if (gerente && gerente !== null && gerente.nombre !== 'Todos'){
      getSellerCatalog(gerente.referencia)
      onRefresh({ agente: ""})
    } else {
      setOptionSeller([])
      onRefresh({gerente: "", agente: ""})
    }
    const {user:{rol_tipo},user:{referencia} } = user
    if(rol_tipo === "Gerente_Comercial"){
      getSellerCatalog(referencia, rol_tipo)
    }
  }, [gerente])

  const getManagerCatalog = async() => {
    const {persona:{idagep_usuarios}} = user
    let res = await SellersController.catalogSeller(idagep_usuarios);
    if(res.isSuccess){
      const {response: {data}}:any = res
      setOptionsManager([...optionsManager, ...data])
    } else {
      setOptionsManager([])
    }
  }
  const handleManager = (e:any) => {
    const {value} = e;
    setGerente(value);
    onRefresh({gerente: value?.referencia ? value?.referencia : ""})
  }
  const handleSeller = (e:any) => {
    const {value} = e;
    if (value){
      setSeller(value)
      onRefresh({agente: value?.referencia ? value?.referencia : ""})
    }
  }

  const getSellerCatalog = async(referencia:string, rol?:string) => {
    let res = await SellersController.catalogAgent(referencia);
    if(res.isSuccess){
      const {response: {data}}:any = res
      if(rol === "Gerente_Comercial" ){
        setOptionSeller([{nombre: 'Todos', referencia: ''}, ...data])
      } else {
        setOptionSeller(data)
      }
    } else {
      setOptionSeller([])
    }
  }



  return (
    <div>
      <FiltersContainer gap={2} className="mb-3 px-7">
        {rol_tipo == "Administrador" && (
          <FiltersItem>
            <FormItem label="Gerente comercial" labelClassName="text-primary">
              <Dropdown
                options={optionsManager}
                value={gerente}
                onChange={(e) => {handleManager(e);setSeller(null)}}
                disabled={loader}
                optionLabel="nombre" 
                placeholder="Gerente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </FormItem>
          </FiltersItem>
        )}

        {["Administrador", "Gerente_Comercial"].includes(rol_tipo) && (
          <FiltersItem>
            <FormItem label="Agente comercial" labelClassName="text-primary">
              <Dropdown
                options={optionSeller}
                value={seller}
                onChange={(e) => handleSeller(e)}
                disabled={loader}
                optionLabel="nombre"
                placeholder="Agente comercial"
                className="w-full"
                style={{border:'1px solid #B8AFE6', borderRadius:6}}
              />
            </FormItem>
          </FiltersItem>
        )}
      </FiltersContainer>

      <section className="container-body">
        <DataTable
          value={items ?? []}
          paginator
          className="datatable-custom"
          scrollHeight="90%"
          scrollable
          rows={lazyState.rows}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
          dataKey="idagep_referido"
          rowHover
          filterDisplay="menu"
          responsiveLayout="scroll"
          loading={loader}
          globalFilterFields={["idagep_referido"]}
          emptyMessage={DepositEmpty}
          currentPageReportTemplate=""
          style={{ background: "white" }}
          onPage={onPage}
          lazy={true}
          totalRecords={totalRecords}
          first={lazyState.first}
        >
          <Column header="ID" field="idagep_referido" />
          <Column header="Nombre completo" field="nombre" />
          <Column header="Agente Comercial" field="agente" />
          <Column header="Teléfono" field="telefono" />

          <Column
            field="estatus"
            header="Estatus"
            style={{ textOverflow: "elipsis" }}
            body={(item) => <StatusBodyTemplate estatus={item.estatus} />}
          />
          <Column
            header="Correo electrónico"
            align={"center"}
            alignHeader={"center"}
            body={(item) => (
              <a
                onClick={() => copyToClipboard(item.email)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                >
                  <path
                    d="M0.229492 2.08429V15.4419H20.5728V0.182617H0.229492V2.08429ZM1.07683 2.74809L7.68833 7.92288L1.07683 13.6962V2.74809ZM1.33991 14.5925L8.36845 8.45413L10.4006 10.0448L12.4328 8.45413L19.4614 14.5925H1.33991ZM19.7255 13.6962L13.114 7.92186L19.7255 2.74809V13.6962ZM1.07683 1.02996H19.7255V1.67133L10.4017 8.96804L1.07683 1.67133V1.02996Z"
                    fill="#B8AFE6"
                  />
                </svg>
              </a>
            )}
          />
          <Column
            field="flecha"
            style={{ width: "10%" }}
            body={(item) => {
              if (item.idagep_empresa) {
                return ShowDetailsButton(item);
              } else {
                return (
                  <DetailsTemplate
                    path={`/dashboard/ventas/clientesreferidos/${item.idagep_referido}`}
                  />
                );
              }
            }}
          />
        </DataTable>
      </section>
    </div>
  );
}
