import { NotificationCard } from "@/components/custom/notifications/notification-card";
import { Notification, NotificationFull } from "../definitions";
import { cn } from "@/lib/utils";

interface NotificationsListProps {
  data: Notification[];
  current?: NotificationFull;
}

export function NotificationsList({ data, current }: NotificationsListProps) {
  if (!data.length) {
    return (
      <div className="flex size-full justify-center items-center">
        <p className="text-center text-gray-500">
          Nada por aqui ainda...
          <br />
          Te avisamos assim que chegar algo novo!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col pt-1.5 gap-3 overflow-scroll", current ? "sm:w-[13.5rem] w-full" : "w-full")}>
      {data
        .toSorted(
          (a, b) =>
            b.notificationType.priority - a.notificationType.priority ||
            new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
        )
        .map((notification) => {
          const isCurrent = notification.id === current?.id;
          if (isCurrent) {
            notification.read = true;
          }

          return <NotificationCard key={notification.id} notification={notification} selected={isCurrent} />;
        })}
    </div>
  );
}
