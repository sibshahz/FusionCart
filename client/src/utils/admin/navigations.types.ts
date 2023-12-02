export type D_MenuItems={
  title: string;
  icon?: React.ReactNode;
  url: string;
  children?: D_MenuItem[];
}

export type D_MenuItem={
  title: string,
  icon?: React.ReactNode,
  url:string,
}