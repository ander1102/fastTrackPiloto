import Grid from "@app/components/Grid";
import { useRef } from "react";
import CardSectionTwoBody from "./body";
import {ICardTransactionsContext} from "./context";
import CardSectionTwoHeader from "./header";
import { CardInfoRequestResponseCard,CardCreditResponseCredit,CardTransactionsRequestResponseTransaction } from "@app/types/Card";
interface CardSectionTwoProps {
  card?: CardInfoRequestResponseCard;
  trasaction:CardTransactionsRequestResponseTransaction[];
  credit?: CardCreditResponseCredit;
  onFilter?: (filter: ICardTransactionsContext) => void;
}


export default function CardSectionTwo({
  card,
  trasaction,
  credit,
  onFilter,
}:CardSectionTwoProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  return (
   
      <Grid.Item
        ssm={1}
        ref={(ref) => (refs.current[0] = ref)}
        smd={6}
        slg={6}
        sxl={8}

        className="flex flex-col border border-solid border-light-gray-400 rounded-md px-10 py-5 bg-white"
      >
        <CardSectionTwoHeader ref={(ref) => (refs.current[1] = ref)} card={card} credit={credit} onFilter={onFilter} />
        <CardSectionTwoBody ref={refs} trasaction={trasaction} />
      </Grid.Item>
  );
}
