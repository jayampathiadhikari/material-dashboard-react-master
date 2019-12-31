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

    // render() {
    //     const x = "123";
    //     return (
    //         <div>
    //             <Card fluid>
    //                 <Card.Content header={"Date : " + this.props.date} />
    //                 <Card.Content description={"Departure Time : " + this.props.dep_time} />
    //                 <Card.Content description={"Arrival Time : "+ this.props.arrival_time} />
    //                 <Card.Content description={"Airplane Model : "+ this.props.airplane_model} />
    //                 <Card.Content description={"Gate Name : "+ this.props.gate_name} />
    //                 <Card.Content extra>
    //                     <div className='ui two buttons'>
    //                         <Button value={this.props.value} basic color='green'>
    //                             See More
    //                         </Button>
    //                     </div>
    //                 </Card.Content>
    //             </Card>
    //         </div>
    //     )
    // }
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
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{this.props.date}</Table.Cell>
                        <Table.Cell>{this.props.dep_time}</Table.Cell>
                        <Table.Cell>{this.props.arrival_time}</Table.Cell>
                        <Table.Cell>{this.props.airplane_model}</Table.Cell>
                        <Table.Cell>{this.props.gate_name}</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button
                                floated='right'
                                // icon
                                // labelPosition='center'
                                primary
                                size='small'
                                value={this.props.value}
                            >
                                 Add User
                            </Button>
                            
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        )
    }
}






