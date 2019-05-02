import React,{Component} from 'react';
import {Table} from "reactstrap";

export default class ItemsList extends Component{
    constructor(props){
        super(props);

    }

    render(){

        let rows = this.props.inventory.map((val) => (
            <tr>
                <td>{val.name}</td>
                <td>{val.price}</td>
            </tr>
        ));

        return (
            <Table striped dark>
                <thead>
                    <tr>
                        <th><strong>Item Name</strong></th>
                        <th><strong>Price <em>CRCCC</em></strong></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

}

