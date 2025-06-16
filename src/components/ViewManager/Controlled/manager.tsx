import React, { PureComponent } from "react";
import { EventHandler } from "@app/common/classes/EventHandler";
import { ValueHandler } from "@app/common/classes/ValueHandler";
import { Log } from "@app/common/log";

export type Status = "mounted" | "unmounted";

export interface ComponentRegister {
  key: string;
  status: Status;
}

export interface EventHandlerRegister {
  key: string;
  event: EventHandler;
}

export class RegisterComponentManager extends PureComponent {
  private componentMountEvents: ValueHandler<EventHandlerRegister[]>;
  private components: ValueHandler<ComponentRegister[]>;
  constructor(props: any) {
    super(props);
    this.components = new ValueHandler([]);
    this.componentMountEvents = new ValueHandler([]);
  }

  public registerComponent(entry: ComponentRegister) {
    this.addEntry(entry);
  }

  public changeStatus(key: string, status: Status) {
    const comp = this.components.get();
    const index = comp.findIndex((x) => x.key === key);
    if (index === -1) return;
    this.modifyEntry({ ...comp[index], status }, index);
  }

  private modifyEntry(entry: ComponentRegister, index: number) {
    const compCopy = this.components.getDeepCopy();
    compCopy[index] = entry;
    this.components.set(compCopy);
    Log.debug.log("unmounted", { components: compCopy });
    if (entry.status === "unmounted" && this.componentMountEvents) {
      const MountRef = this.getComponentHandler(entry.key);
      if (MountRef) {
        MountRef.event.listen();
        MountRef.event.clear();
      }
    }
  }

  public getComponentDetails(key: string) {
    const comp = this.components.get();
    Log.debug.log({ key, components: comp });
    return comp.find((comp) => comp?.key === key);
  }

  public getComponentHandler(key: string) {
    return this.componentMountEvents.get().find((x) => x.key === key);
  }

  private addEntry(entry: ComponentRegister) {
    const comp = this.components.get();
    if (comp.some((x) => x.key === entry.key)) {
      this.components.set(
        comp.map((x) => {
          if (x.key === entry.key) return entry;
          return x;
        })
      );
      return;
    }
    this.components.set(comp.concat(entry));
    if (this.componentMountEvents) {
      this.componentMountEvents.set(
        this.componentMountEvents.get().concat({
          key: entry.key,
          event: new EventHandler(),
        })
      );
    }
    Log.debug.log({
      entry,
      events: this.componentMountEvents,
    });
  }

  render() {
    return <></>;
  }
}
