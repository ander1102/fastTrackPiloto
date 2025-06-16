import { ComissionReportData } from "@app/types/Reports";
import { UserType } from "@app/types/User";

interface ComissionReportEntotyColumnProps {
  userType: UserType;
  item: ComissionReportData;
}

export const ComissionReportEntotyColumn = ({
  userType,
  item,
}: ComissionReportEntotyColumnProps) => {
  const type: keyof ComissionReportData =
    userType === "master" ? "cliente" : "sucursal";
  return <span>{item[type]}</span>;
};
