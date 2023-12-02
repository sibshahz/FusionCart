import { D_MenuItems,D_MenuItem } from "./navigations.types";

export const D_MainNav:D_MenuItems[]=[
  {
    title:"Dashboard",
    url:"/dashboard"
  },
  {
    title:"Products",
    url:"/dashboard/products",
    children:[
      {
        title: "All Products",
        url: "/dashboard/products",
      },
      {
        title: "Add Product",
        url: "/dashboard/products/add-product",
      },
      {
        title: "Categories",
        url: "/dashboard/products/categories",
      },
      {
        title: "Tags",
        url: "/dashboard/products/tags",
      },
      {
        title: "Attributes",
        url: "/dashboard/products/attributes",
      },
      {
        title: "Review",
        url: "/dashboard/products/reviews",
      },
      
    ]
  },
  {
    title:"Payments",
    url:"/dashboard/payments"
  },
  {
    title:"Analytics",
    url:"/dashboard/analytics"
  },
  {
    title:"Settings",
    url:"/dashboard/analytics"
  },
];

