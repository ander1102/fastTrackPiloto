import EmptyTemplate from "@app/components/EmptyTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styles from "@app/styles/Productos.module.css";
import { SVG } from "@app/components/svg";
import { ButtonDetailsLeads } from "@app/components/Buttons";
import { useState } from "react";
import Image from "next/image";

export default function ProductsBody({
  productos,
  isCalling,
  setProductos,
  setProductSelected,
  productSelected,
  totalRecords,
  onRefresh
}: any) {
  const [canLazy, setCanLazy] = useState(true)
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    pagina: 1,
  });
  
  const handleSelectionChange = (e: any) => {
    const selectedProducts = e.value.map((selectedProduct: any) => ({
      ...selectedProduct,
      cantidad: selectedProduct.cantidad > 0 ? selectedProduct.cantidad : 1
    }));
    const updatedProducts = productos.map((producto: any) => ({
      ...producto,
      cantidad: selectedProducts.some((selectedProduct: any) => selectedProduct.idagep_productos === producto.idagep_productos) ? (producto.cantidad > 0 ? producto.cantidad : 1) : 0
    }));
    setProductos(updatedProducts);
    setProductSelected(selectedProducts);
  };

  const incrementarCantidad = (productId: any) => {
    const productIndex = productos.findIndex((producto:any) => producto.idagep_productos === productId);
    const product = productos[productIndex];
    if (product.cantidad < product.unidades) {
      const updatedProducts = [...productos];
      updatedProducts[productIndex] = { ...product, cantidad: product.cantidad + 1 };
      setProductos(updatedProducts);
  
      const updatedSelectedProducts = updatedProducts.filter((producto:any) => producto.cantidad > 0);
      setProductSelected(updatedSelectedProducts);
    }
  };

  const decrementarCantidad = (productId: any) => {
    const productIndex = productos.findIndex((producto:any) => producto.idagep_productos === productId);
    const product = productos[productIndex];
    const updatedProducts = [...productos];
    updatedProducts[productIndex] = { ...product, cantidad: product.cantidad > 0 ? product.cantidad - 1 : 0 };
    setProductos(updatedProducts);
  
    const updatedSelectedProducts = updatedProducts.filter((producto:any) => producto.cantidad > 0);
    setProductSelected(updatedSelectedProducts);
  };

  const isSelectable = (data:any) => data.unidades > 0;
  const isRowSelectable = (event:any) => (event.data ? isSelectable(event.data) : true);
  const rowClassName = (data:any) => (isSelectable(data) ? '' : 'p-disabled');

  const formatoMoneda = (numero:number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(numero);
  }

  const onPage = (event: any) => {    
    setlazyState(event);
    onRefresh({ pagina:(event.page+1)})
  };

  return (
    <DataTable
      id={'TablaLeads'}
      value={productos ?? []}
      metaKeySelection={false}
      totalRecords={totalRecords}
      selectionMode="checkbox"
      selection={productSelected}
      onSelectionChange={handleSelectionChange}
      rowClassName={rowClassName}
      paginator
      className="p-datatable-customers"
      scrollHeight="95%"
      scrollable
      rows={10}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      dataKey="idagep_productos"
      rowHover
      filterDisplay="menu"
      loading={isCalling}
      responsiveLayout="scroll"
      globalFilterFields={["nombre"]}
      emptyMessage={EmptyTemplate}
      isDataSelectable={isRowSelectable}
      style={{ color: "#60A5FA", border: '0px solid transparent' }}
      lazy
      onPage={onPage}
      first={lazyState.first}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem', backgroundColor: 'transparent', border: '1px solid #A49ADB' }} body={(item) => (<div style={{pointerEvents: item.unidades === 0 ? 'none' : 'initial'}}>check</div>)}/>
      <Column style={{ minWidth: '200px' }} field="nombre" header="Nombre del producto"  resizeable body={(item) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          {
            item.img !== '' &&
            <img src={`data:image/png;base64,${item.img}`} width={40} height={40} alt="" style={{marginRight: '20px', borderRadius: 4, height: 30, width: 40}}/>
          }
          <div>{item.nombre}</div>
        </div>
      )}/>
      <Column
        field="cantidad"
        header="Cantidad"
        body={(producto) => (
          <div style={{backgroundColor:"#FAF9F7"}} className={styles.indicatorQuantity}>
            <button className={styles.btnIncreaseQuantity} onClick={() => decrementarCantidad(producto.idagep_productos)}>-</button>
            <span style={producto.cantidad < 1 ? {color:"#6A6D74"} : {color:"#5840D1"}}>{producto.cantidad}</span>
            <button className={styles.btnIncreaseQuantity} onClick={() => incrementarCantidad(producto.idagep_productos)}>+</button>
          </div>
        )}
      />
      <Column
        field="categoria"
        header="Categorías"
        style={{ minWidth: '200px' }}
        body={({categorias}) => (
          <div style={categorias.length > 0 ? {display: 'flex', flexDirection: 'row'}: {}}>
            {
              categorias && categorias.length > 0 && categorias.map((el:any) => (
                <div style={{backgroundColor: el.color, marginInline: '5px', padding: "5px 5px", width: 'fit-content', borderRadius: '4px'}}>
                  <div style={{color: "#4A5056", display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '5px'}}>{el.label}</span>
                  </div>
                </div>
                
              ))
            }
          </div>
        )}  
      />
      <Column field="unidades" header="Inventario" body={(item) => <span>{item.unidades} unidades</span>} />
      <Column field="precio" header="Precio" body={(item) => formatoMoneda(item.precio)}  />
      <Column
          header=""
          body={(item: any) => (
            <ButtonDetailsLeads destino={`/dashboard/catalogos/productos/${item.idagep_productos}`}/>
          )}
        />
    </DataTable>
);
}