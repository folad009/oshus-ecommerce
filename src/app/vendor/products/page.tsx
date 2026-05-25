import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorProductsPanel } from "@/components/vendor/VendorProductsPanel";

export default function VendorProductsPage() {
  return (
    <VendorShell
      title="Products"
      subtitle="Submit products for admin approval before they appear in the store"
    >
      <VendorProductsPanel />
    </VendorShell>
  );
}
