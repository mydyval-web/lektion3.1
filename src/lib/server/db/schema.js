import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const blodsukker = pgTable('blodsukker', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').notNull(),
	value: text('value').notNull()
});