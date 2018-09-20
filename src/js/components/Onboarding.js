import React from "react";
import UrlForm from "./forms/Url";
import UserProfile from "./UserProfile";
import { isEmptyString } from "../utils";
import Step from "@material-ui/core/Step";
import urlTypes from "../constants/urlTypes";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import AccessTokenForm from "./forms/AccessToken";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StepContent from "@material-ui/core/StepContent";

const { PUBLIC } = urlTypes;
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

function getSteps() {
	return ["Select Github account type", "Add access token", "Success"];
}

function getStepContent(step, props) {
	switch (step) {
		case 0:
			return <UrlForm {...props} />;
		case 1:
			return <AccessTokenForm {...props} />;
		case 2:
			return <UserProfile {...props} />;
	}
}

class Onboarding extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			activeStep: 0,
			disableNext: false,
			url: this.props.url || "",
			urlType: this.props.urlType || PUBLIC,
			accessToken: this.props.accessToken || ""
		};
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleUrlTypeChange = this.handleUrlTypeChange.bind(this);
		this.handleAccessTokenChange = this.handleAccessTokenChange.bind(this);
	}

	handleNext() {
		this.setState(state => {
			const nextActiveStep = state.activeStep + 1;
			return {
				activeStep: nextActiveStep,
				disableNext: nextActiveStep === 1 && isEmptyString(state.accessToken)
			};
		});
	}

	handleBack() {
		this.setState(state => {
			const nextActiveStep = state.activeStep - 1;
			return {
				activeStep: nextActiveStep,
				disableNext: false
			};
		});
	}

	handleUrlTypeChange(newType) {
		this.setState(state => ({
			urlType: newType,
			disableNext: newType !== PUBLIC && isEmptyString(state.url)
		}));
	}

	handleUrlChange(newVal) {
		if (!isEmptyString(newVal)) {
			this.setState({ url: newVal, disableNext: false });
		}
	}

	handleAccessTokenChange(newVal) {
		if (!isEmptyString(newVal)) {
			this.setState({ accessToken: newVal, disableNext: false });
		}
	}

	render() {
		const steps = getSteps();
		const { classes } = this.props;
		const { activeStep, disableNext, url, accessToken, urlType } = this.state;

		return (
			<Stepper
				activeStep={activeStep}
				orientation="vertical"
				className={classes.root}
			>
				{steps.map((label, index) => {
					return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								<Typography>
									{getStepContent(index, {
										url,
										urlType,
										accessToken,
										handleUrlChange: this.handleUrlChange,
										handleUrlTypeChange: this.handleUrlTypeChange,
										handleAccessTokenChange: this.handleAccessTokenChange
									})}
								</Typography>
								<div className={classes.actionsContainer}>
									{index !== 0 && (
										<Button
											onClick={this.handleBack}
											className={classes.button}
										>
											Back
										</Button>
									)}
									<Button
										color="primary"
										variant="contained"
										disabled={disableNext}
										onClick={this.handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? "Finish" : "Next"}
									</Button>
								</div>
							</StepContent>
						</Step>
					);
				})}
			</Stepper>
		);
	}
}

export default withStyles(styles)(Onboarding);
