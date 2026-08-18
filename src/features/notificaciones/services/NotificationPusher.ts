import {SelectNotification} from "@/src/features/notificaciones/types/notification.type";
import {pusher} from "@/lib/pusher";

export interface INotificationPublisher {
    notify(notification: SelectNotification): Promise<void>;
    notifyAllRead(userId: string): Promise<void>;
}

class NotificationPusher implements INotificationPublisher {
    async notify(notification: SelectNotification): Promise<void> {
        await pusher.trigger(`notifications-channel-${notification.userId}`, 'new-notification', notification);
    }

    async notifyAllRead(userId: string): Promise<void> {
        await pusher.trigger(`notifications-channel-${userId}`, 'all-notifications-read', {});
    }

}

export const notificationPusher = new NotificationPusher();