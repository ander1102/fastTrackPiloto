export const colorsConfig = {
  primary: "#42d4abff",
  secondary:"#efc11b",
  tertiary: "#2ef203",
  quaternary: "#faf5fc",
  quinary: "#784c84" //monto total diario 
}

export const colorsReports = {
  color_1: "#ff8400",
  color_2: "#00b8c6ff",
  color_3: "#ed00deff",
  color_4: "#00ef94ff",
  color_5: "#6b004dff",
}

export const dailyReports = {
  color: colorsConfig.quinary
}

export const assetsConfig = {
  title: "Thunderpay",
  login: {
    imagen: "/Images/imagen_login.png",
    logo: "/Images/logo_login.png"
  },
  sidebar:{
    logo:"/Images/logo_sidebar.png",
    logo_mini: "/Images/logo_sidebar_mini.png"
  },
  resumen:{
    cumplimientoImg: "/Images/svg/cumplimiento.svg"
  },
  transaccion:{
    ticketTemplate: "/Images/transactions/ticket.svg",
    checkImg: "/Images/transactions/check.svg",
    rejectImg: "/Images/transactions/rejected.svg",
  },
  pagos_distancia: {
    qr_download_template: "/Images/integrations/qr_template.png",
    pre_checkout_img: "/Images/integrations/LinkDePagoFondo.png",
    img_btn_precheckout: "/Images/integrations/botonCheckOut.svg",
    info:{
      phone: "+52 81 1993 3760",
      address: "Av. Roble #660, S Torre Cytrus P3 NA 0, Colonia Valle del Campestre, C.P: 66265 San Pedro Garza García, Nuevo León, México."
    }
  }
}