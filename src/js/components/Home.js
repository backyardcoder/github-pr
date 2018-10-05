import React, { Component } from "react";

import Onboarding from "./Onboarding";
import Storage from "../data/Storage";
import { isUndefined } from "../utils";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import messageTypes from "../constants/messageTypes";
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
			renderOnboarding: this.shouldRenderOnboarding()
		};
	}

	shouldRenderOnboarding = () => {
		const { url, accessToken, renderOnboarding } = this.props;

		return (
			isUndefined(url) || isUndefined(accessToken) || Boolean(renderOnboarding)
		);
	};

	renderNotifications = () => {
		this.setState({ renderOnboarding: false }, () => {
			Storage.setRenderOnboarding(false);
			chrome.runtime.sendMessage({ type: messageTypes.ONBOARDING_COMPLETE });
		});
	};

	render() {
		const { renderOnboarding } = this.state;
		const { classes, ...onboardingProps } = this.props;

		return (
			<Grid container direction="row" justify="center" alignItems="center">
				<AppBar position="static" color="inherit" className={classes.appBar}>
					<Typography variant="title" color="inherit">
						Github Notifications
					</Typography>
				</AppBar>
				<div className={classes.root}>
					{renderOnboarding ? (
						<Onboarding
							{...onboardingProps}
							onSuccess={this.renderNotifications}
						/>
					) : (
						<NotificationsList />
					)}
				</div>
			</Grid>
		);
	}
}

export default withStyles(styles)(Home);
