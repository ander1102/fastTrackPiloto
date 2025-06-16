import { LinkForm } from "./LinkForm";
import { OneLineAccordion } from "@app/components/OneLineAccordion";

export interface IntegrationLinksProps {
  imagePath: string;
  title: string;
  description: string;
}

export function IntegrationLinks({
  title,
  description,
  imagePath,
}: IntegrationLinksProps) {
  return (
    <article className="relative rounded-lg flex-wrap p-6 pt-20 pb-8 flex justify-start flex-col gap-20 w-full max-w-[32rem] bg-white">
      <section className="flex-col gap-3 px-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <picture
            className={`w-20 h-20 p-[10px] rounded-full ${
              title === "Link de Pago" ? "bg-[#6B3374]" : "bg-[#6B3374]"
            }`}
          >
            <img alt="" src={imagePath} />
          </picture>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-[#2E3339] text-2xl text-center">{title}</h3>
          <p className="text-dark-gray-200 text-center">{description}</p>
        </div>
      </section>

      <section className="w-full flex items-center justify-center">
        <OneLineAccordion
          iconColor={ "#6B3374"}
          bgColor={"#FAF5FB"}
        >
          <LinkForm isLinkPago={title === "Link de Pago"} />
        </OneLineAccordion>
      </section>
    </article>
  );
}
