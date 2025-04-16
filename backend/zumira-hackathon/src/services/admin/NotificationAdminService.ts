import {
  CreateNotificationRequest,
  DeleteNotificationRequest,
  UpdateNotificationRequest,
} from "../../definitions/notification";
import prismaClient from "../../prisma";

class NotificationAdminService {
  async find(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    });
    return user;
  }

  async findAll() {
    const notifications = await prismaClient.notification.findMany({
      include: {
        notificationType: true,
      },
    });

    return notifications;
  }

  async findByType(notificationTypeId: string) {
    const notifications = await prismaClient.notification.findMany({
      where: { notificationTypeId },
      include: {
        notificationType: true,
      },
    });

    return notifications;
  }

  async create({ title, summary, content, notificationTypeId, userIds }: CreateNotificationRequest) {
    const users = await prismaClient.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    const fetchedUsersIds = users.map((u) => u.id);
    for (const id of userIds) {
      if (!fetchedUsersIds.includes(id)) throw new Error("One or more users does not exist");
    }

    const notification = await prismaClient.notification.create({
      data: {
        title,
        summary,
        content,
        notificationTypeId,
      },
    });

    await prismaClient.notificationRecipient.createMany({
      data: userIds.map((userId) => ({
        userId,
        notificationId: notification.id,
      })),
    });

    return notification;
  }

  async update({ notificationId, title, summary, content, notificationTypeId }: UpdateNotificationRequest) {
    try {
      const notification = await prismaClient.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          title,
          summary,
          content,
          notificationTypeId,
        },
      });

      return notification;
    } catch {
      throw new Error("Notification does not exist");
    }
  }

  async delete({ notificationId }: DeleteNotificationRequest) {
    try {
      await prismaClient.notification.delete({
        where: {
          id: notificationId,
        },
      });
    } catch {
      throw new Error("Notification does not exist");
    }
  }
}

export { NotificationAdminService };
