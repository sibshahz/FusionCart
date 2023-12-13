import { D_MenuItems,D_MenuItem } from "./navigations.types"; 
import {
  Dashboard,
  Diamond,
  ShoppingCart,
  CreditCard,
  Analytics,
  SupervisorAccount,
  SettingsSuggest
} from '@mui/icons-material';

export const D_MainNav:D_MenuItems[]=[
  // {
  //   title:"Dashboard",
  //   url:"/dashboard",
  //   icon:<Dashboard />,
  // },
  {
    title:"Fusion Cart",
    url:"/fusion-cart",
    icon:<Diamond />,
    children:[
      {
        title:"Orders",
        url:"/orders"
      },
      {
        title:"Customers",
        url:"/customers"
      },
      {
        title:"Reports",
        url:"/reports"
      },
      {
        title:"Settings",
        url:"/settings"
      }
    ]
  },
  {
    title:"Products",
    url:"/products",
    icon:<ShoppingCart />,
    children:[
      {
        title: "Add Product",
        url: "/add-product",
      },
      {
        title: "Categories",
        url: "/categories",
      },
      {
        title: "Tags",
        url: "/tags",
      },
      {
        title: "Attributes",
        url: "/attributes",
      },
      {
        title: "Reviews",
        url: "/reviews",
      },
    ]
  },
  {
    title:"Payments",
    url:"/payments",
    icon:<CreditCard />,
  },
  {
    title:"Analytics",
    url:"/analytics",
    icon:<Analytics />
  },
  {
    title:"Users",
    url:"/users",
    icon:<SupervisorAccount />
  },
  {
    title:"Settings",
    url:"/settings",
    icon:<SettingsSuggest />
  },
];