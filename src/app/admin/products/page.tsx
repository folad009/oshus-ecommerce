import { AdminShell } from "@/components/admin/AdminShell";
import { ProductApprovalsPanel } from "@/components/admin/ProductApprovalsPanel";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default function AdminProductsPage() {
  return (
    <AdminShell
      title="Products"
      subtitle="Approve vendor submissions and manage the store catalog"
    >
      <div className="flex flex-col gap-6">
        <ProductApprovalsPanel />
        <ProductsTable />
      </div>
    </AdminShell>
  );
}
