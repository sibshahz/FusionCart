import { Images } from "@/src/types/images/images.types"
import { Category } from "@/src/types/category/category.types"
import { Tag } from "@/src/types/tags/tags.types"
import { Attribute } from "@/src/types/attribute/attribute.types"

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
  featuredImages?: [Images],
  images?:[Images],
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