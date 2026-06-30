import { AdminShell } from "@/components/admin/AdminShell";
import { CategoriesPanel } from "@/components/admin/CategoriesPanel";

export default function AdminCategoriesPage() {
  return (
    <AdminShell
      title="Categories"
      subtitle="Add, edit, and remove product categories for the store catalog"
    >
      <CategoriesPanel />
    </AdminShell>
  );
}
