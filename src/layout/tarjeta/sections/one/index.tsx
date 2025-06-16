import Grid from "@app/components/Grid";
import { CURRENCY_FORMAT } from "@app/constants";
import { Button } from "primereact/button";
import styles from "../styles.module.css";
import {
  CardInfoRequestResponseCard,
  CardCreditResponseCredit,
} from "@app/types/Card";
import moment from "moment";
import "moment/locale/es";

interface CardSectionOneProps {
  card?: CardInfoRequestResponseCard;
  credit?: CardCreditResponseCredit;
  block?: boolean;
  isCardDigital?: boolean;
  onClickBlock?: () => void;
  onClickDetail?: (type: string) => void;
  onClickPay?: () => void;
}

export default function CardSectionOne({
  card,
  credit,
  block,
  isCardDigital,
  onClickBlock,
  onClickDetail,
  onClickPay,
}: CardSectionOneProps) {

  return (
    <Grid.Item
      smd={6}
      slg={6}
      sxl={4}
      className="flex flex-col justify-between border border-solid border-light-gray-400 rounded-md px-5 py-5 bg-white"
    >
      <div className="flex flex-col items-center justify-center">
        <button
          disabled={isCardDigital}
          className="bg-primary text-white px-10 py-2 mb-5"
          onClick={() => onClickDetail && onClickDetail("V")}
        >
          Tarjeta Digital
        </button>
        <div className="relative">
          <img
            alt="card"
            src={
              card?.imagePNG
                ? "data:image/png;base64," + card?.imagePNG
                : "/Images/cards/card.png"
            }
            height={150}
            className="w-72 h-44"
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "200px",
              top: "0px",
            }}
          >
            <p
              className="text-white"
              style={{ position: "absolute", left: "70px", bottom: "102px" }}
            >
              {card?.bin.substring(card?.bin?.length - 8)}
            </p>
            <p
              className="text-white"
              style={{ position: "absolute", right: "40px", bottom: "102px" }}
            >
              {card?.expDate}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center my-3">
        <span className={styles.CardStatusTitle}>Estado: </span>
        <span className={styles.CardStatusValue}>
          {block ? "Desbloqueada" : "Bloqueada"}
        </span>
      </div>

      <div className="flex justify-center gap-3 mb-3">
        <Button
          disabled={!credit?.credit_auth}
          icon={
            <img
              alt="information"
              src="/Images/cards/information.png"
              width={12}
              height={12}
            />
          }
          className={styles.cardOutlineButton}
          style={{ fontSize: "12px" }}
          onClick={() => onClickDetail && onClickDetail(card?.type as string)}
        >
          <span className="p-0">Detalle</span>
        </Button>
        <Button
          disabled={!credit?.credit_auth}
          icon={
            <img
              alt="locked"
              src="/Images/cards/lock.png"
              width={12}
              height={12}
            />
          }
          onClick={() => {
            onClickBlock && onClickBlock();
          }}
          className={styles.cardOutlineButton}
        >
          <span style={{ fontSize: "12px" }} className="p-0">
            {block ? "Bloquear" : "Desbloquear"}
          </span>
        </Button>

        <Button
          disabled={!credit?.credit_auth}
          className={styles.cardButton}
          onClick={onClickPay}
        >
          <span style={{ fontSize: "12px" }} className="p-0">
            Pagar tarjeta
          </span>
        </Button>
      </div>
    

      <div className="mb-10">
        <div className="mb-5">Detalle de pago</div>
        <Grid sm={2} md={2} lg={2} className="mb-5">
          <Grid.Item className="text-light-gray">
            Tu saldo utilizado actual
          </Grid.Item>
          <Grid.Item className="text-right text-error">
            {CURRENCY_FORMAT.format((card?.credit_used as number) ?? 0)}
          </Grid.Item>
        </Grid>
        <hr className="mb-5" />
        <Grid sm={2} md={2} lg={2} className="mb-5">
          <Grid.Item className="text-grey-1">Pago mínimo a corte</Grid.Item>
          <Grid.Item className="text-grey-1 text-right">
            {CURRENCY_FORMAT.format((credit?.min_payment as number) ?? 0)}
          </Grid.Item>
        </Grid>
        <Grid sm={2} md={2} lg={2} className="mb-5">
          <Grid.Item className="text-primary">
            Pago para no generar intereses
          </Grid.Item>
          <Grid.Item className="text-primary text-right">
            {CURRENCY_FORMAT.format(
              (credit?.not_interest_payment as number) ?? 0
            )}
          </Grid.Item>
        </Grid>
        <Grid sm={2} md={2} lg={2} className="mb-5">
          <Grid.Item className="color-grey-1">Fecha límite de pago</Grid.Item>
          <Grid.Item className="text-grey-1 text-right ">
            {card?.limit_date
              ? moment(card?.limit_date as string, "YYYY-MM-DD").format(
                  "DD/MM/YYYY"
                )
              : "Cargando ..."}
          </Grid.Item>
        </Grid>
        <Grid sm={2} md={2} lg={2} className="mb-5">
          <Grid.Item className="color-grey-1">Fecha de corte</Grid.Item>
          <Grid.Item className="text-grey-1 text-right ">
            {card?.cut_off_date
              ? moment(card?.cut_off_date as string, "YYYY-MM-DD").format(
                  "DD/MM/YYYY"
                )
              : "Cargando ..."}
          </Grid.Item>
        </Grid>
      </div>
    </Grid.Item>
  );
}
