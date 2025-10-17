import { integer, pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const channelTypeEnum = pgEnum("channel_type", ["whatsapp", "instagram", "telegram", "web"]);

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  ownerId: text("owner_id").references(() => users.id, { onDelete: "set null" }),
});

export const instances = pgTable("instances", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name", { length: 100 }), // ex: "Atendimento Vendas"
  channel: channelTypeEnum("channel_type").default("whatsapp").notNull(),
  
  evolutionInstanceName: varchar("evolution_instance_name", { length: 256 }).unique(),
  evolutionToken: varchar("evolution_token", { length: 256 }),
  status: varchar("status", { length: 50 }).default("disconnected").notNull(),
});