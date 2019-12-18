/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Hidden from "@material-ui/core/Hidden";
// core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import SelectSearch from 'react-select-search';
// import './flightStyle.css';`
import { Dropdown, Label, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Typography from "@material-ui/core/Typography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "./react-datepicker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// });
const countryOptions = [
  { key: "af", value: "us", flag: "sl", text: "Afghanistan" },
  { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
  { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
  { key: "as", value: "as", flag: "as", text: "American Samoa" },
  { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
  { key: "ao", value: "ao", flag: "ao", text: "Angola" },
  { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", flag: "ag", text: "Antigua" },
  { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
  { key: "am", value: "am", flag: "am", text: "Armenia" },
  { key: "aw", value: "aw", flag: "aw", text: "Aruba" },
  { key: "au", value: "au", flag: "au", text: "Australia" },
  { key: "at", value: "at", flag: "at", text: "Austria" },
  { key: "az", value: "az", flag: "az", text: "Azerbaijan" },
  { key: "bs", value: "bs", flag: "bs", text: "Bahamas" },
  { key: "bh", value: "bh", flag: "bh", text: "Bahrain" },
  { key: "bd", value: "bd", flag: "bd", text: "Bangladesh" },
  { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
  { key: "by", value: "by", flag: "by", text: "Belarus" },
  { key: "be", value: "be", flag: "be", text: "Belgium" },
  { key: "bz", value: "bz", flag: "bz", text: "Belize" },
  { key: "bj", value: "bj", flag: "bj", text: "Benin" }
];

class flight extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={9} sm={2}>
            <Button.Group size="large">
              <Button>Round Trip</Button>
              <Button>One Way</Button>
            </Button.Group>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}>
            <Label size="big">Origin</Label>
          </Grid>
          <Grid item xs={9} sm={6}>
            <Dropdown
              placeholder="Please select a city"
              fluid
              search
              selection
              options={countryOptions}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}>
            <Label size="big">Destination</Label>
          </Grid>
          <Grid item xs={9} sm={6}>
            <Dropdown
              placeholder="Please select a city"
              fluid
              search
              selection
              options={countryOptions}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}>
            <Label size="big">Leaving</Label>
          </Grid>
          <Grid item xs={9} sm={2}>
            <DayPickerInput onDayChange={day => console.log(day)} />
          </Grid>
          <Grid item xs={9} sm={2}>
            <Label size="big">Returning</Label>
          </Grid>
          <Grid item xs={9} sm={2}>
            {/* <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        /> */}
            <DayPickerInput onDayChange={day => console.log(day)} />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}></Grid>
          <Grid item xs={9} sm={6}></Grid>
        </Grid>

        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={this.handleChange}
        >
          <Grid container spacing={3} style={{ alignItems: "center" }}>
            <Grid item xs={9} sm={1}></Grid>
            <Grid item xs={9} sm={6} style={{ alignItems: "center" }}>
              <FormControlLabel
                value="female"
                control={<Radio color="default" />}
              />{" "}
              <Label size="big">Economy</Label>{" "}
              <FormControlLabel value="male" control={<Radio />} />
              <Label size="big">Business</Label>{" "}
              <FormControlLabel value="other" control={<Radio />} />
              <Label size="big">Standard</Label>
            </Grid>

            <Grid item xs={9} sm={3}></Grid>
          </Grid>
        </RadioGroup>
      </div>
    );
  }
}
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 50
  }
});

export default withStyles(styles)(flight);
