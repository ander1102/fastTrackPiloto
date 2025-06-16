import withModalPageSize, {
  PageSizeModalProps,
} from "@app/components/HOC/withModalPageSize";
import { ViewProps } from "@app/components/ViewManager/View/comp";
import { Dialog } from "primereact/dialog";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import styles from "@app/components/ModalComponent/modal.module.css";
import { InputText } from "primereact/inputtext";
import { ButtonLoader } from "@app/components/Buttons";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useMemo, useRef, useState } from "react";
import { GENERO, SINO } from "@app/constants/form";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { isValidEmail } from "@app/common";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { toast } from "react-toastify";
import { FiltersItem } from "@app/components/ViewFilters";
import { InputNumber } from "primereact/inputnumber";
import { CardRequestRequest } from "@app/types/Card";

const INIT = {
  idagep_empresa: "",
  nombre: "",
  fechaNacimiento: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  email: "",
  curp: "",
  genero: "",
  rfc: "",
  direccion: "",
  colonia: "",
  municipio: "",
  codigoPostal: "",
  ocupacion: "",
  empresa: "",
  puesto: "",
  antiguedad: "",
  sueldoMensual: "" /*Numero solamente*/,
  dependienteEconomico: "" /*Opcion de Si o No*/,
  nombreReferencia: "",
  contactoReferencia: "",
  terminos: false,
  buroCredito: false,
};

const INIT_ERRORS = {
  curp: false,
  rfc: false,
  email: false,
};
import moment from "moment";
import { current } from "@reduxjs/toolkit";
interface RequestBusinessCardModalProps extends ViewProps<boolean> {
  handleOnRequestBussinessCard: (body: any) => void;
  loading: boolean;
  openRequestCardModal: () => void;
}

function RequestBusinessCardModal({
  loading,
  openRequestCardModal,
  handleOnRequestBussinessCard,
  visibleStyles,
  handleClose,
  show,
}: PageSizeModalProps<RequestBusinessCardModalProps>) {
  const [step, setStep] = useState(1);
  const [body, setBody] = useState<CardRequestRequest>(INIT);
  const [errors, setErrors] = useState(INIT_ERRORS);
  const DropDownRef = useRef<Dropdown>(null);

  const onDropdownChange = (e: DropdownChangeEvent) => {
    const value = e.target.value;
    setBody((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const onChange = ({ target }: any) => {
    let name = target.name;
    let value = target.value;
    if (name == "fechaNacimiento") value = moment(value).format("DD/MM/YYYY");
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeChekbox = ({ target }: any) => {
    setBody((prev) => ({ ...prev, [target.name]: target.checked }));
  };

  const currentFechaNacimiento = useMemo(() => {
    if (body.fechaNacimiento == "") return null;
    return moment(body.fechaNacimiento, "DD/MM/YYYY").toDate();
  }, [body.fechaNacimiento]);

  const disabledStep1 = useMemo(
    () =>
      !body.nombre.trim() ||
      !body.fechaNacimiento.trim() ||
      !body.apellidoPaterno.trim() ||
      !body.email.trim() ||
      !body.apellidoMaterno.trim() ||
      !body.curp.trim() ||
      !body.genero.trim() ||
      !body.rfc.trim(),
    [body]
  );

  const disabledStep2 = useMemo(
    () =>
      !body.direccion.trim() ||
      !body.colonia.trim() ||
      !body.municipio.trim() ||
      !body.codigoPostal.trim(),
    [body]
  );

  const disabledStep3 = useMemo(
    () =>
      !body.ocupacion.trim() ||
      !body.empresa.trim() ||
      !body.puesto.trim() ||
      !body.antiguedad.trim() ||
      !body.sueldoMensual ||
      !body.dependienteEconomico.trim(),
    [body]
  );

  const disabledStep4 = useMemo(
    () =>
      (!body.nombreReferencia.trim() ||
        !body.contactoReferencia.trim() ||
        !body.terminos ||
        !body.buroCredito) &&
      !loading,

    [body]
  );

  return (
    <Dialog
      visible={show}
      className="shadow-none lg:w-8/12"
      draggable={false}
      maskStyle={visibleStyles}
      maskClassName={styles.ModalBackground}
      onHide={() => handleClose(false)}
      closable={false}
    >
      <section className="flex flex-col items-center relative">
        <p
          className="absolute cursor-pointer  left-0"
          onClick={() => {
            handleClose(false);
            openRequestCardModal();
          }}
        >
          <i className={"pi pi-arrow-left  mr-3"} />
        </p>
        <h2 className="text-black-1 text-center text-3xl strong mb-1">
          Solicitud tarjeta empresarial
        </h2>
        <span className="text-center text-md text-grey-1 px-12 mb-1">
          Completa la información correspondiente
        </span>
        <div className="w-full p-3">
          <div className={` ${step !== 1 ? "hidden" : "w-full"}`}>
            <Grid lg={2} gap={3}>
              <FormItem label="Nombre(s)">
                <InputText
                  placeholder="Escribir nombre(s)"
                  value={body.nombre}
                  name="nombre"
                  onChange={onChange}
                />
              </FormItem>

              <FormItem label="Fecha de nacimiento">
                <Calendar
                  showIcon
                  value={currentFechaNacimiento}
                  onChange={onChange}
                  iconPos="right"
                  maxDate={new Date()}
                  placeholder="Escribir fecha de nacimiento"
                  className="w-full rounded border-[#ced4da] border-[1px]"
                  dateFormat="dd/mm/yy"
                  name="fechaNacimiento"
                  hourFormat="12"
                />
              </FormItem>
              <FormItem label="Apellido paterno">
                <InputText
                  placeholder="Escribir apellido paterno"
                  value={body.apellidoPaterno}
                  name="apellidoPaterno"
                  onChange={onChange}
                />
              </FormItem>
              <FormItem label="Correo electrónico">
                <InputText
                  placeholder="Escribir correo electrónico"
                  value={body.email}
                  name="email"
                  type="email"
                  onChange={onChange}
                  className={errors.email ? "p-invalid" : ""}
                />
              </FormItem>
              <FormItem label="Apellido materno">
                <InputText
                  placeholder="Escribir apellido materno"
                  value={body.apellidoMaterno}
                  name="apellidoMaterno"
                  onChange={onChange}
                />
              </FormItem>
              <FormItem label="CURP">
                <InputText
                  placeholder="Escribir CURP"
                  value={body.curp}
                  className={errors.curp ? "p-invalid" : ""}
                  name="curp"
                  onChange={onChange}
                  maxLength={18}
                />
              </FormItem>
              <FiltersItem>
                <FormItem label="Selecciona tu genero">
                  <Dropdown
                    ref={DropDownRef}
                    options={GENERO}
                    value={body.genero}
                    name="genero"
                    onChange={onDropdownChange}
                    placeholder="Seleccionar"
                    className="w-full"
                    style={{ borderRadius: 6 }}
                  />
                </FormItem>
              </FiltersItem>
              <FormItem label="RFC">
                <InputText
                  placeholder="Escribir RFC"
                  value={body.rfc}
                  name="rfc"
                  className={errors.rfc ? "p-invalid" : ""}
                  onChange={onChange}
                  maxLength={13}
                />
              </FormItem>
            </Grid>

            <div className="flex justify-center mt-5">
              <ButtonLoader
                className="button-next-large"
                label="Siguiente"
                icon="pi pi-arrow-right"
                iconPos="right"
                disabled={disabledStep1}
                onClick={() => {
                  if (disabledStep1) return false;
                  setErrors(INIT_ERRORS);
                  if (!isValidEmail(body.email)) {
                    toast.error(
                      "El campo correo electrónico no tiene un formato válido",
                      DEFAULT_TOAST_CONFIGURATION
                    );
                    setErrors((prev) => ({ ...prev, email: true }));
                    return false;
                  }
                  if (body.curp.length < 18) {
                    toast.error(
                      "El campo CURP no tiene un formato válido",
                      DEFAULT_TOAST_CONFIGURATION
                    );
                    setErrors((prev) => ({ ...prev, curp: true }));
                    return false;
                  }

                  if (body.rfc.length < 13) {
                    toast.error(
                      "El campo RFC no tiene un formato válido",
                      DEFAULT_TOAST_CONFIGURATION
                    );
                    setErrors((prev) => ({ ...prev, rfc: true }));
                    return false;
                  }
                  setStep(2);
                }}
              />
            </div>
          </div>
          <div className={` ${step !== 2 ? "hidden" : "w-full"}`}>
            <Grid lg={2} gap={3} className="my-5">
              <FormItem label="Calle y número">
                <InputText
                  placeholder="Escribir calle y número"
                  value={body.direccion}
                  name="direccion"
                  onChange={onChange}
                />
              </FormItem>

              <FormItem label="Colonia">
                <InputText
                  placeholder="Escribir colonia"
                  value={body.colonia}
                  name="colonia"
                  onChange={onChange}
                />
              </FormItem>
              <FiltersItem>
                <FormItem label="Municipio">
                  <InputText
                    placeholder="Escribir municipio"
                    value={body.municipio}
                    name="municipio"
                    onChange={onChange}
                  />
                </FormItem>
              </FiltersItem>
              <FormItem label="Código postal">
                <InputText
                  placeholder="Escribir código postal"
                  value={body.codigoPostal}
                  name="codigoPostal"
                  onChange={onChange}
                />
              </FormItem>
            </Grid>

            <div className="flex justify-center mt-10">
              <ButtonLoader
                className="button-back-large"
                label="Regresar"
                style={{ margin: "10px" }}
                onClick={() => setStep(1)}
              />
              <ButtonLoader
                className="button-next-large"
                label="Siguiente"
                icon="pi pi-arrow-right"
                iconPos="right"
                style={{ margin: "10px" }}
                disabled={disabledStep2}
                onClick={() => {
                  if (disabledStep2) return false;
                  setStep(3);
                }}
              />
            </div>
          </div>
          <div className={` ${step !== 3 ? "hidden" : "w-full"}`}>
            <Grid lg={2} gap={3} className="my-5">
              <FormItem label="Ocupación">
                <InputText
                  placeholder="Escribir ocupación"
                  value={body.ocupacion}
                  name="ocupacion"
                  onChange={onChange}
                />
              </FormItem>
              <FormItem label="Empresa">
                <InputText
                  placeholder="Escribir nombre de empresa"
                  value={body.empresa}
                  name="empresa"
                  onChange={onChange}
                />
              </FormItem>
              <FormItem label="Puesto">
                <InputText
                  placeholder="Escribir puesto"
                  value={body.puesto}
                  name="puesto"
                  onChange={onChange}
                />
              </FormItem>

              <FormItem label="Tiempo de antigüedad en el puesto">
                <InputText
                  placeholder="Escribir tiempo"
                  value={body.antiguedad}
                  name="antiguedad"
                  onChange={onChange}
                />
              </FormItem>

              <FormItem label="Venta estimada mensual">
                <InputNumber
                  name="sueldoMensual"
                  value={body.sueldoMensual !== '' ? +body.sueldoMensual : null}
                  onChange={({ value }) => {
                    setBody((prev) => ({ ...prev, sueldoMensual: value ?? '' }));
                  }}
                  prefix="$"
                  placeholder="Venta estimada mensual"
                  locale={"es-Mx"}
                  maxFractionDigits={2}
                  minFractionDigits={2}
                  min={0}
                />
              </FormItem>
              <FormItem label="Dependiente ecónomico">
                <Dropdown
                  ref={DropDownRef}
                  options={SINO}
                  value={body.dependienteEconomico}
                  name="dependienteEconomico"
                  onChange={onDropdownChange}
                  placeholder="Seleccionar"
                  className="w-full"
                  style={{ borderRadius: 6 }}
                />
              </FormItem>
            </Grid>
            <div className="flex justify-center mt-10">
              <ButtonLoader
                className="button-back-large"
                label="Regresar"
                style={{ margin: "10px" }}
                onClick={() => setStep(2)}
              />
              <ButtonLoader
                className="button-next-large"
                label="Siguiente"
                icon="pi pi-arrow-right"
                iconPos="right"
                style={{ margin: "10px" }}
                disabled={disabledStep3}
                onClick={() => {
                  if (disabledStep3) return false;
                  setStep(4);
                }}
              />
            </div>
          </div>
          <div className={` ${step !== 4 ? "hidden" : "w-full"}`}>
            <p className="text-primary text-xl">
              Información de contacto de referencia
            </p>
            <Grid lg={2} gap={3} className="my-5">
              <FormItem label="Nombre referencia">
                <InputText
                  placeholder="Escribir nombre referencia"
                  value={body.nombreReferencia}
                  name="nombreReferencia"
                  onChange={onChange}
                />
              </FormItem>
              <FormItem label="Contacto de referencia">
                <InputText
                  placeholder="Escribir contacto de referencia"
                  value={body.contactoReferencia}
                  name="contactoReferencia"
                  onChange={onChange}
                  maxLength={10}
                  onKeyDown={(e) => {
                    if (/[^0-9]/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                     />
              </FormItem>
            </Grid>

            <div className="mb-10">
              <div className="flex items-center mb-5">
                <Checkbox
                  checked={body.buroCredito}
                  name="buroCredito"
                  onChange={onChangeChekbox}
                  inputId="buroCredito"
                  className="mr-2"
                />
                <label htmlFor="buroCredito">
                  Estoy enterado de que esta forma se utilizará para la
                  autorización de la consulta de mi Buró de crédito
                </label>
              </div>
              <div className="flex items-center mb-5">
                <Checkbox
                  checked={body.terminos}
                  name="terminos"
                  onChange={onChangeChekbox}
                  inputId="terminos"
                  className="mr-2"
                />
                <label htmlFor="terminos">Acepto términos y condiciones</label>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <ButtonLoader
                className="button-back-large"
                label="Regresar"
                style={{ margin: "10px" }}
                onClick={() => setStep(3)}
              />
              <ButtonLoader
                className="button-primary-large"
                label="Confirmar"
                style={{ margin: "10px" }}
                disabled={disabledStep4}
                onClick={async () => {
                  await handleClose();
                  handleOnRequestBussinessCard(body);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  );
}

export default withModalPageSize(RequestBusinessCardModal);
