import { blodsukker } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

function getUserIdFromToken(request) {
	const authHeader = request.headers.get('authorization');

	if (!authHeader) {
		return null;
	}

	const token = authHeader.replace('Bearer ', '');

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		return decoded.userId;
	} catch {
		return null;
	}
}

export async function POST({ request }) {
	const { value } = await request.json();
	const userId = getUserIdFromToken(request);

	if (!userId) {
		return new Response(JSON.stringify({ error: 'Ikke logget ind' }), { status: 401 });
	}

	await db.insert(blodsukker).values({
		userId,
		value
	});

	return new Response(JSON.stringify({ message: 'Blodsukker gemt' }), { status: 200 });
}

export async function GET({ request }) {
	const userId = getUserIdFromToken(request);

	if (!userId) {
		return new Response(JSON.stringify({ error: 'Ikke logget ind' }), { status: 401 });
	}

	const values = await db.query.blodsukker.findMany({
		where: eq(blodsukker.userId, userId)
	});

	return new Response(JSON.stringify(values), { status: 200 });
}