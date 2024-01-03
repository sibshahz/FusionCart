import { D_MenuItems } from "./navigations.types"; 
import {
  Dashboard,
  Diamond,
  ShoppingCart,
  CreditCard,
  Analytics,
  SupervisorAccount,
  SettingsSuggest,
  CheckBox,
  EmojiPeople,
  Summarize,
  Settings,
  LibraryAdd,
  Category,
  Style,
  EditAttributes,
  RateReview,
  ImageOutlined
} from '@mui/icons-material';

export const D_MainNav:D_MenuItems[]=[
  // {
  //   title:"Dashboard",
  //   url:"/dashboard",
  //   icon:<Dashboard />,
  // },
  {
    title:"Dashboard",
    url:"",
    icon:<Dashboard />,
    children:[
      {
        title:"Orders",
        url:"/orders",
        icon:<CheckBox />

      },
      {
        title:"Customers",
        url:"/customers",
        icon:<EmojiPeople />
      },
      {
        title:"Reports",
        url:"/reports",
        icon:<Summarize />
      },
      {
        title:"Settings",
        url:"/settings",
        icon:<Settings />
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
        icon:<LibraryAdd />
      },
      {
        title: "Gallery",
        url: "/gallery",
        icon:<ImageOutlined />
      },
      {
        title: "Categories",
        url: "/categories",
        icon:<Category />
      },
      {
        title: "Tags",
        url: "/tags",
        icon:<Style />
      },
      {
        title: "Attributes",
        url: "/attributes",
        icon:<EditAttributes />
      },
      {
        title: "Reviews",
        url: "/reviews",
        icon:<RateReview />
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