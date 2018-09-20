import React from "react";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	infoIcon: {
		marginRight: `${theme.spacing.unit}px`
	},
	infoText: {
		marginTop: `${theme.spacing.unit / 4}px`
	}
});

const AccessToken = props => {
	const { error, accessToken, handleAccessTokenChange, classes } = props;

	return (
		<Grid container direction="column" spacing={16}>
			<Grid item>
				<Typography>
					In order to make requests for your notifications a valid access token
					is required.
				</Typography>
			</Grid>
			<Grid item>
				<Typography>
					Follow the steps here to create an access token with "notifications"
					permission.
				</Typography>
			</Grid>
			<Grid item>
				<Fade in timeout={400}>
					<TextField
						fullWidth
						autoFocus
						error={error}
						value={accessToken}
						label="Access Token"
						id="github-access-token"
						onChange={e => handleAccessTokenChange(e.target.value)}
					/>
				</Fade>
			</Grid>
			<Slide direction="up" in timeout={300}>
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					message={
						<Grid container direction="row" justify="center">
							<Grid item>
								<InfoIcon className={classes.infoIcon} />
							</Grid>
							<Grid item className={classes.infoText}>
								Token is saved in your browser storage.
							</Grid>
						</Grid>
					}
				/>
			</Slide>
		</Grid>
	);
};

export default withStyles(styles)(AccessToken);
