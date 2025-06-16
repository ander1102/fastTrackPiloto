import React ,{ useEffect, useRef, useState } from "react";
import Grid from "@app/components/Grid";
import styles from "@app/styles/Productos.module.css"
import { FormItem } from "@app/layout/clientes/templates";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { TieredMenu } from "primereact/tieredmenu";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { SVG } from "@app/components/svg";
import { CatalogsController } from "@app/logic/backend/catalogos";
import { ModalConfirmDeleteCat } from "@app/components/ModalComponent/modals/catalogs/confirmDeleteCat";

export const UpdateFormProduct = ({formProduct, setFormProduct, categories, setCategories, user}:any) => {
  const {idagep_empresa} = user;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [modalDeleteCat, setShowModalDeleteCat] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<any>(formProduct.categoria);
  const [categoriaEdit, setCategoriaEdit] = useState<any>({})
  const [nextColorIndex, setNextColorIndex] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const predefinedColors = [
    '#c2bded',
    '#b8ecd3',
    '#b9eae6',
    '#ffd3a8',
    '#f1ffb7',
    '#ffedee',
    '#ddf8da',
    '#fdc9c9',
    '#f6f5f1',
    '#eeedf9'
  ];
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    setSelectedCategories(formProduct.categoria)
  }, [formProduct])

  const handleCategorySelection = (category:any) => {
    const { label, color, idagep_categorias } = category;
    if (selectedCategories.some((c:any) => c.label === label)) {
      setSelectedCategories(selectedCategories.filter((c:any) => c.label !== label));
      setFormProduct((prev:any) => ({
        ...prev,
        categoria: prev.categoria.filter((c:any) => c.label !== label)
      }));
    } else {
      if (selectedCategories.length < 2) {
        setSelectedCategories((prev:any)=> [...prev, {label, color, idagep_categorias}]);
        setFormProduct((prev:any) => ({
          ...prev,
          categoria: [...prev.categoria, { label, color, idagep_categorias }]
        }));
      } else {
        toast.info("Por favor, selecciona un máximo de dos categorías por producto.")
      }
    }
  };

  

  const onFileUpload = (event: any) => {
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedFile(base64);
      setFormProduct({...formProduct, img: base64})
    };
  };


  const updateCategorieColor = async(obj: any) => {
    let body ={
      idagep_categorias : obj.idagep_categorias,
      idagep_empresa,
      categorias: { ...obj, color: obj.color }, 
      "operacion": "U"
    }
    const res = await CatalogsController.crudCategories(body)
    if (res.response.estatus ===200) {
      toast.success(res.response.mensaje)
    }
  }

  const handleColorClick = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
    if (categoriaEdit) {
      const updatedCategories = categories.map((cat: any) => {
        if (cat.label === categoriaEdit.label) {
          updateCategorieColor({ ...cat, color: color })
          return { ...cat, color: color };
        }
        return cat;
      });
      setCategories(updatedCategories);
    }
  };

  const isSelected = (color: string) => color === selectedColor;

  const pickerColor = () => {
    const colorsInRows = [
      predefinedColors.slice(0, 5),
      predefinedColors.slice(5, 10)
    ];
  
    return (
      <div>
        {colorsInRows.map((row, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
            {row.map((color, i) => (
              <div
              key={i}
              onClick={() => handleColorClick(color)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: color,
                margin: '0 5px',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {isSelected(color) && (
                <i
                  className="pi pi-check"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#000'
                  }}
                />
              )}
            </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const newMenus = categories.map(() => React.createRef());
    setMenus(newMenus);
  }, [categories]);

  const deleteCategory = async(cat:any) =>{
    const {idagep_categorias} = cat
    let body = {
      idagep_categorias,
      idagep_empresa,
      "operacion": "D"
    }
    const res = await CatalogsController.crudCategories(body)
    if (res.response?.estatus === 200){
      toast.success(res.response.mensaje);
      setCategories(categories.filter((category: any) => category.idagep_categorias !== idagep_categorias));
    } else {
      toast.error(res.response.mensaje);
    }
  }

  const getMenuItems = (category: any) => [
    {
      label: 'Elegir color',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          template: pickerColor
        },
      ]
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-times',
      command: () => handleDeleteClick(category)
    },
  ];

  const handleDeleteClick = (category: any) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(categoryToDelete);
    setShowDeleteModal(false);
  }

  const addCategory = async() => {
    if (newCategory.trim() !== '') {
      if (categories && categories.length < 10){
        const color = predefinedColors[nextColorIndex];
        setNextColorIndex((nextColorIndex + 1) % predefinedColors.length);
        let body = {
          "idagep_empresa": idagep_empresa,
          "categorias": { label: newCategory, color, idagep_categorias:0 },
          "operacion": "C" 
        }
        const res = await CatalogsController.crudCategories(body)
        if (res.response.estatus === 200){
          setCategories([...categories, { label: newCategory, color }]);
          setNewCategory('');
        }
      } else {
        toast.error("Ha llegado al limite de categorías")
      }
    }
  };

  const handleDetect = (category: any) => {
    setCategoriaEdit(category)
    setSelectedColor(category.color);
  };

  const handleFileUpload = (event:any)  => {
    const file = event.target.files[0];
    const maxSize = 4 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("El archivo es demasiado grande. El tamaño máximo permitido es de 4 MB.")
        return;
    }
    onFileUpload(event)
  }

  return(
    <>
      <div>
        <Grid xl={3}>
          <div className="card flex justify-content-center">
            <div>
              { formProduct.img === '' ?
                <>
                  <div style={{marginBottom: 10}}>Imagen del producto</div>
                  <label style={{cursor: 'pointer'}} className={styles.uploadPlaceholder}>
                    <svg width="100" height="100" viewBox="0 0 73 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group 2800">
                      <rect id="Rectangle 364" x="0.115967" y="0.836426" width="72.4423" height="72.4426" rx="4.52765" fill="#EFEDF9"/>
                      <g id="Group 2601">
                      <rect id="Rectangle 239" x="18.5322" y="14.5027" width="35.61" height="45.11" rx="2.66448" stroke="#A79FDE" stroke-width="1.77632"/>
                      <rect id="Rectangle 85" x="22.8391" y="31.6021" width="9.91319" height="9.91319" rx="1.00832" transform="rotate(-90 22.8391 31.6021)" fill="#A79FDE"/>
                      <path id="Line 1" d="M36.6211 23.1455H46.9428" stroke="#A79FDE" stroke-width="1.77632" stroke-linecap="round"/>
                      <path id="Line 2" d="M36.6211 28.6894H46.9428" stroke="#A79FDE" stroke-width="1.77632" stroke-linecap="round"/>
                      <rect id="Rectangle 240" x="22.8391" y="47.3504" width="9.91319" height="9.91319" rx="1.00832" transform="rotate(-90 22.8391 47.3504)" fill="#A79FDE"/>
                      <path id="Line 3" d="M36.6211 38.8938H46.9428" stroke="#A79FDE" stroke-width="1.77632" stroke-linecap="round"/>
                      <path id="Line 4" d="M36.6211 44.4376H46.9428" stroke="#A79FDE" stroke-width="1.77632" stroke-linecap="round"/>
                      </g>
                      </g>
                    </svg>
                    <input onChange={(e) => handleFileUpload(e)} accept=".jpg,.png" type="file" style={{"visibility": "hidden"}}/>
                  </label>
                </>
                  :
                <div style={{position: 'relative', marginBottom: 20}} className={styles.wrapperImg}>
                  <h4>Imagen del producto</h4>
                  <img src={formProduct.img} alt="Imagen seleccionada" style={{ width: '200px', height: '180px' }} className={styles.imgProduct} />
                  <button
                    onClick={() => setFormProduct({...formProduct, img: ""})}
                    className={styles.deleteImgProduct}
                  >
                    X
                  </button>
                </div>
              }
            </div>
          </div>
        </Grid>
        <Grid xl={3} lg={1} gap={4} >
          <FormItem maxWidth="max-w-full" title={"Nombre del producto *"}>
            <InputText value={formProduct.nombre} placeholder="Nombre del producto" onChange={(e) => setFormProduct({...formProduct, nombre: e.target.value})}/>
          </FormItem>
          <FormItem maxWidth="max-w-full" title={"En existencia *"}>
            <InputNumber value={formProduct.existencia} onChange={(e) => setFormProduct({...formProduct, existencia: e.value})}/>
          </FormItem>
        </Grid>
        <Grid xl={3} gap={4}>
          <FormItem maxWidth="max-w-full" title={"Precio al público *"}>
            <InputNumber
              value={formProduct.precio}
              currency="USD"
              min={0}
              mode="currency"
              suffix=" MXN"
              placeholder="$0.00 MXN"
              onChange={(e) => setFormProduct({...formProduct, precio: e.value})}
            />
          </FormItem>
          <FormItem maxWidth="max-w-full" title={`Categorías ${categories?.length}/10`}>
            <div className="p-inputgroup flex-1">
              <InputText
                className={styles.inputCategories} maxLength={15}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Agregar categoría"
              />
              <Button onClick={addCategory} className={styles.btnCategoryCreate}><SVG.Cross width={20} height={20}/></Button>
            </div>
            {`${newCategory.length}/15 Caracteres`}
          </FormItem>
        </Grid>

        <Grid xl={3} gap={4}>
          <FormItem maxWidth="max-w-full" title={"Descripción del producto"}>
            <InputTextarea
              style={{maxHeight: '120px', height: '120px'}}
              rows={3}
              cols={30}
              value={formProduct.descripcion}
              maxLength={150}
              onChange={(e) => setFormProduct({...formProduct, descripcion: e.target.value})}
            />
          </FormItem>
          <div>
            <div style={{marginBottom: 25}}></div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {categories && categories.map((category: any, index: any) => (
                  <button
                    key={index}
                    style={{ backgroundColor: category.color, margin: 5, width: 'fit-content', padding: '5px', cursor: "pointer", borderRadius:4 }}
                    className={selectedCategories?.some((c: any) => c?.label === category?.label) ? 'bg-white' : ''}
                  >
                    <TieredMenu ref={menus[index]} model={getMenuItems(category)} popup />
                    <span
                      style={{ cursor: "pointer", color: selectedCategories?.some((c: any) => c?.label === category.label) ? "#FFF" : "#4A5056" }}
                      onClick={() => { handleCategorySelection(category) }}
                    >
                      {selectedCategories?.some((c: any) => c?.label === category.label) && <i className="pi pi-check" />} {category.label}
                    </span>
                    <i
                      style={{ color: selectedCategories?.some((c: any) => c?.label === category.label) ? "#FFF" : "#4A5056" }}
                      onClick={(event) => { menus[index]?.current?.toggle(event); handleDetect(category) }}
                      className="pi pi-ellipsis-v"
                    />
                  </button>
                ))}
              </div>
            <div>
              {`Categorias asignadas ${selectedCategories && selectedCategories.length > 0 ? selectedCategories.length: 0}/2` }
            </div>
          </div>
        </Grid>
      </div>
      <ModalConfirmDeleteCat visible={showDeleteModal} onHide={setShowDeleteModal} handleConfirmDelete={handleConfirmDelete} />
    </>
  )

}