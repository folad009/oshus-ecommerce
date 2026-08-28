import { CategoriesPanel } from "@/components/admin/CategoriesPanel";
import { SupportShell } from "@/components/support/SupportShell";

export default function SupportCategoriesPage() {
  return (
    <SupportShell
      title="Categories"
      subtitle="Add, edit, and remove product categories for the store catalog"
    >
      <CategoriesPanel apiBase="/api/support/categories" />
    </SupportShell>
  );
}
