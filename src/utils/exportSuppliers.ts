import * as XLSX from "xlsx";

import { getSuppliers } from "@/services/supplier.service";

export async function exportSuppliersCSV() {
  try {
    const result = await getSuppliers();

    const suppliers = result.data;

    const rows = suppliers.map((supplier) => ({
      Name: supplier.name,
      Contact: supplier.contact_person,
      Email: supplier.email,
      Phone: supplier.phone,
      Address: supplier.address,
      City: supplier.city,
      State: supplier.state,
      Country: supplier.country,
      Status: supplier.is_active
        ? "Active"
        : "Inactive",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Suppliers"
    );

    XLSX.writeFile(
      workbook,
      `Suppliers-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`
    );
  } catch (error) {
    console.error(error);
  }
}