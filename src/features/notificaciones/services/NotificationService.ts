import {
    INotificationRepository,
    notificationRepository
} from "@/src/features/notificaciones/services/NotificationRepository";
import {InsertNotification, SelectNotification} from "@/src/features/notificaciones/types/notification.type";
import {INotificationPublisher, notificationPusher} from "@/src/features/notificaciones/services/NotificationPusher";

export interface INotificationService {
    createAndNotify(data: InsertNotification): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
    getUserNotifications(userId: string): Promise<SelectNotification[]>;
    clearNotifications(userId: string): Promise<void>;
}

class NotificationService implements INotificationService {

    constructor(
        private notificationRepository: INotificationRepository,
        private notificationPusher: INotificationPublisher
    ) {}

    async createAndNotify(data: InsertNotification): Promise<void> {
        const notification = await this.notificationRepository.create(data);
        await this.notificationPusher.notify(notification);
    }

    async getUnreadCount(userId: string): Promise<number> {
        return await this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotifications(userId: string): Promise<SelectNotification[]> {
        return await this.notificationRepository.findByUserId(userId);
    }

    async clearNotifications(userId: string): Promise<void> {
        await this.notificationRepository.deleteByUserId(userId);
        await notificationPusher.notifyAllRead(userId);
    }

}

export const notificationService = new NotificationService(notificationRepository, notificationPusher);