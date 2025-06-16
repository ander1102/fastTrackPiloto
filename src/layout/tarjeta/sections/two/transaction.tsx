import { CURRENCY_FORMAT } from "@app/constants";
import { TRANSACTION_CARD_IMAGES_URL } from "@app/constants/card";
import { CardTransactionType } from "@app/types/Card";
import Image from "next/image";

import styles from "./styles.module.css";

export interface CardTransactionProps {
  type: CardTransactionType;
  transaction: string;
  description?: string;
  amount: number;
}

export default function CardTransaction({
  amount,
  transaction,
  type,
  description,
}: CardTransactionProps) {
  const url = `/Images/cards/transactions/${TRANSACTION_CARD_IMAGES_URL[type]}.png`;
  return (
    <div className="flex items-center justify-between my-2 pr-4">
      <div className="w-[60px]">
        <Image alt="transaction" src={url} width={37} height={37} />
      </div>
      <div className="flex-[5]">
        <h4 className={styles.transactionTitle}>{transaction}</h4>
        <p className={styles.transactionDescription}>{description}</p>
      </div>
      <div className="flex-[1] text-right">
        {CURRENCY_FORMAT.format(
          type === CardTransactionType.WITHDRAWAL ? amount * -1 : amount
        )}
      </div>
    </div>
  );
}
