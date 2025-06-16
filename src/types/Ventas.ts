import { PaginationBody } from ".";

export interface Product {
  id: number;
  model: string;
  image: string;
  quantity: string;
  type: string;
  rent: string;
  suggestion: string;
  chip:boolean;
}

export interface AllProductsProps {
  products: Product[];
  formik:any
}

export interface SellersGetBody extends PaginationBody {
  vendedor: string;
  fechaIni: string;
  fechaFin: string;
  estatus: string;
  PageIndex:string;
  PageSize:string;
  tamano_pagina?: number;
}

