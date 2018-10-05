import React from "react";
import Stepper from "@material-ui/core/Stepper";
import { withStyles } from "@material-ui/core/styles";

import UrlStep from "./Steps/Url";
import Storage from "../../data/Storage";
import { isUndefined } from "../../utils";
import AccessTokenStep from "./Steps/AccessToken";
import LoadNotifications from "./Steps/LoadNotifications";

const styles = theme => ({
	root: {
		padding: "0px"
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit
	}
});

class Onboarding extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			isUrlInvalid: false,
			isAccessTokenInvalid: false,
			activeStep: this.getActiveStep()
		};
	}

	getActiveStep = () => {
		const { url, accessToken } = this.props;
		if (isUndefined(url)) {
			return 0;
		} else if (isUndefined(accessToken)) {
			return 1;
		}

		return 2;
	};

	changeStep = nextStep => {
		this.setState({
			activeStep: nextStep
		});
	};

	handleInvalidUrl = () => {
		this.setState(
			{
				activeStep: 0,
				isUrlInvalid: true,
				isAccessTokenInvalid: false
			},
			() => {
				Storage.setRenderOnboarding(true);
			}
		);
	};

	handleInvalidAccessToken = () => {
		this.setState(
			{
				activeStep: 1,
				isUrlInvalid: false,
				isAccessTokenInvalid: true
			},
			() => {
				Storage.setRenderOnboarding(true);
			}
		);
	};

	tryLoadingProfile = () => {
		this.setState({
			activeStep: 2,
			isUrlInvalid: false,
			isAccessTokenInvalid: false
		});
	};

	render() {
		const { classes, onSuccess } = this.props;
		const { activeStep, isAccessTokenInvalid, isUrlInvalid } = this.state;

		return (
			<Stepper
				activeStep={activeStep}
				orientation="vertical"
				className={classes.root}
			>
				<UrlStep
					classes={classes}
					isUrlInvalid={isUrlInvalid}
					changeStep={this.changeStep}
					tryLoadingProfile={this.tryLoadingProfile}
				/>
				<AccessTokenStep
					classes={classes}
					changeStep={this.changeStep}
					isAccessTokenInvalid={isAccessTokenInvalid}
					tryLoadingProfile={this.tryLoadingProfile}
				/>
				<LoadNotifications
					classes={classes}
					onSuccess={onSuccess}
					handleInvalidUrl={this.handleInvalidUrl}
					handleInvalidAccessToken={this.handleInvalidAccessToken}
				/>
			</Stepper>
		);
	}
}

export default withStyles(styles)(Onboarding);
