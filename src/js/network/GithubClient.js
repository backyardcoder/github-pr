import poller from "./poller";

export default class GithubClient {
	constructor(url, accessToken) {
		this.url = `https://api.${url}/`;
		this.accessToken = accessToken;
	}

	_makeRequest(options, callback) {
		const { endPoint } = options;
		fetch(`${this.url}${endPoint}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${this.accessToken}`
			}
		})
			.then(response => {
				callback(null, response);
			})
			.catch(err => {
				callback(err);
			});
	}

	getUser(cb) {
		this._makeRequest({ endPoint: "user" }, cb);
	}

	getNotifications(cb) {
		this._makeRequest({ endPoint: "notifications" }, cb);
	}

	pollNotifications(time, cb) {
		poller({
			time,
			type: "github_notifications_poller",
			func: this.getNotifications.bind(this, cb)
		});
	}
}
