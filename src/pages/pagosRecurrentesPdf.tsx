import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import { IMAGES_PATH } from "@app/constants/pagosRecurrentes";
export default function pagosRecurrentesPdf() {
  const router = useRouter();
  const { token, id } = router.query;
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (token && id) {
      handlePdf();
    }
  }, [token, id]);

  useEffect(()=>{
    if(ready){
      router.push("/")
    }
  },[ready])

  const handlePdf = async () => {
    const responseTicketPayments =
      await PagosRecurrentesController.ticketPayments({
        token: String(token),
        id: Number(id),
      });
    if (responseTicketPayments.isSuccess || true) {
      const { response } = responseTicketPayments;

      try {
        const url = "/pdf/pagosRecurrentesPdf.pdf";
        const existingPdfBytes = await fetch(url).then((res) =>
          res.arrayBuffer()
        );

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const form = pdfDoc.getForm();
        const nameFile = response.nombrePago.replaceAll(" ", "_");
        const [dd, mm, yy] = response.fechaPago.split("/").map(Number);
        const fechaPago = new Date(2000 + yy, mm - 1, dd);

        const fechaLugar = fechaPago.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const location = `San Pedro Garza García ${fechaLugar}`;

        form.getTextField("fecha").setText(location);
        form.getTextField("fecha").setFontSize(10);
        form.getTextField("fecha").enableReadOnly();

        form.getTextField("nombreComercio").setText(response.empresa);
        form.getTextField("nombreComercio").enableReadOnly();
        form.getTextField("direccion").setText(response.direccion);
        form.getTextField("direccion").enableReadOnly();

        form
          .getTextField("recibidosTotales")
          .setText(response.totalPagos.toString());
        form.getTextField("recibidosTotales").enableReadOnly();

        form.getTextField("formaPago").setText(response.formaPago);
        form.getTextField("formaPago").enableReadOnly();

        form.getTextField("nombreReceptor").setText(response.nombreSuscriptor);
        form.getTextField("nombreReceptor").enableReadOnly();

        form.getTextField("fechaSiguiente").setText(response.sigPago);
        form.getTextField("fechaSiguiente").enableReadOnly();

        form.getTextField("nombrePago").setText(response.nombrePago);
        form.getTextField("nombrePago").enableReadOnly();

        form.getTextField("moneda").setText(response.moneda);
        form.getTextField("moneda").enableReadOnly();

        form.getTextField("fechaContratacion").setText(response.fechaCont);
        form.getTextField("fechaContratacion").enableReadOnly();

        form.getTextField("recurrencia").setText(response.recurrencia);
        form.getTextField("recurrencia").enableReadOnly();

        form
          .getTextField("recibidosPendientes")
          .setText(response.pagosFaltan.toString());
        form.getTextField("recibidosPendientes").enableReadOnly();

        form.getTextField("cantidad").setText(response.totalPagos.toString());
        form.getTextField("cantidad").enableReadOnly();

        form
          .getTextField("pagosRealizado")
          .setText(response.pagosRealizados.toString());
        form.getTextField("pagosRealizado").enableReadOnly();

        form
          .getTextField("montoPagado")
          .setText(response.montoPagado.toString());
        form.getTextField("montoPagado").enableReadOnly();

        form.getTextField("montoTotal").setText(response.montoTotal.toString());
        form.getTextField("montoTotal").enableReadOnly();

        form.getTextField("metodoPago").setText(response.reqtls_tipotarj);
        form.getTextField("metodoPago").enableReadOnly();

        form.getTextField("fechaExpedida").setText(response.fechaPago);
        form.getTextField("fechaExpedida").enableReadOnly();

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const a = document.createElement("a");
        const link = window.URL.createObjectURL(blob);
        a.href = link;
        a.download = `${nameFile}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        await window.URL.revokeObjectURL(link);
        setReady(true)
      } catch (error) {
        console.error(error);
      }
    }
  };



  return (
    <div className="bg-white w-screen h-screen absolute left-0 opacity-90">
      <div className="flex justify-center items-center h-full w-full">
        <img src={IMAGES_PATH.LOADER} width={200} className="animate-spin" />
      </div>
    </div>
  );
}
