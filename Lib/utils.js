export function getAppCookies(req) {
	const parsedItems = {};
	if (req.headers.cookie) {
		const cookiesItems = req.headers.cookie.split('; ');
		cookiesItems.forEach(cookies => {
			const parsedItem = cookies.split('=');
			parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
		});
	}
	return parsedItems;
}