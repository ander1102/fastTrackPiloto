import {
  PropsWithChildren,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { OptionTemplate } from "@app/components/HOC/createDropdownData";
import { modalManager } from "@app/components/ModalComponent";
import CreateDeposit from "@app/components/ModalComponent/modals/deposits/CreateDeposit";
import { PageFormTitle } from "@app/layout/app/layout";
import { TabLayoutProps } from "@app/types/Form";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { actionsOptions } from "../utils";
import { ClientFormContext } from "./context";
import { InputSwitch } from "primereact/inputswitch";

const Title = memo(
  ({ title, tabIndex }: Pick<TabLayoutProps, "title" | "tabIndex">) => {
    const { formLayoutProps, formProps, clientProps } =
      useContext(ClientFormContext);

    const [currentReverso, setCurrentReverso] = useState<boolean>(false);

    useEffect(() => {
      setCurrentReverso(
        formProps.formik.values.infoOperaciones?.reverso == "si"
      );
    }, []);

    const handleActionsDropdown = async (ele: DropdownChangeEvent) => {
      if (ele.value === "createDeposit") {
        modalManager
          .show(
            CreateDeposit,
            {
              client: formProps.client,
              kpiReserveFund: formLayoutProps.kpiReserveFund,
              refreshReserveFund: formLayoutProps.refreshReserveFund,
            },
            "dashboard/client/editclient"
          )
          .then();
      }
    };

    const onSave = () => {
      formProps.formik.handleSubmit();
    };

    return (
      <div className="w-full my-5">
        <section className="w-full flex justify-end">
          {/* {clientProps.activeTab == 2 &&
            formLayoutProps.user.userType === "master" && (
              <div className="flex items-center mx-5">
                <InputSwitch
                  className="mx-3"
                  checked={currentReverso}
                  onChange={(e) => {
                    const newCurrentReverso = !currentReverso;
                    setCurrentReverso(newCurrentReverso);

                    const newValue = newCurrentReverso ? "si" : "no";

                    formProps.formik.setFieldValue(
                      "infoOperaciones.reverso",
                      newValue
                    );
                  }}
                />
                <label>
                  {currentReverso ? "Deshabilitar" : "Habilitar"} Reversos de
                  Transacciones
                </label>
              </div>
            )} */}
          <Button
            className="!bg-[#6B3374] w-[200px] flex justify-center"
            loading={formProps.formik.isSubmitting}
            disabled={formProps.formik.isSubmitting}
            onClick={onSave}
          >
            Guardar
          </Button>
        </section>
        <section className="w-full flex justify-between">
          <PageFormTitle
            title={title}
            showEditIcon={!clientProps.isNew}
            icon={false}
            color="black"
            onEditIconClick={() => {
              formProps.toggleDisabled(clientProps.activeTab ?? 0);
            }}
            disabled={formProps.disabled[clientProps.activeTab ?? 0]}
          >
            <section id={`_ClientTitleTabLeftChildren_${tabIndex}`} />
          </PageFormTitle>
        </section>
        <section id={`_ClientTitleTabSection_${tabIndex}`} className="mt-5" />
      </div>
    );
  }
);

export default function TabLayout({
  children,
  title,
  tabIndex,
}: TabLayoutProps) {
  return (
    <>
      <Title title={title} tabIndex={tabIndex} />
      <section className="rounded-lg bg-beige p-7">{children}</section>
    </>
  );
}
export function TabLayoutSimple({ children, title, tabIndex }: TabLayoutProps) {
  return (
    <>
      <section className="rounded-lg  p-7">{children}</section>
    </>
  );
}
