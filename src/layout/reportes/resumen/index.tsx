import ResumeReportsBody from "./body";
import ResumeReportsHeader from "./header";
import ResumeReportsKPIS from "./kpis";
import { AppContextProps } from "@app/components/HOC/withAppContext";

export interface ResumeReportsProps
  extends Pick<AppContextProps, "userType" | "user"> {}

export default function ResumeReports({ userType, user }: ResumeReportsProps) {
  return (
    <>
      <section className="container-header">
        <ResumeReportsKPIS user={user} userType={userType} />
      </section>

      <section className="container-body">
        <ResumeReportsHeader userType={userType} />
        <ResumeReportsBody userType={userType} user={user} />
      </section>
    </>
  );
}
