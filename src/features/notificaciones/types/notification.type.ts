import {notification} from "@/src/db/schema";

export type SelectNotification = typeof notification.$inferSelect;
export type InsertNotification = typeof notification.$inferInsert;