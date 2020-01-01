/*eslint-disable*/
import React from "react";
import { Image, Item, Statistic, Card, Button, Table, Checkbox, Icon } from 'semantic-ui-react'


//props - 
//       "schedule_id": 0,

//       "date": "string",

//       "airplane_model": "string",
//       "dep_time": "string",
//       "arrival_time": "string",
//       "gate_name": "string"
export class Schedule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table inverted singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                        <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                        <Table.HeaderCell>Airplane Model</Table.HeaderCell>
                        <Table.HeaderCell>Gate Name</Table.HeaderCell>
                        <Table.HeaderCell>Delayed</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{this.props.date}</Table.Cell>
                        <Table.Cell>{this.props.dep_time}</Table.Cell>
                        <Table.Cell>{this.props.arrival_time}</Table.Cell>
                        <Table.Cell>{this.props.airplane_model}</Table.Cell>
                        <Table.Cell>{this.props.gate_name}</Table.Cell>
                        <Table.Cell>{this.props.delayed}</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'/>
                        <Table.HeaderCell >
                            <Button
                                floated='right'
                                // icon
                                // labelPosition='center'
                                primary
                                size='small'
                                value={this.props.value}
                            >
                                 Reserve
                            </Button>
                            
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        )
    }
}






