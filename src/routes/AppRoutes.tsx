import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "@/pages/Dashboard/Dashboard";
import Inventory from "@/pages/Inventory/Inventory";
import Login from "@/pages/Auth/Login";
import Products from "@/pages/Products/Products";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Sales from "@/pages/Sales/Sales";
import Customers from "@/pages/Customers/Customers";
import Suppliers from "@/pages/Suppliers/Suppliers";
import Purchases from "@/pages/Purchases/Purchases";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>

        {/* Protected */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/suppliers"
            element={<Suppliers />}
          />

          <Route
            path="/purchases"
            element={<Purchases />}
          />
        </Route>

        {/* Redirect */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}