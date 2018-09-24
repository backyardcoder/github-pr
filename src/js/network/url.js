import urlTypes from "../constants/urlTypes";

export function getApiUrl(urlType, url) {
	return urlType === urlTypes.PUBLIC
		? "https://api.github.com/"
		: `https://${url}/api/v3/`;
}
