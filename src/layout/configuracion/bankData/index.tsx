import { ClientProps, UserProps } from "@app/context";
import React from "react";
import BankDataConfiguration from "./data";
import EmailNotificationConfiguration from "./emailNotification";

export default function ConfigurationBankDataTab({
  user,
  client,
}: UserProps & ClientProps) {
  return (
    <div className="min-h-[55vh] mt-5 flex flex-col">
      <section className="flex flex-col flex-1 justify-between">
        <BankDataConfiguration user={user} />
      </section>
    </div>
  );
}
