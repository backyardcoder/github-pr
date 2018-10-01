import React, { Component } from "react";
import PropTypes from "prop-types";

import Storage from "../../data/Storage";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class NotificationsList extends Component {
	static PropTypes = {
		classes: PropTypes.object,
		hasError: PropTypes.func.isRequired
	};

	constructor() {
		super(...arguments);
		this.state = {
			isLoading: true,
			notifications: this.props.notifications || []
		};
	}

	componentWillMount() {
		Storage.getNotifications(notifications => {
			this.setState({ notifications, isLoading: false });
		});
	}

	render() {
		const { isLoading, notifications } = this.state;
		return (
			<Grid container direction="column" spacing={16} alignItems="center">
				{isLoading ? (
					<Grid item>
						<CircularProgress size={50} />
					</Grid>
				) : (
					<React.Fragment>
						{notifications.map(notification => {
							return (
								<Grid item>
									<Typography variant="subheading">
										{notification.subject.url}
									</Typography>
								</Grid>
							);
						})}
					</React.Fragment>
				)}
			</Grid>
		);
	}
}

export default NotificationsList;
