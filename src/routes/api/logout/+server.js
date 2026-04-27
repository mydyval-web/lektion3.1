export async function POST({ cookies }) {
	cookies.delete('session', {
		path: '/'
	});

	return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200 });
}