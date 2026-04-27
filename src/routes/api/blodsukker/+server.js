import { blodsukker } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
	const { value } = await request.json();

	const userId = locals.user.id;

	await db.insert(blodsukker).values({
		userId,
		value
	});

	return new Response(JSON.stringify({ message: 'Blodsukker gemt' }), { status: 200 });
}

export async function GET({ locals }) {
	const userId = locals.user.id;

	const values = await db.query.blodsukker.findMany({
		where: eq(blodsukker.userId, userId)
	});

	return new Response(JSON.stringify(values), { status: 200 });
}