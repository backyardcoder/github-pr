import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
	profilePic: {
		width: 60,
		height: 60
	}
});

const UserProfile = props => {
	const {
		classes,
		username = "backyardcoder",
		picUrl = "https://avatars1.githubusercontent.com/u/7418297?s=400&u=7d462898ca8f53d387b3aa53b85ac45fe9e92399&v=4"
	} = props;
	return (
		<Grid container direction="column" spacing={16} alignItems="center">
			<Grid item>
				<Avatar alt={username} src={picUrl} className={classes.profilePic} />
			</Grid>
			<Grid item>
				<Typography variant="subheading">
					Welcome, <strong>{username}</strong>!
				</Typography>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(UserProfile);
