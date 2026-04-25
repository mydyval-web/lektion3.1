import { blodsukker } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
	const { value } = await request.json();
	const session = cookies.get('session');

	if (!session) {
		return new Response(JSON.stringify({ error: 'Ikke logget ind' }), { status: 401 });
	}

	await db.insert(blodsukker).values({
		userId: Number(session),
		value
	});

	return new Response(JSON.stringify({ message: 'Blodsukker gemt' }), { status: 200 });
}

export async function GET({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		return new Response(JSON.stringify({ error: 'Ikke logget ind' }), { status: 401 });
	}

	const values = await db.query.blodsukker.findMany({
		where: eq(blodsukker.userId, Number(session))
	});

	return new Response(JSON.stringify(values), { status: 200 });
}