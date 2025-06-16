import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button } from '@app/components/Buttons';
import { GeneralForm } from './Form/general';
import { DirecctionForm } from './Form/direccion';
import { SellersController } from '@app/logic/backend/sellers';
import { ModalConfirmAgent } from './Form/modalConfirm';
import style from '@app/styles/AgenteComercial.module.css'

export const AgenteNew = ({user, ...props}: any) => {
  const typeUser = user.user.rol_tipo
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general, setGeneral] = useState<any>({
    manager: "",
    sellerCommission: 0.00,
    name: "",
    cellphone: "",
    email: "",
    billingProof: {},
    bankStatement: {},
    taxId: {},
    IdOf: {},
    cv: {},
  })
  const [address, setAddress] = useState<any>({
    street: "",
    neighborhood: "",
    extNumber: "",
    intNumber: "",
    district: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  })
  const [validationErrors, setValidationErrors] = useState<any>({});

  const sendSellerInfo = async() => {
    setLoading(true)
    let data = {
      "idagep_seller" : 0,
      "nombre" : general.name,
      "referencia": general.manager.referencia !== undefined ? general.manager.referencia : "",
      "email": general.email,
      "ganancia": general.sellerCommission !== null ? general.sellerCommission : 0.00,
      "infoSeller": {
        "calle":  address.street,
        "codigoPostal": address.zipCode,
        "colonia": address.neighborhood,
        "estado": address.state,
        "municipio": address.district,
        "numExt": address.extNumber,
        "pais": address.country,
        "numInt": address.intNumber,
        "ciudad" : address.city,
        "telefono": general.cellphone
      },
      "accesos" : "{}",
      "rol" : "Lectura",
      "estatus" : 1,
      "operacion" : "C"
    }
    const response = await SellersController.createSeller(data)
    if(response.isSuccess && !response.response.code) {
      if(response.response.mensaje && response.response.mensaje.mensaje === "Agente previamente registrado") {
        toast.error(response.response.mensaje.mensaje);
        setLoading(false)
        return;
      }
      await sendSellerDocs(response.response.idagep_seller, 'si')
      toast.success('Creación de Agente comercial correcto')
      setLoading(false)
      router.push('/dashboard/ventas/agentecomercial')
    } else {
      setLoading(false)
      toast.error('Ocurrió un error en la creación del agente comercial.')
    }
  }

  const prepararInfoDocumentos =() => {
    let type:any = {
      "billingProof": "domicilio",
      "cv": "cv",
      "bankStatement": "estadoC",
      "taxId": "cedula",
      "IdOf": "identificacion"
    }
    const infoDocumentos:any = [];
    for (const documentoTipo in general) {
      if (typeof general[documentoTipo] === 'object' && Object.keys(general[documentoTipo]).length > 0) {
        const tipoDocumento = type[general[documentoTipo].id];
        if (tipoDocumento){
          infoDocumentos.push({
            documentoTipo: type[general[documentoTipo].id],
            extension: general[documentoTipo].extension,
            docBase64: general[documentoTipo].value?.split(',')[1],
          });
        }
      }
    }
    return infoDocumentos;
  }

  const sendSellerDocs = async(id:number, compare: string) => {
    setLoading(true)
    let data = {
      "idagep_seller" : id,
      "nuevo": compare,
      "infoDocumentos": prepararInfoDocumentos()
    }
    const response = await SellersController.sendDocsSeller(data)
    if(response.isSuccess) {
      setLoading(false)
      toast.success('Carga de Archivos correcta')
    } else {
      setLoading(false)
      toast.error('Ocurrió un error en la carga de archivos')
    }
  }

  const clearValidationError = (fieldName: string) => {
    setValidationErrors((prevErrors: any) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleSubmit = () => {
    setValidationErrors({})
    const requiredFields = typeUser === "Administrador" || typeUser === "Gerente_Comercial" ? ['manager', 'name', 'cellphone', 'email'] :  ['name', 'cellphone', 'email'];
    const fileFields = ['billingProof', 'bankStatement', 'taxId', 'IdOf', 'cv'];
    const addressFields = ['street', 'neighborhood', 'extNumber', 'district', 'zipCode', 'city', 'state', 'country'];
    const errors: any = {};

    requiredFields.forEach((field) => {
      if (!general[field]) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    fileFields.forEach((field) => {
      if (!general[field] || Object.keys(general[field]).length === 0) {
        errors[field] = 'Este campo requiere la carga de un archivo';
      }
    });

    addressFields.forEach((field) => {
      if (!address[field]) {
        errors[field] = 'Este campo es obligatorio';
      }
    });
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Error: Favor de completar todos los campos para enviar')
      return;
    } else {
      setVisible(true)
    }
  };

  return(
    <>
      <div style={{padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
        <div>
          <div>
            <span className={style.titleHeaderNew}>Nuevo Agente Comercial</span>
          </div>
          <div className={style.wrapperBackNavigation} onClick={() => router.back()}>
            <Image style={{width: 20, height: 20}} alt="back" src={require('../../../../../public/Images/backArrow.png')}/>
            <span style={{marginLeft: '10px', fontSize: 20, color: '#6A6D74'}}>Regresar</span>
          </div>
        </div>
        <div>
          <Button className={style.btnSaveSeller} loading={loading} onClick={handleSubmit}>Guardar</Button>
        </div>
      </div>
      <div style={{backgroundColor: '#FFF'}}>
        <div style={{padding: 20}}>  
          <div>
            <span style={{color: '#5840D1', fontSize: 25}}>General</span>
          </div>
          <div style={{backgroundColor: '#FAF9F7', padding: 20}}>
            <GeneralForm user={user} typeUser={typeUser} setGeneral={setGeneral} general={general} validationErrors={validationErrors} clearValidationError={clearValidationError}/>
          </div>
        </div>
        <div style={{padding: 20}}>
          <div>
            <span style={{color: '#5840D1', fontSize: 25}}>Dirección</span>
          </div>
          <div style={{backgroundColor: '#FAF9F7', padding: 20}}>
            <DirecctionForm setAddress={setAddress} address={address} validationErrors={validationErrors} clearValidationError={clearValidationError}/>
          </div>
        </div>
      </div>
      <ModalConfirmAgent visible={visible} setVisible={setVisible} sendSellerInfo={sendSellerInfo}/>
    </>
  )
}