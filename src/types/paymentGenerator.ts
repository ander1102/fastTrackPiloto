

export interface PaymentGeneratorLinkBody {
    token: string;
    concepto: string;
    monto: string;
}

export interface PaymentLinkGeneratorResponse {
    status: {
      code: string;
      description: string;
    };
    payload: CheckoutLink;
}

export interface CheckoutLink {
    token: string;
    mode: string;
}

export interface PaymentCommpanyInfoBody {
    token: string;
    hash: string;
}

export interface PaymentCommpanyInfoResponse {
    estatus: string;
    data: CommpanyInfo;
}

export interface CommpanyInfo {
    nombre: string,
    telefono: string,
    calle: string,
    numExt: string,
    colonia: string,
    ciudad: string,
    estado: string,
    pais: string,
    codigoPostal: string,
	mensaje: string,
}

export interface PreCheckoutPay {
    token: string;
    hash: string;
    monto: number;
    concepto: string;
}

export interface PreCheckoutPayResponse {
    status: {
        code: string;
        descripcion: string;
    };
    payload: {
        token: string;
        mode: string;
    }
}