import { KpiContainer } from "@app/components/ViewKpis";

export default function Header() {
  return (
    <section className="w-full h-full py-5 px-10">
      <KpiContainer title="Nuevo Pago Recurrente" back></KpiContainer>
    </section>
  );
}
