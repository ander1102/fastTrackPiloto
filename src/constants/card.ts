import { shuffleArray } from "@app/common/format";
import { SectionItem } from "@app/components/Scroll/Section";
import { CardTransactionProps } from "@app/layout/tarjeta/sections/two/transaction";
import { CardTransactionType } from "@app/types/Card";
import { DropdownOptions } from "@app/types/Form";
import { DROPDOWN_ALL } from "./form";
import { CardTransactionsRequestResponseTransaction } from "@app/types/Card";

export const TRANSACTION_CARD_IMAGES_URL = [
  "deposit",
  "withdrawal",
  "cancelation",
];

export const TRANSACTION_CARD_OPERATION_DISPLAYS: DropdownOptions<CardTransactionType | null>[] =
  DROPDOWN_ALL<CardTransactionType | null>(null).concat([
    {
      label: "Depósito",
      value: CardTransactionType.DEPOSIT,
    },
    {
      label: "Retiro",
      value: CardTransactionType.WITHDRAWAL,
    },
  ]);