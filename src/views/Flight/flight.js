/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Dropdown, Label, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Typography from "@material-ui/core/Typography";
// import DatePicker from "react-datepicker";   ----- uninstall date-picker
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "./react-datepicker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import { Schedule } from './schedule';
import * as constants from './constants';
import Seats from './seat';

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
//hello world
class flight extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startDate: new Date(),
    schedule: [],
    options: [],
    leaveDate: '',
    returnDate: '',
    origin: '',
    destination: '',
    class: '', 
    fetchSchedule: false,
  };

  handleChange = (event) => {
    this.setState({
      class: event.target.value
    });
  };

  handle = (event) => {
    console.log(event.target.value)
  }
  componentDidMount() {
    axios.get(constants.FLIGHT_COMP_ON_UPDATE).then(
      res => {
        console.log(res.data.data);
        const options = [];
        res.data.data.map(
          item => {
            options.push({
              key: item.airport_id,
              value: item.code,
              text: item.name
            })
          }
        );
        console.log(options);
        this.setState({
          options
        })
      }
    );
  };
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  };
  fetchSchedule(origin, destination, from_date, to_date) {
    axios.get(constants.FLIGHT_FETCH_SCHEDULE, {
      params: {
        origin: origin,
        destination: destination,
        from_date: from_date,
        to_date: to_date
      }
    }).then(res => {
      const schedules = [];
      res.data.data.map(
        item => {
          schedules.push({
            date: item.date.split("T")[0] ,
            schedule_id: item.schedule_id,
            airplane_model: item.model_name,
            model_id: item.model_id,
            dep_time: item.dep_time,
            arrival_time: item.arrival_time,
            gate_name: item.gate_name
          })
        }
      )
      console.log(res.data.data);
      console.log(schedules);
      this.setState({
        schedule:schedules,
      });
    });

  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        
        <Grid container spacing={3}>
          <Grid item xs={9} sm={2}>
            {/* <Button.Group size="large">
              <Button>Round Trip</Button>
              <Button>One Way</Button>
            </Button.Group> */}
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
              options={this.state.options}
              onChange={(event, data) => {
                this.setState({
                  origin: data.value,
                });
              }}
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
              options={this.state.options}
              onChange={(event, data) => {
                this.setState({
                  destination: data.value,
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}>
            <Label size="big">Start</Label>
          </Grid>
          <Grid item xs={9} sm={2}>
            <DayPickerInput onDayChange={day => {
              this.setState({
                leaveDate: this.formatDate(day)
              })
            }} />
          </Grid>
          <Grid item xs={9} sm={2}>
            <Label size="big">End</Label>
          </Grid>
          <Grid item xs={9} sm={2}>
            {/* <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        /> */}
            <DayPickerInput onDayChange={day => {
              this.setState({
                returnDate: this.formatDate(day)
              })
            }} />
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
                value="economy"
                control={<Radio color="default" />}
              />{" "}
              <Label size="big">Economy</Label>{" "}
              <FormControlLabel value="business" control={<Radio />} />
              <Label size="big">Business</Label>{" "}
              <FormControlLabel value="standard" control={<Radio />} />
              <Label size="big">Standard</Label>
            </Grid>

            <Grid item xs={9} sm={3}></Grid>
          </Grid>
        </RadioGroup>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}></Grid>
          <Grid item xs={9} sm={6}></Grid>
        </Grid>

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={8}>
            <Button fluid size='big' onClick={() => { this.fetchSchedule(this.state.origin, this.state.destination, this.state.leaveDate, this.state.returnDate) }}> <Icon name='search' />Search</Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={2}></Grid>
          <Grid item xs={9} sm={6}></Grid>
        </Grid>
        {/* <Grid container spacing={3} style={{ alignItems: "center" }}> */}
        <Grid container spacing={3} >
          <Grid item xs={8} >
            {/* <Schedule/> */}
            
              {
                this.state.schedule.map((item) => {
                  return (
                    <ul key={item.schedule_id} onClick={this.handle} style={{paddingLeft:0}}>
                    <Schedule date={item.date} value={item.schedule_id} airplane_model={item.airplane_model} dep_time={item.dep_time} arrival_time={item.arrival_time} gate_name={item.gate_name} />
                    </ul>
                  )
                })
              }
            
          </Grid>
          <Grid item xs={5} style={{backgroundColor:"black" }}>
            
          </Grid>

        </Grid>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={8} style={{ backgroundColor:"blue" }}>
            {/* <Seats/> */}
          </Grid>
          
        </Grid>
        
        
        
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
