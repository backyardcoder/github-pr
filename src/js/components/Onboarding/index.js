import React from "react";
import Stepper from "@material-ui/core/Stepper";
import { withStyles } from "@material-ui/core/styles";

import UrlStep from "./Steps/Url";
import AccessTokenStep from "./Steps/AccessToken";
import LoadProfile from "./Steps/LoadProfile";

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
			activeStep: 0,
			isUrlInvalid: false,
			isAccessTokenInvalid: false
		};
	}

	changeStep = nextStep => {
		this.setState({
			activeStep: nextStep
		});
	};

	handleInvalidUrl = () => {
		this.setState({
			activeStep: 0,
			isUrlInvalid: true,
			isAccessTokenInvalid: false
		});
	};

	handleInvalidAccessToken = () => {
		this.setState({
			activeStep: 1,
			isUrlInvalid: false,
			isAccessTokenInvalid: true
		});
	};

	tryLoadingProfile = () => {
		this.setState({
			activeStep: 2,
			isUrlInvalid: false,
			isAccessTokenInvalid: false
		});
	};

	render() {
		const { classes } = this.props;
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
				<LoadProfile
					classes={this.props.classes}
					handleInvalidUrl={this.handleInvalidUrl}
					handleInvalidAccessToken={this.handleInvalidAccessToken}
				/>
			</Stepper>
		);
	}
}

export default withStyles(styles)(Onboarding);
