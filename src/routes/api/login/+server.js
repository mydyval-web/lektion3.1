import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const { username, password } = await request.json();

	const userData = await db.query.user.findFirst({
		where: eq(user.username, username)
	});

	if (!userData) {
		return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
	}

	const isPasswordValid = await bcrypt.compare(password, userData.password);

	if (!isPasswordValid) {
		return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
	}

	const token = jwt.sign(
		{ userId: userData.id, username: userData.username },
		env.JWT_SECRET,
		{ expiresIn: '1h' }
	);

	return new Response(
		JSON.stringify({
			message: 'Login successful',
			token
		}),
		{ status: 200 }
	);
}