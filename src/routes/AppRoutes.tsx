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
import Sales from "@/pages/Sales/Sales";
import Customers from "@/pages/Customers/Customers";
import Suppliers from "@/pages/Suppliers/Suppliers";
import Purchases from "@/pages/Purchases/Purchases";
// import Payments from "@/pages/Payments/Payments";
import Reports from "@/pages/Reports/Reports";
import Users from "@/pages/Users/Users";
import Settings from "@/pages/Settings/Settings";
import Profile from "@/pages/Profile/Profile";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}

        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>


        {/* =====================================================
            AUTHENTICATED ROUTES
        ====================================================== */}

        <Route element={<ProtectedRoute />}>

          {/* =================================================
              DASHBOARD

              Admin + Manager + Cashier
          ================================================== */}

          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Dashboard />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              INVENTORY

              Admin + Manager
          ================================================== */}

          <Route
            path="/inventory"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              >
                <Inventory />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              PRODUCTS

              Admin + Manager + Cashier
          ================================================== */}

          <Route
            path="/products"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Products />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              SALES

              Admin + Manager + Cashier
          ================================================== */}

          <Route
            path="/sales"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Sales />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              CUSTOMERS

              Admin + Manager + Cashier
          ================================================== */}

          <Route
            path="/customers"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Customers />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              SUPPLIERS

              Admin + Manager
          ================================================== */}

          <Route
            path="/suppliers"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              >
                <Suppliers />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              PURCHASES

              Admin + Manager
          ================================================== */}

          <Route
            path="/purchases"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              >
                <Purchases />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              PAYMENTS

              Admin + Manager + Cashier
          ================================================== */}

          {/* <Route
            path="/payments"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Payments />
              </RoleProtectedRoute>
            }
          /> */}


          {/* =================================================
              REPORTS

              Admin + Manager
          ================================================== */}

          <Route
            path="/reports"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              >
                <Reports />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              USERS

              ADMIN ONLY
          ================================================== */}

          <Route
            path="/users"
            element={
              <RoleProtectedRoute
                allowedRoles={["admin"]}
              >
                <Users />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              SETTINGS

              Admin + Manager
          ================================================== */}

          <Route
            path="/settings"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              >
                <Settings />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              PROFILE

              Everyone who is authenticated
          ================================================== */}

          <Route
            path="/profile"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                  "cashier",
                ]}
              >
                <Profile />
              </RoleProtectedRoute>
            }
          />

        </Route>


        {/* =====================================================
            DEFAULT REDIRECT
        ====================================================== */}

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