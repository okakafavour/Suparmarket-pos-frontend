import api from "@/lib/axios";

export async function getInventorySummary() {
  const { data } = await api.get("/inventory/summary");
  return data.data;
}

export async function getInventoryAnalytics() {
  const { data } = await api.get("/inventory/analytics");
  return data.data;
}

export async function getProducts() {
  const { data } = await api.get("/products");
  return data.data;
}

export async function getInventoryLogs() {
  try {
    console.log("Calling inventory logs endpoint...");

    const response = await api.get("/inventory/logs?page=1&limit=6");

    console.log("Status:", response.status);
    console.log("Response:", response.data);

    return response.data.data.data;
  } catch (err) {
    console.error("Inventory Logs Error:", err);
    throw err;
  }
}