import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";
import Headings from "@/shared/typography/Headings";
import {requireAuthentication} from "@/lib/auth-server";
import {redirect} from "next/navigation";
import {notificationService} from "@/src/features/notificaciones/services/NotificationService";
import NotificationList from "@/src/features/notificaciones/components/NotificationList";

const title = "Tus Notificaciones";

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default async function NotificationsPage() {

    const {session} = await requireAuthentication();
    if (!session) redirect('/auth/login');

    const notifications = await notificationService.getUserNotifications(session.user.id);
    await notificationService.clearNotifications(session.user.id);

    return (
        <>
            <Headings>{title}</Headings>
            <NotificationList notifications={notifications} />
        </>
    )
}
