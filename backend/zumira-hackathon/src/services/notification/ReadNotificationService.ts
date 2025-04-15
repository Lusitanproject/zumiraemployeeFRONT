import { ReadNotificationRequest } from "../../definitions/notification";
import prismaClient from "../../prisma";

class ReadNotificationService {
  async execute({ userId, notificationId }: ReadNotificationRequest) {
    await prismaClient.notificationRecipient.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
      data: {
        read: true,
      },
    });
  }
}

export { ReadNotificationService };
