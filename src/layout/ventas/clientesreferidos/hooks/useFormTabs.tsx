import { SectionFormType } from "@app/types/Form";
import { ClientPersona } from "@app/layout/clientes/form/types";
import createFisicaTabs from "../tabs/fisica";
import createMoralTabs from "../tabs/moral";

const useFormTabs = (type: ClientPersona): SectionFormType => {
  {
    switch (type) {
      case "fisica":
        return {
          tabs: createFisicaTabs(),
        };
      case "moral":
        return { tabs: createMoralTabs() };
      default:
        return { tabs: createFisicaTabs() };
    }
  }
};

export default useFormTabs;
