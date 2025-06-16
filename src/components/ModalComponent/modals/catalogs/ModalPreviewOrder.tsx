import { Dialog } from "primereact/dialog"
import Image from "next/image";
import styles from "@app/styles/Productos.module.css"
import { Button } from "primereact/button";
import { useState } from "react";
import { ModalLinkCheckOut } from "./modalLinkCheckOut";
import { CatalogsController } from "@app/logic/backend/catalogos";
import { toast } from "react-toastify";

export const ModalPreviewOrder = ({visible, onHide, productSelected, setProductSelected, productos, setProductos, user}:any) => {
  const [showModalLink, setShowModalLink] = useState(false);
  const [load, setLoad] = useState(false);
  const [link, setLink] = useState("")
  const {idagep_empresa} = user;

  const handleIncrement = (productId: any) => {
    const productIndex = productSelected.findIndex((product: any) => product.idagep_productos === productId);
    if (productIndex !== -1) {
      const product = productSelected[productIndex];
      const availableQuantity = productos.find((p: any) => p.idagep_productos === productId)?.unidades || 0;
      if (product.cantidad < availableQuantity) {
        const updatedProductSelected = [...productSelected];
        updatedProductSelected[productIndex] = { ...product, cantidad: product.cantidad + 1 };
        setProductSelected(updatedProductSelected);
      }
    }
  };
  
  const handleDecrement = (productId: any) => {
    const updatedProductSelected = productSelected.map((product: any) =>
      product.idagep_productos === productId ? { ...product, cantidad: Math.max(product.cantidad - 1, 1) } : product
    );
    setProductSelected(updatedProductSelected);
  };

  const handleRemove = (productId: any) => {
    const updatedProductSelected = productSelected.filter((product: any) => product.idagep_productos !== productId);
    setProductSelected(updatedProductSelected);
    const updatedProductos = productos.map((product: any) =>
      product.idagep_productos === productId ? { ...product, cantidad: 0 } : product
    );
    setProductos(updatedProductos);
  };

  const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear().toString().substring(2);
    let hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const ampm = hora >= 12 ? 'PM' : 'AM';
    hora = hora % 12;
    hora = hora ? hora : 12;
    return `${dia}/${mes}/${año} ${hora}:${minutos} ${ampm}`;
  }

  const calcularPrecioTotal = () => {
    let total = 0;
    productSelected.forEach((product: any) => {
      total += product.precio * product.cantidad;
    });
    return total.toFixed(2);
  };

  const formatoMoneda = (numero:number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(numero);
  }

  const transformData = () => {
    let restotal = 0;
    let newData = productSelected.map((producto:any) => {
      const price = parseFloat((producto.cantidad * producto.precio).toFixed(2));
      return {
        "idagep_productos": producto.idagep_productos,
        "item": producto.nombre,
        "cant": producto.cantidad,
        "item_price": producto.precio,
        "price": price
      };
    });

    newData.forEach((product: any) => {
       restotal += parseFloat((product.cant * product.item_price).toFixed(2));
    });

    let body = {
      idagep_empresa,
      productos:newData,
      total: restotal,
      operacion: "C"
    }
    return body
  }

  const handleLinkPayment = async () => {
    setLoad(true)
    const body = transformData();
    const res = await CatalogsController.paymentLink(body)
    if (res.response?.msg === "No se genero el link de pago") {
      toast.error(res.response.msg)
      setLoad(false)
    } else if (res.response?.msg === "error en api") {
      toast.error("Ocurrió un error intente más tarde")
      setLoad(false)
    } else {
      const {token} = res.response?.payload
      setShowModalLink(true)
      onHide(true)
      setLink(token)
      setLoad(false)
    }
    setLoad(false)
  }

  return(
    <>
      <Dialog
      id="ModalPreviewOrder"
      visible={visible}
      style={{ width: "50vw", borderRadius:10, maxWidth: '500px', }}
      draggable={false}
      focusOnShow={false}
      onHide={()=>onHide()}
      headerStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      contentStyle={{borderBottomRightRadius: 9, borderBottomLeftRadius: 9}}
      >
        <article className="max-w-xl" style={{marginBottom: 40}}>
          <div className="flex justify-center mb-2">  
          <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.99" d="M26.1799 43.693C25.782 43.6934 25.3879 43.6152 25.0202 43.4628C24.6526 43.3104 24.3188 43.0869 24.0379 42.805L15.5179 34.285C15.2327 34.0046 15.0058 33.6706 14.8504 33.3021C14.695 32.9336 14.6141 32.538 14.6123 32.138C14.6106 31.7381 14.6881 31.3418 14.8403 30.972C14.9925 30.6021 15.2165 30.2661 15.4992 29.9833C15.782 29.7005 16.118 29.4765 16.4877 29.3241C16.8575 29.1718 17.2538 29.0943 17.6537 29.0959C18.0537 29.0975 18.4493 29.1784 18.8178 29.3337C19.1864 29.4891 19.5205 29.7158 19.8009 30.001L20.523 30.7237C23.6469 33.85 28.7139 33.851 31.839 30.7259L42.7799 19.785C43.0603 19.4998 43.3944 19.2731 43.763 19.1177C44.1315 18.9624 44.5271 18.8816 44.9271 18.8799C45.327 18.8783 45.7233 18.9558 46.0931 19.1081C46.4628 19.2605 46.7988 19.4845 47.0816 19.7673C47.3643 20.0501 47.5883 20.3861 47.7405 20.756C47.8927 21.1258 47.9702 21.5221 47.9685 21.922C47.9667 22.322 47.8858 22.7176 47.7304 23.0861C47.575 23.4546 47.3481 23.7886 47.0629 24.069L28.3209 42.806C28.04 43.0876 27.7063 43.3109 27.3389 43.4631C26.9715 43.6153 26.5776 43.6934 26.1799 43.693Z" fill="#B8AFE6"/>
            <path d="M31.291 1C25.2999 1.0002 19.4433 2.77696 14.462 6.10561C9.48059 9.43426 5.59814 14.1653 3.30557 19.7004C1.01299 25.2356 0.413251 31.3263 1.58219 37.2023C2.75112 43.0783 5.63624 48.4757 9.87269 52.712C14.1091 56.9483 19.5067 59.8333 25.3827 61.002C31.2588 62.1708 37.3494 61.5708 42.8845 59.2781C48.4196 56.9853 53.1505 53.1027 56.479 48.1212C59.8074 43.1398 61.584 37.2831 61.584 31.292C61.584 27.3139 60.8005 23.3748 59.2781 19.6995C57.7557 16.0243 55.5243 12.6849 52.7113 9.87197C49.8984 7.05908 46.5589 4.82781 42.8836 3.30555C39.2083 1.7833 35.2691 0.999869 31.291 1ZM47.065 24.063L28.321 42.806C28.0398 43.0874 27.7059 43.3107 27.3384 43.463C26.9708 43.6154 26.5769 43.6938 26.179 43.6938C25.7812 43.6938 25.3872 43.6154 25.0197 43.463C24.6521 43.3107 24.3182 43.0874 24.037 42.806L15.517 34.286C15.2356 34.0048 15.0123 33.671 14.8599 33.3035C14.7075 32.9361 14.629 32.5422 14.6288 32.1444C14.6286 31.7466 14.7068 31.3527 14.8588 30.9851C15.0109 30.6175 15.2339 30.2834 15.515 30.002C15.7962 29.7206 16.13 29.4973 16.4975 29.3449C16.8649 29.1925 17.2588 29.1139 17.6566 29.1138C18.0544 29.1136 18.4484 29.1917 18.8159 29.3438C19.1835 29.4959 19.5176 29.7188 19.799 30L26.177 36.378L42.777 19.778C43.0574 19.4929 43.3916 19.2661 43.7601 19.1107C44.1286 18.9554 44.5242 18.8746 44.9242 18.8729C45.3241 18.8713 45.7204 18.9489 46.0902 19.1012C46.46 19.2535 46.7959 19.4775 47.0787 19.7603C47.3614 20.0432 47.5854 20.3792 47.7376 20.749C47.8898 21.1188 47.9673 21.5151 47.9656 21.9151C47.9638 22.315 47.8829 22.7106 47.7275 23.0791C47.5721 23.4476 47.3452 23.7816 47.06 24.062L47.065 24.063Z" fill="white" stroke="#5840D1"/>
          </svg>
          </div>
          <div className="text-2xl text-center text-primary mb-2">
            Resumen de pedido
          </div>
        </article>
        <div style={{display: 'flex', marginBottom: 10, alignItems: 'center'}}>
          <div style={{marginRight: 50}}>Nombre del producto</div>
          <div style={{marginRight: 50}}>Cantidad</div>
          <div>Precio</div>
        </div>
        <div style={productSelected && productSelected.length > 0 ? {height: '250px', overflow: 'auto'} : {height: '250px', overflow: 'scroll', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {productSelected && productSelected.length > 0 ? 
            productSelected.map((product:any) => (
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10, padding:" 10px 15px", alignItems: 'center', background: "#F0EFFB", borderRadius: "8px"}}>
              <div style={{width: "100px", display: 'flex', alignItems:'center'}}>{product.img !== '' && <img src={`data:image/png;base64,${product.img}`} width={30} height={30} style={{maxHeight: 30, height:30, marginRight:5, borderRadius: 8 }}/>} <span>{product.nombre}</span></div>
              <div style={{width: "15%"}}>
                <div style={{backgroundColor:"#FFF"}} className={styles.indicatorQuantityLight}>
                  <button className={styles.btnIncreaseQuantity} onClick={() => handleDecrement(product.idagep_productos)}>-</button>
                  <span style={product.cantidad < 1 ? {color:"#6A6D74"} : {color:"#5840D1"}}>{product.cantidad}</span>
                  <button className={styles.btnIncreaseQuantity} onClick={() =>handleIncrement(product.idagep_productos)}>+</button>
                </div>
              </div>
              <div style={{width: "5%", color: '#5840D1'}}>{formatoMoneda(product.precio)}</div>
              <div style={{width: "5%"}}>
                <button className={styles.btnRemoveProduct} onClick={() => handleRemove(product.idagep_productos)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <circle cx="12.686" cy="12.6467" r="12" fill="#FAF9F7"/>
                    <path d="M17.9877 7.34521L7.3844 17.9485L17.9877 7.34521Z" fill="#FAF9F7"/>
                    <path d="M17.9877 7.34521L7.3844 17.9485" stroke="#6A6D74" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17.8943 18.04L7.47769 7.25333L17.8943 18.04Z" fill="#FAF9F7"/>
                    <path d="M17.8943 18.04L7.47769 7.25333" stroke="#6A6D74" stroke-width="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
          :
          <div>No tiene productos seleccionados</div>
        }
        </div>
        <hr style={{marginTop: '30px', height: "1px", border: '1px dashed #A79FDE' }}/>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>Fecha y hora</span>
            <span>{obtenerFechaHoraActual()}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{color: '#5840D1', fontSize: '16px', fontWeight: 600}}>Total</span>
            <span style={{color: '#5840D1', fontSize: '16px', fontWeight: 600}}>${calcularPrecioTotal()}</span>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
          <Button loading={load} onClick={() => {handleLinkPayment()}} disabled={productSelected.length === 0} className={styles.btnPaymentLink}>Crear Link de Pago</Button>
        </div>

        <div className={styles.wrapperEffect}>
          <div className={styles.innerBox}></div>
        </div>
      </Dialog>

      <ModalLinkCheckOut visible={showModalLink} onHide={()=> setShowModalLink(false)} linkQR={link}/>
    </>
  ) 
}