import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { instances, teams } from "./workspace";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .references(() => teams.id, { onDelete: "cascade" })
    .notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  name: varchar("name", { length: 256 }),
  avatarUrl: text("avatar_url"),
  isBlocked: boolean("is_blocked").default(false),
  notes: text("notes"),
  customFields: jsonb("custom_fields"), // Para campos personalizados
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversationStatusEnum = pgEnum("conversation_status", [
  "open",
  "pending",
  "closed",
  "bot",
]);

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .references(() => teams.id, { onDelete: "cascade" })
    .notNull(),
  instanceId: integer("instance_id")
    .references(() => instances.id, { onDelete: "cascade" })
    .notNull(),
  contactId: integer("contact_id")
    .references(() => contacts.id, { onDelete: "cascade" })
    .notNull(),
  assignedToUserId: text("assigned_to_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  status: conversationStatusEnum("status").default("open").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closedAt: timestamp("closed_at"),
});

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "image",
  "audio",
  "video",
  "file",
  "location",
  "system",
]);
export const messageSenderEnum = pgEnum("message_sender", [
  "agent",
  "contact",
  "bot",
]);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  senderType: messageSenderEnum("sender_type").notNull(),
  // Opcional: ID do agente específico que enviou
  agentId: text("agent_id").references(() => users.id, {
    onDelete: "set null",
  }),
  content: text("content"),
  mediaUrl: text("media_url"),
  mediaType: text("media_type"), // ex: 'image/jpeg'
  type: messageTypeEnum("type").default("text").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// --- Entidades de Metadados ---

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .references(() => teams.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 7 }).default("#cccccc"), // ex: '#FF5733'
});

// Tabela de junção para a relação muitos-para-muitos entre contactos e tags
export const contactsToTags = pgTable(
  "contacts_to_tags",
  {
    contactId: integer("contact_id")
      .notNull()
      .references(() => contacts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.contactId, t.tagId] }),
  }),
);
