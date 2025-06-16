import { PDFDocument } from "pdf-lib"
import { LeadFile } from "@app/assets/pdfs/leadCotizacion"
import { DATE_TIME_FORMAT } from "@app/constants";
import { PaymentQR } from "@app/assets/pdfs/qrPago";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import {Clients} from "@app/components/Cotizador/types"
export const generateStatement = async (client: Clients) => {

    function getFieldValue(campo: string) {
        switch (campo) {
            case 'nombreCompleto': return client.nombre ?? 'Sin nombre'
            case 'nombreCompleto2': return client.nombre ?? 'Sin nombre'
            case 'fecha': return DATE_TIME_FORMAT.format(new Date()).split(',')[0]
            case 'nombreNegocio': return client.razonSocial ?? (client.nombre ?? 'Sin nombre')
            case 'agenteComercial': return client.agente ?? 'Sin Agente comercial'
            case 'giro': return client.infoCotizacion.giro ?? 'Sin giro'
            case 'actividad': return client.infoCotizacion.familia ?? 'Sin actividad'
            case 'rollosRegalados': return (client.infoCotizacion.rollos ?? "No")
            case 'ventaEstimada': return useTruncateAmout(Number(client.infoCotizacion.ventaMensual ?? 0))
            case 'ticketPromedio': return useTruncateAmout(Number(client.infoCotizacion.ticketProm ?? 0))
            case 'comisionC': return client.infoCotizacion.tasaCredito + '%' ?? '0%'
            case 'comisionI': return client.infoCotizacion.tasaInternacional + '%' ?? '0%'
            case 'comisionD': return client.infoCotizacion.tasaDebito + '%' ?? '0%'
            case 'tarjetaCredito': return (client.infoCotizacion.tarjeta ?? "No")
            case 'd30': return client.infoCotizacion.cantD20 ?? "0"
            case 'd20': return client.infoCotizacion.cantD30 ?? "0"
            case 'mini': return client.infoCotizacion.cantMini ?? "0"
            case 'ecommerce': return (client.infoCotizacion.ecommerce ?? "No")
        }
    }

    try {
        const statement_PdfBytes = _base64ToArrayBuffer(LeadFile);
        const pdfDoc = await PDFDocument.load(statement_PdfBytes);
        const logo_TP_bytes = _base64ToArrayBuffer(PaymentQR);
        const logo_TP_ = await pdfDoc.embedPng(logo_TP_bytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        form.getTextField('fecha').setText(String(getFieldValue('fecha')));
        form.getTextField('fecha').enableReadOnly()
        form.getTextField('nombreCompleto').setText(String(getFieldValue('nombreCompleto')));
        form.getTextField('nombreCompleto').enableReadOnly()
        form.getTextField('nombreCompleto2').setText(String(getFieldValue('nombreCompleto2')));
        form.getTextField('nombreCompleto2').enableReadOnly()
        form.getTextField('nombreNegocio').setText(String(getFieldValue('nombreNegocio')));
        form.getTextField('nombreNegocio').enableReadOnly()
        form.getTextField('agenteComercial').setText(String(getFieldValue('agenteComercial')));
        form.getTextField('agenteComercial').enableReadOnly()
        form.getTextField('giro').setText(String(getFieldValue('giro')));
        form.getTextField('giro').enableReadOnly()
        form.getTextField('actividad').setText(String(getFieldValue('actividad')));
        form.getTextField('actividad').enableReadOnly()
        form.getTextField('rollosRegalados').setText(String(getFieldValue('rollosRegalados')));
        form.getTextField('rollosRegalados').enableReadOnly()
        form.getTextField('ventaEstimada').setText(String(getFieldValue('ventaEstimada')));
        form.getTextField('ventaEstimada').enableReadOnly()
        form.getTextField('ticketPromedio').setText(String(getFieldValue('ticketPromedio')));
        form.getTextField('ticketPromedio').enableReadOnly()
        form.getTextField('comisionD').setText(String(getFieldValue('comisionD')));
        form.getTextField('comisionD').enableReadOnly()
        form.getTextField('comisionC').setText(String(getFieldValue('comisionC')));
        form.getTextField('comisionC').enableReadOnly()
        form.getTextField('comisionI').setText(String(getFieldValue('comisionI')));
        form.getTextField('comisionI').enableReadOnly()
        form.getTextField('tarjetaCredito').setText(String(getFieldValue('tarjetaCredito')));
        form.getTextField('tarjetaCredito').enableReadOnly()
        form.getTextField('d30').setText(String(getFieldValue('d30')));
        form.getTextField('d30').enableReadOnly()
        form.getTextField('d20').setText(String(getFieldValue('d20')));
        form.getTextField('d20').enableReadOnly()
        form.getTextField('mini').setText(String(getFieldValue('mini')));
        form.getTextField('mini').enableReadOnly()
        form.getTextField('ecommerce').setText(String(getFieldValue('ecommerce')));
        form.getTextField('ecommerce').enableReadOnly()
        form.getButton('qrPayment_af_image').setImage(logo_TP_);
        form.getButton('qrPayment_af_image').enableReadOnly();

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        return pdfDataUri;
    }
    catch (error) {
        console.log('Error en info');
    }

}

function _base64ToArrayBuffer(base64: string) {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}