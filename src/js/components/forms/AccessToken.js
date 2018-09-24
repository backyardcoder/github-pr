import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
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
		const { classes, accessToken, isAccessTokenInvalid } = this.props;

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
						Follow the steps here to create an access token with "notifications"
						permission.
					</Typography>
				</Grid>
				<Grid item>
					<Paper className={classes.infoContent}>
						<Grid container alignItems="center" justify="space-around">
							<Grid item>
								<InfoIcon color="action" fontSize="large" />
							</Grid>
							<Grid item>
								<Typography variant="caption" color="textPrimary">
									Token is saved in your browser storage.
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item>
					<Fade in timeout={400}>
						<TextField
							fullWidth
							autoFocus
							label="Access Token"
							id="github-access-token"
							defaultValue={accessToken}
							error={isAccessTokenInvalid}
							onChange={this.handleAccessTokenChange}
						/>
					</Fade>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(AccessToken);
