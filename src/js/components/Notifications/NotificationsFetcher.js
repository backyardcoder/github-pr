import { PureComponent } from "react";
import PropTypes from "prop-types";

import Storage from "../../data/Storage";
import GithubClient from "../../network/GithubClient";

class NotificationsFetcher extends PureComponent {
	static PropTypes = {
		hasError: PropTypes.func.isRequired,
		onSuccess: PropTypes.func.isRequired
	};

	componentWillMount() {
		const { onSuccess, hasError } = this.props;
		Storage.getAccountInfo(({ apiUrl, accessToken }) => {
			const ghClient = new GithubClient(accessToken, apiUrl);

			ghClient.getNotifications((err, response) => {
				if (err) {
					return hasError(err);
				}

				response.json().then(notifications => {
					Storage.saveNotifications({ notifications }, () => {
						onSuccess();
					});
				});
			});
		});
	}

	render() {
		return null;
	}
}

export default NotificationsFetcher;
