import React from "react";
import axios from "axios";
import * as constants from "../Flight/constants";
import { Book } from "./book";
export default class Mybookings extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    userID: "",
    bookings: []
  };
  componentDidMount() {
    if (sessionStorage.getItem("userToken") == null) {
      this.props.history.push({
        pathname: "/access"
      });
    } else {
      axios
        .get(
          constants.ALL_BOOKING_USER +
            `${sessionStorage.getItem("userID")}` +
            "/booking",
          constants.HEADER
        )
        .then(res => {
          this.setState({ bookings: res.data.data });
          console.log("booking", res);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.bookings.map(item => {
          return (
            <ul key={item.id} style={{ paddingLeft: 0 }}>
              <Book
                date={item.date}
                airplane_model={item.model_name}
                dep_time={item.dep_time}
                arrival_time={item.arival_time}
                gate_name={item.name}
                origin={item.origin}
                destination={item.destination}
              />
            </ul>
          );
        })}
      </div>
    );
  }
}
