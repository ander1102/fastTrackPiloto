import { FormClientes } from "@app/layout/clientes/useFormClientes";
import { SectionFormType } from "@app/types/Form";
import { TabPanel, TabView, TabViewProps } from "primereact/tabview";
import React, { ComponentType, useMemo } from "react";
import RenderSections from "./sections";

export interface SectionFormProps
  extends SectionFormType,
    Partial<Pick<FormClientes, "activeTab" | "setActiveTab">> {}

export default function SectionForm({
  tabs,
  activeTab,
  setActiveTab,
}: SectionFormProps) {
  const handleTabChange = (event: any) => {
    if (setActiveTab) setActiveTab(event.index);
  };

  return (
    <TabView
      className="h-full"
      activeIndex={activeTab}
      onTabChange={setActiveTab && handleTabChange}
      renderActiveOnly={false}
      id="expedienteTabs"
    >
      {tabs.map((tab, idx) => {
        const Layout = useMemo(() => tab.TabLayout, []);
        return (
          <TabPanel key={tab.keyname} header={tab.display}>
            {Layout ? (
              <Layout title={tab.title} tabIndex={idx}>
                <RenderSections {...tab} tabIndex={idx} />
              </Layout>
            ) : (
              <RenderSections {...tab} tabIndex={idx} />
            )}
          </TabPanel>
        );
      })}
    </TabView>
  );
}
