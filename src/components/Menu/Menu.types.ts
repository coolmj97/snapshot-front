export interface MenuListType {
  name: string;
  onClick: () => void;
}

export interface MenuProps {
  list: MenuListType[];
  $top?: number;
}
