import { ProductsTable } from "@/components/admin/ProductsTable";
import { SupportShell } from "@/components/support/SupportShell";

export default function SupportProductsPage() {
  return (
    <SupportShell
      title="Products"
      subtitle="Manage approved products in the store catalog"
    >
      <ProductsTable apiBase="/api/support/products" />
    </SupportShell>
  );
}
