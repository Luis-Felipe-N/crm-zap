// src/db/schema/campaigns.ts

import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { instances, teams } from "./workspace";

export const messageTemplates = pgTable("message_templates", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  text: text("text").notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  // A campanha é enviada por um utilizador específico
  createdById: text("created_by_id").references(() => users.id, { onDelete: 'set null' }),
  instanceId: integer("instance_id").references(() => instances.id).notNull(),
  templateId: integer("template_id").references(() => messageTemplates.id),
  name: varchar("name", { length: 256 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  scheduledAt: timestamp("scheduled_at"),
  processedAt: timestamp("processed_at"),
  totalMessages: integer("total_messages").default(0),
  sentMessages: integer("sent_messages").default(0),
});