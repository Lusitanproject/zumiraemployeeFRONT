import { Divider } from "@/components/custom/divider";
import { getNotifications } from "./actions";
import { NotificationsList } from "./components/notifications-list";
import { detailNotification } from "@/components/custom/notifications/actions";
import { NotificationDetails } from "./components/notification-details";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Notificacoes({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id: notificationId } = await searchParams;
  const notifications = await getNotifications();
  let current;

  if (notificationId) {
    current = await detailNotification(notificationId);
    if (!current) {
      redirect("/notificacoes");
    }
  }

  return (
    <div className="flex flex-row size-full gap-8 py-1.5">
      <div className={cn(current ? "sm:flex hidden" : "flex size-full")}>
        <NotificationsList data={notifications} current={current} />
      </div>
      {current && (
        <>
          <Divider className="bg-gray-200 hidden sm:flex" />
          <NotificationDetails notification={current} />
        </>
      )}
    </div>
  );
}
