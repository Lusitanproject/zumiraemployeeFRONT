import { z } from "zod";

export const CreateNotificationSchema = z.object({
  title: z.string().nonempty(),
  summary: z.string().nonempty(),
  content: z.string().nonempty(),
  notificationTypeId: z.string().cuid(),
  userIds: z.array(z.string().uuid()),
});

export type CreateNotificationRequest = z.infer<typeof CreateNotificationSchema>;
