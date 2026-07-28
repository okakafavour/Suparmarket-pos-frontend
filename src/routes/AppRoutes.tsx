import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "@/pages/Dashboard/Dashboard";
import Inventory from "@/pages/Inventory/Inventory";
import Login from "@/pages/Auth/Login";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

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