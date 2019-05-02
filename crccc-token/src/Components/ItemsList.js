import React,{Component} from 'react';
import {Table} from "reactstrap";

export default class ItemsList extends Component{
    constructor(props){
        super(props);
        this.state = {
          //FIXME this is a sample this is dependent on the name of the register
          inventory :[
              {
                  name : "Orange",
                  price : 50
              },
              {
                  name : "Cupcake",
                  price : 150
              },
              {
                  name: "Meatball",
                  price : 999
              }
          ]
        };
    }

    render(){

        let rows = this.state.inventory.map((val) => (
            <tr>
                <td>{val.name}</td>
                <td>{val.price}</td>
            </tr>
        ));

        return (
            <Table>
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

