"use client";

import {SelectNotification} from "@/src/features/notificaciones/types/notification.type";
import {formatCreatedDate} from "@/shared/utils/date";
import {useEffect, useState} from "react";
import {useSession} from "@/lib/auth-client";
import Pusher from "pusher-js";

type NotificationListProps = {
    notifications: SelectNotification[]
};

export default function NotificationList({notifications}: NotificationListProps) {
    const [unreadNotifications, setUnreadNotifications] = useState<SelectNotification[]>(notifications);

    const {data} = useSession();
    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
        const channelId = `notifications-channel-${data?.user.id}`;
        const channel = pusher.subscribe(channelId);
        channel.bind('new-notification', (notification: SelectNotification) => {
            setUnreadNotifications(prev => [notification, ...prev]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [data]);

    return (
        <div className="space-y-4 mt-10">
            {unreadNotifications.length ? (
                unreadNotifications.map((notification) => (
                    <div key={notification.id} className="p-4 rounded-lg shadow-xs shadow-gray-300">
                        <p>
                            {notification.actorName} - {notification.message} {''}
                            <span className="font-bold">{notification.target}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatCreatedDate(notification.createdAt)}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg text-gray-600">
                    No hay notificaciones
                </p>
            )}
        </div>
    )
}
