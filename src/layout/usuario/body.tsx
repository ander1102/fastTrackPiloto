import EmptyTemplate from "@app/components/EmptyTemplate";
import { PermissionProps, UserType } from "@app/types/User";
import { Users } from "@app/types/UsersList";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { DetailsTemplate, StatusBodyTemplate } from "../app/layout";
import { NombreBodyTemplate, RolBodyTemplate } from "./templates";

interface UsuariosBodyProps extends PermissionProps {
  item: Users[] | null;
  isCalling: boolean;
  userType: UserType;
}

export default function UsuariosBody({
  permission,
  item,
  isCalling,
}: UsuariosBodyProps) {
  return (
    <section className="container-body">
      <DataTable
        value={item ?? []}
        paginator
        className="datatable-custom"
        scrollHeight="90%"
        scrollable
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        dataKey="idagep_usuarios"
        rowHover
        filterDisplay="menu"
        loading={isCalling}
        responsiveLayout="scroll"
        globalFilterFields={["nombre"]}
        currentPageReportTemplate=""
        style={{ background: "white" }}
        emptyMessage={EmptyTemplate}
      >
        <Column
          field="nombre"
          header="Nombre"
          dataType="numeric"
          style={{ minWidth: "25%" }}
          body={NombreBodyTemplate}
        />
        <Column
          field="email"
          header="Correo electrónico"
          style={{ minWidth: "33%" }}
          className="truncate"
        />
        <Column
          field="rol"
          header="Rol"
          style={{ minWidth: "22%", textOverflow: "elipsis" }}
          body={RolBodyTemplate}
        />
        <Column
          field="estatus"
          header="Estado"
          style={{ textOverflow: "elipsis" }}
          body={(item: Users) => (
            <StatusBodyTemplate estatus={item.estatusUsuario} />
          )}
        />
        {permission.read && (
          <Column
            field="flecha"
            style={{ width: "10%" }}
            body={(item: Users) => (
              <DetailsTemplate path={`/dashboard/usuarios/${item.email}`} />
            )}
          />
        )}
      </DataTable>
    </section>
  );
}
