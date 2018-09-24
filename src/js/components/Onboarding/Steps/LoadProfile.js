import React, { Component } from "react";
import Step from "@material-ui/core/Step";
import UserProfile from "../../UserProfile";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

class LoadProfile extends Component {
	hasError = err => {
		const { status } = err;
		if (status === 401) {
			return this.props.handleInvalidAccessToken();
		}

		return this.props.handleInvalidUrl();
	};

	render() {
		return (
			<Step {...this.props}>
				<StepLabel>Load Profile</StepLabel>
				<StepContent>
					<UserProfile hasError={this.hasError} />
				</StepContent>
			</Step>
		);
	}
}

export default LoadProfile;
