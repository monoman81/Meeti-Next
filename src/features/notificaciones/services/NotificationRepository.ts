import {InsertNotification, SelectNotification} from "@/src/features/notificaciones/types/notification.type";
import {notification} from "@/src/db/schema";
import {db} from "@/src/db";
import {and, count, eq} from "drizzle-orm";

export interface INotificationRepository {
    create(data: InsertNotification): Promise<SelectNotification>;
    getUnreadCount(userId: string): Promise<number>;
    findByUserId(userId: string): Promise<SelectNotification[]>;
    deleteByUserId(userId: string): Promise<void>;
}

class NotificationRepository implements INotificationRepository {

    async create(data: InsertNotification): Promise<SelectNotification> {
        const [result] = await db.insert(notification).values(data).returning();
        return result;
    }

    async getUnreadCount(userId: string): Promise<number> {
        const [result] = await db
            .select({total: count()})
            .from(notification)
            .where(
                and(eq(notification.userId, userId), eq(notification.read, false))
            );
        return result.total;
    }

    async findByUserId(userId: string): Promise<SelectNotification[]> {
        return await db.query.notification.findMany({
            where: {
                AND: [
                    {userId: {eq: userId}},
                    {read: {eq: false}}
                ]
            },
            limit: 10,
            orderBy: {createdAt: 'desc'}
        });
    }

    async deleteByUserId(userId: string): Promise<void> {
        await db.update(notification).set({
            read: true
        }).where(eq(notification.userId, userId));
        //await db.delete(notification).where(eq(notification.userId, userId));
    }

}


export const notificationRepository = new NotificationRepository();