import Markdown from "react-markdown";
import { NotificationFull } from "../definitions";

interface NotificationDetailsProps {
  notification: NotificationFull;
}

export function NotificationDetails({ notification }: NotificationDetailsProps) {
  return (
    <section className="flex flex-col p-3 gap-1">
      <h1 className="text-base font-bold leading-6 text-gray-500">{notification.title}</h1>
      <hr className="text-gray-200" />
      <div className="prose markdow !mt-0 !text-gray-700">
        <Markdown>{notification.content}</Markdown>
      </div>
    </section>
  );
}
