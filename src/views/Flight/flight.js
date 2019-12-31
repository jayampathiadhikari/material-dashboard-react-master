/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Dropdown, Label, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// import DatePicker from "react-datepicker";   ----- uninstall date-picker
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "./react-datepicker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import axios from 'axios';
import { Schedule } from './schedule';
import * as constants from './constants';
import { Header, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


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
    visible:false,
  };

  handleChange = (event) => {
    this.setState({
      class: event.target.value
    });
  };

  handle = (event) => {
    this.setState({
      visible:true,
    })
    console.log(event.target.value)
  }
  turnOff = () =>{
    this.setState({
      visible:false
    })
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
            date: item.date.split("T")[0],
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
        schedule: schedules,
      });
    });

  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.turnOff}
            vertical
            visible={this.state.visible}
            width='wide'
            direction='right'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
        </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
        </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
        </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.visible}>
          <Segment basic>
          {/* content starts here */}
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

          {/* <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={this.handleChange}
        > */}
          <Grid container spacing={3} style={{ alignItems: "center" }}>
            <Grid item xs={9} sm={1}></Grid>
            <Grid item xs={9} sm={6} style={{ alignItems: "center" }}>
              {/* <FormControlLabel
                value="economy"
                control={<Radio color="default" />}
              />{" "}
              <Label size="big">Economy</Label>{" "}
              <FormControlLabel value="business" control={<Radio />} />
              <Label size="big">Business</Label>{" "}
              <FormControlLabel value="standard" control={<Radio />} />
              <Label size="big">Standard</Label> */}
            </Grid>

            <Grid item xs={9} sm={3}></Grid>
          </Grid>
          {/* </RadioGroup> */}
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
                    <ul key={item.schedule_id} onClick={this.handle} style={{ paddingLeft: 0 }}>
                      <Schedule date={item.date} value={item.schedule_id} airplane_model={item.airplane_model} dep_time={item.dep_time} arrival_time={item.arrival_time} gate_name={item.gate_name} delayed={"hardcode"} />
                    </ul>
                  )
                })
              }

            </Grid>
            <Grid item xs={5} style={{ backgroundColor: "black" }}>

            </Grid>

          </Grid>
          <Grid container spacing={3} style={{ alignItems: "center" }}>
            <Grid item xs={8} style={{ backgroundColor: "blue" }}>
              {/* <Seats/> */}
            </Grid>

          </Grid>
        
          </Segment>
          </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
        );
      }
    }
const styles = theme => ({
          root: {
          flexGrow: 1,
        backgroundColor:'red'
      },
  paper: {
          padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 50
      }
    });
    
    export default withStyles(styles)(flight);
