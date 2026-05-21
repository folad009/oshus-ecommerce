import { SupportShell } from "@/components/support/SupportShell";
import { InboxList } from "@/components/support/InboxList";

export default function SupportInboxPage() {
  return (
    <SupportShell
      title="Inbox"
      subtitle="Reply to customer messages"
    >
      <InboxList />
    </SupportShell>
  );
}
