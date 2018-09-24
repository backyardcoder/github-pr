import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { isEmptyString } from "../../utils";
import urlTypes from "../../constants/urlTypes";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const { PUBLIC, ENTERPRISE } = urlTypes;
const styles = theme => ({
	radioGroup: {
		margin: `0 ${theme.spacing.unit * 2}px`
	}
});

class Url extends Component {
	state = {
		url: this.props.url || "",
		urlType: this.props.urlType || urlTypes.PUBLIC
	};

	handleUrlChange = event => {
		this.props.onUrlChange(event.target.value);
	};

	handleUrlTypeChange = event => {
		this.props.onUrlTypeChange(event.target.value);
	};

	render() {
		const { url, classes, urlType, isUrlInvalid } = this.props;
		return (
			<Grid container direction="column">
				<Grid item>
					<FormControl component="fieldset" className={classes.radioGroup}>
						<RadioGroup
							value={urlType}
							name="accountType"
							aria-label="Account Type"
							onChange={this.handleUrlTypeChange}
						>
							<FormControlLabel
								value={PUBLIC}
								control={<Radio color="primary" />}
								label="Public"
							/>
							<FormControlLabel
								value={ENTERPRISE}
								control={<Radio color="primary" />}
								label="Enterprise"
							/>
						</RadioGroup>
						{urlType === ENTERPRISE && (
							<TextField
								fullWidth
								autoFocus
								label="URL"
								id="github-url"
								defaultValue={url}
								error={isUrlInvalid}
								onChange={this.handleUrlChange}
								InputProps={{
									startAdornment: (
										<InputAdornment variant="filled" position="start">
											https://
										</InputAdornment>
									)
								}}
							/>
						)}
					</FormControl>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Url);
