import { SectionFormType } from "@app/types/Form";
import { ClientPersona } from "./types";
import createFisicaTabs from "./forms/fisica/tabs";
import createMoralTabs from "./forms/moral/tabs";

export default function createClientForm(
  persona: ClientPersona
): SectionFormType {
  switch (persona) {
    case "fisica":
      return {
        tabs: createFisicaTabs(),
      };
    case "moral":
      return { tabs: createMoralTabs() };
    default:
      return { tabs: [] };
  }
}
