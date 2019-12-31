/*eslint-disable*/
import React from "react";
import { Image, Item, Statistic, Card, Button } from 'semantic-ui-react'
import axios from 'axios';
import * as constants from './constants';
//props - model_id -- to get all seats -- seat/?model_id=id
//props - schedule id -- to get booked seats --
//

export class Schedule extends React.Component {
    constructor(props) {
        super(props);
    }
    getAllSeats(model_id){
        axios.get(constants.BOOKING_ALL_SEAT,{
            params:{
                model_id: model_id
            }
        }).then(res=>{
            console.log(res.data)
        })
    }
    getBookedSeats(schedule_id){
        axios.get(constants.BOOKING_BOOKED_SEAT,{
            params:{
                schedule_id: schedule_id
            }
        }).then(res=>{
            console.log(res.data)
        })
    }
    getFreeSeats(schedule_id){
        axios.get(constants.BOOKING_FREE_SEAT,{
            params:{
                schedule_id: schedule_id
            }
        }).then(res=>{
            console.log(res.data)
        })
    } 
    render() {
        return (
            <div>

            </div>
        )
    }
}