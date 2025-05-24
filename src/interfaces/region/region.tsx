export interface IRegionItem {
  key: string;
  name: string;
  flag: string;
}

export interface IRegion {
  [key: string]: IRegionItem;
}
