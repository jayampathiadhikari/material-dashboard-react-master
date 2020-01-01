/* eslint-disable no-unused-vars */

const ip = "http://3b09b4f4.ngrok.io";
const userToken = sessionStorage.getItem("userToken");
const userID = sessionStorage.getItem("userID");
export const FLIGHT_COMP_ON_UPDATE = ip + "/airport";
export const FLIGHT_FETCH_SCHEDULE = ip + "/schedule";
export const BOOKING_BOOKED_SEAT = ip + "/booking"; //shedule_id
export const BOOKING_ALL_SEAT = ip + "/seat"; //model_id
export const BOOKING_FREE_SEAT = ip + "/seat/free"; //schedule id
export const LOGIN_USER = ip + "/reg_user/login";
export const USER_DISCOUNT = ip + `/discount/${userID}`;
export const HEADER = {
  headers: {
    "x-access-token": userToken
  }
};

//all seats - http://78bd8911.ngrok.io/seat?model_id=0007
//free seats - http://78bd8911.ngrok.io/seat/free?schedule_id=1
