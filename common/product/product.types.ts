import { Image } from "../images/images.types"
import { Category } from "../category/category.types"
import { Tag } from "../tags/tags.types"
import { Attribute } from "../attribute/attribute.types"

enum Status{
  DRAFT="draft",
  PUBLISHED= "published",
  OUTSTOCK="outstock",
}
export type Product={
  _id: string,
  name: string,
  description: string,
  tagline?:string,
  featuredImages?: [Image],
  images?:[Image],
  status:Status.PUBLISHED,
  category?:[Category],
  tags?:[Tag],
  stock?:number,
  price:number,
  salePrice?:number,
  upsells?:[],
  crossSells?:[],
  attributes?:[Attribute],
  featured?:Boolean,
  priceHistory?:[]
}