export interface Product {
  id: string;

  name: string;
  description: string;

  sku: string;
  barcode: string;

  categoryID: string;
  supplierID: string;

  costPrice: number;
  sellingPrice: number;

  quantity: number;
  minimumStock: number;

  imageURL: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}