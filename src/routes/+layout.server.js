const parseCookie = (str) => {
	if (str === null) {
		return null;
	}
	return str
		.split(';')
		.map((v) => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});
};

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request, setHeaders }) {
  const session = parseCookie(request.headers.get('cookie'));
  return {
    user: session?.session ? session.session : null
  };
}