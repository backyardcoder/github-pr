import React, { Component } from "react";

import Onboarding from "./Onboarding";
import { isUndefined } from "../utils";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import NotificationsList from "./Notifications/NotificationsList";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 2
	},
	appBar: {
		padding: theme.spacing.unit * 2
	}
});

class Home extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			renderOnboarding:
				isUndefined(this.props.accessToken) || isUndefined(this.props.url)
		};
	}

	renderNotifications = () => {
		this.setState({ renderOnboarding: false });
	};

	render() {
		const { renderOnboarding } = this.state;
		const { classes } = this.props;

		return (
			<Grid container direction="row" justify="center" alignItems="center">
				<AppBar position="static" color="inherit" className={classes.appBar}>
					<Typography variant="title" color="inherit">
						Github Notifications
					</Typography>
				</AppBar>
				<div className={classes.root}>
					{renderOnboarding ? (
						<Onboarding onSuccess={this.renderNotifications} />
					) : (
						<NotificationsList />
					)}
				</div>
			</Grid>
		);
	}
}

export default withStyles(styles)(Home);
