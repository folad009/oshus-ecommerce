export interface ShopCategory {
  id: string;
  name: string;
}

export interface AdminCategory extends ShopCategory {
  productCount: number;
}
