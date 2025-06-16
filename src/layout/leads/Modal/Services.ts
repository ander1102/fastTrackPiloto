export const onboardingPayload = (data : any) => {
  return {
    idagep_empresa: 0,
      nombre: data.name,
      giro: data.giro,
      descripcion: "",
      email: data.email,
      persona:data.persona,
      aceptaTerminos: "1",
      referencia: data?.gerente?.referencia ?? "",
      estatus: 1,
      infoComercio: {
          fechaConst: "",
          giroSocial: "",
          paisConst: "",
          telefono: data.phone,
          razonSocial: data.nombreComercial,
          email: data.email,
      },
      infoDomicilio: {
        estado: data.estado,
        
      },
      infoContactos: [
          {
              nombre: data.name.value,
              telefono: data.phone.value,
              email: data.email.value,
          },
      ],
      infoRepresentantes: [
          {
              nombre: "",
              fechaNacimiento: "",
              rfc: "",
              curp: "",
              pais: "",
              acreditacion: "",
              numeroAcreditacion: "",
          },
      ],
      infoServicios: {
        ProD30: data.terminalD30.check ? data.terminalD30.quantity : "0",
        SmartD20: data.terminalD20.check ? data.terminalD20.quantity : "0",
        TLS: data.ecommerce ? "1" : "0",
        TC: data.creditCard ? "1" : "0"
      },
      subAfiliado: "0",
      accesos: [
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "usuarios",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "tarjeta", //duda
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "terminales",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "sucursales",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "resumen",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "integracion",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "transacciones",
          },
          {
              create: true,
              delete: true,
              read: true,
              update: true,
              departamento: "depositos",
          },
      ],
      nombreUsuario: data.name,
      emailUsuario: data.email,
      operacion: "c",
  }
}