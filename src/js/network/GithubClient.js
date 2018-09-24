import poller from "./poller";
import { GH_NOTIFICATION_POLLER } from "../constants/pollerTypes";

export default class GithubClient {
	constructor(accessToken, url) {
		this.url = url;
		this.accessToken = accessToken;
	}

	_makeRequest(options, callback) {
		const { endPoint, method } = options;
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.accessToken}`
		});
		fetch(`${this.url}${endPoint}`, { headers, method })
			.then(response => {
				if (!response.ok) {
					throw response;
				}
				callback(null, response);
			})
			.catch(err => {
				callback(err);
			});
	}

	getUser(cb) {
		this._makeRequest({ endPoint: "user", method: "GET" }, cb);
	}

	getNotifications(cb) {
		this._makeRequest({ endPoint: "notifications", method: "GET" }, cb);
	}

	pollNotifications(time, cb) {
		poller({
			time,
			type: GH_NOTIFICATION_POLLER,
			func: this.getNotifications.bind(this, cb)
		});
	}
}
