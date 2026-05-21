import { AdminShell } from "@/components/admin/AdminShell";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default function AdminProductsPage() {
  return (
    <AdminShell
      title="Products"
      subtitle="Manage your product catalog"
    >
      <ProductsTable />
    </AdminShell>
  );
}
