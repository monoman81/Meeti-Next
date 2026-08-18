import {requireAuthentication} from "@/lib/auth-server";
import {notificationService} from "@/src/features/notificaciones/services/NotificationService";

export async function GET() {
    const {session} = await requireAuthentication();
    if (!session) return new Response(JSON.stringify(0));
    const notifications = await notificationService.getUnreadCount(session.user.id);
    return new Response(JSON.stringify(notifications), {
        status: 200,
        headers: {
            contentType: "application/json",
        }
    });
}