export default async function consume(func, route, ...options) {
	try {
		const r = await func(route, ...options);
		return r.data || r.status;
	} catch (err) {
		if (err.response) console.log(err.response.data);
		else console.log('Error');
		return err.response.status;
	}
}
