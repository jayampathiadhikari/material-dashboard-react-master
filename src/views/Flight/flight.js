/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Dropdown, Label, Button, Icon, Modal, Header, Input } from "semantic-ui-react";
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

const seat_classes = [
  { key: 1, value: "E", text: "Economy" },
  { key: 2, value: "S", text: "Standard" },
  { key: 3, value: "B", text: "Business" },
]


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
    class: 'classE',
    fetchSchedule: false,
    visible: false,
    freeSeats: { classE: [], classB: [] },
    selectedArray: [],
    selectedSeatIds: 0,
    seatCost: 0,
    discountPercentage: 0,
    discountType: 'No Discount',
    total: 0,
    schedule_id: 0,
    birthday:'',
    first_name:'',
    last_name:'',
    passport_id:'',
    noSchedules:false,
  };

  handleChange = (event) => {
    this.setState({
      class: event.target.value
    });
  };

  handle = (event) => {
    const schedule_id = event.target.value;
    //all seats
    axios.get(constants.BOOKING_FREE_SEAT, {
      params: {
        schedule_id: schedule_id
      }
    }, constants.HEADER).then(
      res => {

        const classE = []; //economy
        const classB = []; //bussiness

        res.data.data.map(item => {
          console.log("seat", item);
          if (item.class == "E") {
            classE.push(
              {
                key: item.seat_id,
                value: item.seat_id,
                text: item.seat_name,
                seat_price: item.price,
              }
            )
          }
          else if (item.class == "B") {
            classB.push(
              {
                key: item.seat_id,
                value: item.seat_id,
                text: item.seat_name,
                seat_price: item.price
              }
            )
          }
        });

        this.setState({
          schedule_id: schedule_id,
          freeSeats: { classE, classB },
          visible: true,
        });
        console.log(this.state.freeSeats);
      }
    )
  }
  turnOff = () => {
    this.setState({
      visible: false
    })
    this.bookSeats();
  }
  setClass = (event, data) => {
    this.setState({
      class: data.value
    })
  }
  selectClassArray = (event, data) => {
    if (data.value == "E") {
      this.setState({ selectedArray: this.state.freeSeats.classE })
    } else if (data.value == "B") {
      this.setState({ selectedArray: this.state.freeSeats.classB })
    } else {
      this.setState({ selectedArray: this.state.freeSeats.classS })
    }
  }
  componentDidMount() {
    if (sessionStorage.getItem("userToken") == null) {
      this.props.history.push({
        pathname: "/access"
      });
    } else{
      axios.get(constants.FLIGHT_COMP_ON_UPDATE, constants.HEADER).then(
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
  
      axios.get(constants.USER_DISCOUNT + `${sessionStorage.getItem("userID")}`, constants.HEADER).then(res => {
        console.log("user discount", res.data.data[0].percentage)
        this.setState({
          discountPercentage: res.data.data[0].percentage,
          discountType: res.data.data[0].type
        })
      }).catch(err => {
        console.log("discount error")
      })
    }
    

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
    }, constants.HEADER).then(res => {
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
        noSchedules:false
      });
    }).catch(err=>{
      console.log(err)
      const schedules = [];
      this.setState({
        schedule: schedules,
        noSchedules:true
      });
      
    });

  };
  selectSeats = (value) => {
    this.setState({
      selectedSeatIds: value
    });
    var cost = 0;
    this.state.selectedArray.forEach(
      item => {
        if (item.key == value) {
          item.seat_price = item.seat_price || 0;
          var total = item.seat_price * (100 - this.state.discountPercentage) / 100;
          this.setState({
            seatCost: item.seat_price,
            total: total
          })
          // cost+= item.seat_price 
        };
      }
    )

  };

  bookSeats = () => {
    console.log("bookseats", this.state.selectedSeatIds)
    axios.post(constants.BOOK_SEAT + this.state.schedule_id, {
      "seat_id": this.state.selectedSeatIds,
      "user_id": sessionStorage.getItem('userID'),
      "first_name":this.state.first_name,
      "last_name":this.state.last_name,
      "birthday": this.state.birthday,
      "passport_id":this.state.passport_id
    }, constants.HEADER).then(res => {
      console.log("seat book", res)
    })
  }
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

        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={9} sm={1}></Grid>
          <Grid item xs={9} sm={6} style={{ alignItems: "center" }}>

          </Grid>

          <Grid item xs={9} sm={3}></Grid>
        </Grid>

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

        <Grid container spacing={3} >
          <Grid item xs={8} >

            {
              this.state.schedule.map((item) => {
                return (
                  <ul key={item.schedule_id} onClick={this.handle} style={{ paddingLeft: 0 }}>
                    <Schedule date={item.date} value={[item.schedule_id]} airplane_model={item.airplane_model} dep_time={item.dep_time} arrival_time={item.arrival_time} gate_name={item.gate_name} delayed={"No"} />
                  </ul>
                )
              })
             
            }{
              (this.state.schedule.length == 0 && this.state.noSchedules ) ?
               (<h2>
                  No Results 
                </h2>) : (
                  <div></div>
                ) 
              

            }

          </Grid>
          <Grid item xs={5} >

          </Grid>

        </Grid>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={8} >
            {/* <Seats/> */}
          </Grid>

        </Grid>
        <Modal dimmer={'blurring'} open={this.state.visible} onClose={this.turnOff} size="small" >
          <Modal.Header>Reserve Seats</Modal.Header>
          <Modal.Content scrolling>

            <Modal.Description>
              <Header>First Name :</Header>
              <Input onChange={(event,data)=>{ this.setState({first_name:data.value})}}/>
              <Header>Last Name :</Header>
              <Input onChange={(event,data)=>{ this.setState({last_name:data.value})}}/>
              <Header>Birthday :</Header>
              <DayPickerInput onDayChange={day => {
                this.setState({
                  birthday: this.formatDate(day)
                })
              }} />
              <Header>Passport ID : </Header>
              <Input onChange={(event,data)=>{ this.setState({passport_id:data.value})}}/>
              <Header>Select Class : </Header>
              <Dropdown placeholder='Select one' selection options={seat_classes} onChange={this.selectClassArray} />
              <Header>Select Seats : </Header>
              <Dropdown placeholder='Select one' fluid selection options={this.state.selectedArray} onChange={(event, data) => this.selectSeats(data.value)} />
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <Label size="big" basic color='orange' >Cost</Label><Label size="big" basic color='orange'>{this.state.seatCost}</Label>
              <p></p>
              <p></p>
              <Label size="big" basic color='blue'>Discount</Label><Label size="big" basic color='blue'>{this.state.discountType}</Label><Label size="big" basic color='blue'>{this.state.discountPercentage + "%"}</Label>
              <p></p>
              <p></p>
              <Label size="big" basic color='red'>Total</Label><Label size="big" basic color='red'>{this.state.total}</Label>
            </Modal.Description>

          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.turnOff}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Confirm"
              onClick={this.turnOff}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 50
  }
});

export default withStyles(styles)(flight);
