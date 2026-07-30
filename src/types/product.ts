export interface Product {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;

  Name: string;
  Description: string;

  SKU: string;
  Barcode: string;

  CostPrice: number;
  SellingPrice: number;

  Quantity: number;
  MinimumStock: number;

  ImageURL: string;

  IsActive: boolean;

  Category: {
    ID: string;
    name: string;
    description: string;
  };

  Supplier: {
    ID: string;
    Name: string;
  };
}