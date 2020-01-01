/*eslint-disable*/
import React from "react";
import { Image, Item, Statistic, Card, Button, Table, Checkbox, Icon } from 'semantic-ui-react'


//props - 
//       "origin": 0,
//         destination
//       "date": "string",
//        name {gatename}
//       "model_name": "string",
//       "payment": "string",

export class Book extends React.Component {
    constructor(props) {
        super(props);
    }
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
      
    render() {
        return (
            <Table inverted singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                        <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                        <Table.HeaderCell>Airplane Model</Table.HeaderCell>
                        <Table.HeaderCell>Origin</Table.HeaderCell>
                        <Table.HeaderCell>Destination</Table.HeaderCell>
                        <Table.HeaderCell>Gate Name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{this.formatDate(this.props.date)}</Table.Cell>
                        <Table.Cell>{this.props.dep_time}</Table.Cell>
                        <Table.Cell>{this.props.arrival_time}</Table.Cell>
                        <Table.Cell>{this.props.airplane_model}</Table.Cell>
                        <Table.Cell>{this.props.origin}</Table.Cell>
                        <Table.Cell>{this.props.destination}</Table.Cell>
                        <Table.Cell>{this.props.gate_name}</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'/>
                    </Table.Row>
                </Table.Footer>
            </Table>

        )
    }
}






