import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import UsersHeader from "@/components/users/UsersHeader";
import UsersToolbar from "@/components/users/UsersToolbar";
import UsersTable from "@/components/users/UsersTable";

import AddUserModal from "@/components/users/AddUserModal";
import UserDetailsDialog from "@/components/users/UserDetailsDialog";
import EditUserDialog from "@/components/users/EditUserDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";

import {
  getUsers,
  updateUserStatus,
} from "@/services/user.service";

import type { User, UserRole } from "@/types/user";

export default function Users() {
  // =========================
  // State
  // =========================

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState<"" | UserRole>("");
  const [status, setStatus] = useState<
    "" | "active" | "inactive"
  >("");

  const [addOpen, setAddOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  // =========================
  // Load Users
  // =========================

  async function loadUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // Filter Users
  // =========================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const fullName =
        `${user.first_name} ${user.last_name}`.toLowerCase();

      const matchesSearch =
        fullName.includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        (user.phone?.toLowerCase().includes(searchValue) ??
          false);

      const matchesRole =
        !role || user.role === role;

      const matchesStatus =
        !status ||
        (status === "active" && user.is_active) ||
        (status === "inactive" && !user.is_active);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, role, status]);

  // =========================
  // Statistics
  // =========================

  const stats = useMemo(() => {
    return {
      total: users.length,

      active: users.filter(
        (user) => user.is_active
      ).length,

      inactive: users.filter(
        (user) => !user.is_active
      ).length,

      admins: users.filter(
        (user) => user.role === "admin"
      ).length,
    };
  }, [users]);

  // =========================
  // View User
  // =========================

  function handleView(user: User) {
    setSelectedUser(user);
    setDetailsOpen(true);
  }

  // =========================
  // Edit User
  // =========================

  function handleEdit(user: User) {
    setSelectedUser(user);
    setEditOpen(true);
  }

  // =========================
  // Delete User
  // =========================

  function handleDelete(user: User) {
    setSelectedUser(user);
    setDeleteOpen(true);
  }

  // =========================
  // Toggle User Status
  // =========================

  async function handleToggleStatus(user: User) {
  try {
    const newStatus = !user.is_active;

    console.log("Updating user status:", {
      id: user.id,
      currentStatus: user.is_active,
      newStatus,
    });

    await updateUserStatus(user.id, {
      is_active: newStatus,
    });

    await loadUsers();
  } catch (error) {
    console.error("Failed to update user status:", error);
  }
}

  // =========================
  // Render
  // =========================

  return (
    <DashboardLayout>
      <div className="min-w-0 space-y-6">
        {/* Header */}
        <UsersHeader
          total={stats.total}
          active={stats.active}
          inactive={stats.inactive}
          admins={stats.admins}
        />

        {/* Toolbar */}
        <UsersToolbar
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
          onAddUser={() => setAddOpen(true)}
        />

        {/* Users Table */}
        {loading ? (
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center">
            <p className="text-sm text-[color:var(--text-muted)]">
              Loading users...
            </p>
          </div>
        ) : (
          <UsersTable
            users={filteredUsers}
            onView={handleView}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        )}

        {/* Add User */}
        <AddUserModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSuccess={loadUsers}
        />

        {/* View User */}
        <UserDetailsDialog
          open={detailsOpen}
          user={selectedUser}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedUser(null);
          }}
        />

        {/* Edit User */}
        <EditUserDialog
          open={editOpen}
          user={selectedUser}
          onClose={() => {
            setEditOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={loadUsers}
        />

        {/* Delete User */}
        <DeleteUserDialog
          open={deleteOpen}
          user={selectedUser}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={loadUsers}
        />
      </div>
    </DashboardLayout>
  );
}