import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getTokenUrl } from "../../network/urls";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	infoContent: {
		padding: `${theme.spacing.unit}px`,
		margin: `${theme.spacing.unit / 4}px`
	}
});

class AccessToken extends Component {
	state = {
		accessToken: this.props.accessToken || ""
	};

	handleAccessTokenChange = event => {
		this.props.onTokenChange(event.target.value);
	};

	render() {
		const { accessToken, isAccessTokenInvalid, url } = this.props;

		return (
			<Grid container direction="column" spacing={16}>
				<Grid item>
					<Typography>
						In order to make requests for your notifications a valid access
						token is required.
					</Typography>
				</Grid>
				<Grid item>
					<Typography>
						Check mark <strong>"notifications"</strong> while creating the
						token. Token will be saved in your browser storage.
					</Typography>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						target="_blank"
						variant="outlined"
						href={getTokenUrl(url)}
					>
						Create Token
					</Button>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						label="Access Token"
						id="github-access-token"
						defaultValue={accessToken}
						error={isAccessTokenInvalid}
						onChange={this.handleAccessTokenChange}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(AccessToken);
