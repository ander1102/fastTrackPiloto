import LeadsInputText from "@app/components/Inputs/LeadsInputText";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { PermissionProps } from "@app/types/User";
import { LeadsGetBody } from "@app/types/Leads";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar, CalendarChangeEvent } from "@app/components/Calendar";
import { copyToClipboard } from "@app/utils/DOM";
import { NewLeadModal } from "./Modal/NewLeadModal";
import { LeadsControllers } from "@app/logic/backend/leads";
import styles from "@app/styles/Leads.module.css";
import { DateFormat } from "@app/common/format";
import { toast } from "react-toastify";
import { FiltersContainer, FiltersItem } from "@app/components/ViewFilters";
import { FormItem } from "@app/components/FormManager/FormItem";

interface LeadsHeaderProps extends PermissionProps {
  onRefresh: (body: SetStateAction<Partial<LeadsGetBody>>) => void;
  filters: any;
  isCalling: boolean;
  user: any;
}

export default function LeadsHeader({
  permission,
  onRefresh,
  filters,
  isCalling,
  user,
}: LeadsHeaderProps) {
  const DropDownRef = useRef<Dropdown>(null);
  const [dateStart, setDateStart] = useState<any>("");
  const [dateEnd, setDateEnd] = useState<any>("");
  const [visible, setVisible] = useState(false);
  const [seller, setSellers] = useState<string>("");
  const [options, setOptions] = useState<Array<any>>([]);

  const optionStatus = [
    { label: "Nuevo", value: "Nuevo" },
    { label: "Calificado", value: "CALIFICADO" },
    { label: "No Calificado", value: "NOCALIFICADO" },
    { label: "Contactado", value: "CONTACTADO" },
    { label: "Convertido", value: "CONVERTIDO" },
    { label: "Todos", value: "ALL" },
  ];

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onRefresh({
      busqueda: e.target.value,
    });
  };

  useEffect(() => {
    handleGetSeller();
  }, []);

  const handleGetSeller = async () => {
    const sellerResp = await LeadsControllers.getSellers({
      idagep_leads: 0,
      operacion: "R",
    });
    if (sellerResp.status === 200) {
      const { data } = sellerResp.response;
      const transformedData = data.map((vendedor: any) => ({
        label: vendedor.nombre,
        value: vendedor.nombre,
      }));
      setOptions([{ label: "Vendedor", value: "" }, ...transformedData]);
    } else {
      setOptions([]);
    }
  };

  const onChange = (id: number) => (e: CalendarChangeEvent) => {
    const date = e.value as Date;
    if (id === 1) {
      setDateStart(date);
      onRefresh({
        fechaIni:
          date !== null
            ? DateFormat.day.start(date, true).toSimpleFormatString()
            : "",
      });
      return;
    }
    setDateEnd(date);
    onRefresh({
      fechaFin:
        date !== null
          ? DateFormat.day.end(date, true).toSimpleFormatString()
          : "",
    });
  };

  const onDropdownChange = (e: DropdownChangeEvent) => {
    onRefresh({ estatus: e.target.value });
  };
  const copyReference = () => {
    copyToClipboard(user.user.referencia);
    toast.success("Número de referencia copiado");
  };
  return (
    <>
      <div>
        Número de referencia:{" "}
        <span
          className={styles.referenceNumber}
          onClick={() => copyReference()}
          style={{ cursor: "pointer" }}
        >
          {user.user.referencia}
        </span>
      </div>
      <FiltersContainer>
        <FiltersItem>
          <span className="p-input-icon-right w-full">
            <LeadsInputText
              placeholder="Buscar lead o negocio"
              delayOnChange={700}
              onChange={onSearch}
              className="w-full"
              disabled={isCalling}
            />
            <i className="pi pi-search" />
          </span>
        </FiltersItem>
        <FiltersItem>
          <FormItem label="Buscar por fecha">
            <Calendar
              id="icon1"
              placeholder="Fecha inicio"
              className="myCalendarButton w-full mb-0"
              showIcon
              showButtonBar
              maxDate={new Date()}
              onChange={onChange(1)}
              value={dateStart}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="">
            <Calendar
              id="icon1"
              placeholder="Fecha fin"
              className="myCalendarButton w-full mb-0"
              showIcon
              showButtonBar
              maxDate={new Date()}
              onChange={onChange(2)}
              value={dateEnd}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem>
          <FormItem label="Estado">
            <Dropdown
              ref={DropDownRef}
              options={optionStatus}
              value={filters.estatus}
              onChange={onDropdownChange}
              disabled={isCalling}
              placeholder="Estado"
              style={{
                border: "1px solid #B8AFE6",
                borderRadius: 6,
                minWidth: "100%",
              }}
            />
          </FormItem>
        </FiltersItem>

        <FiltersItem smd={2}>
          <Button
            className={styles.btnNewLead}
            onClick={() => setVisible(true)}
          >
            + Nuevo lead
          </Button>
        </FiltersItem>
      </FiltersContainer>

      <NewLeadModal
        visible={visible}
        onHide={() => setVisible(false)}
        user={user}
      />
    </>
  );
}
