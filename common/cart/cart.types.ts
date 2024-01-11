import { Product } from "../product/product.types";

export type CartProduct = {
  _id?: string;
  product:Product;
  quantity:number;
  subTotal:number;
  addedOn:Date;
};