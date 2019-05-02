import React,{Component} from 'react';
import {Button, Input, InputGroup, Table} from "reactstrap";

export default class PurchaseItem extends Component{
    constructor(props){
        super(props);
        this.state = {
          cart : [],
          currentItem : "Enter Item"
        };
    }

    updateShoppingCart() {
        let temp_cart = [...this.state.cart];
        let temp_curItem = this.state.currentItem;
        temp_cart.push(temp_curItem);
        temp_curItem = "Enter Item";
        this.setState({cart : [...temp_cart]});
        this.setState({currentItem : temp_curItem});
    }


    updateCurItem(event){
        this.setState({currentItem : event.target.value});
    }

    //TODO check to make sure that the returned price from state is actually an int and not an unparsed string from json response
    render(){

        let total_price = 0;

        let transaction = this.state.cart.map((item) => (
            <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
            </tr>
        ));

        for(let i = 0; i < this.props.inventory.length; i++){
            console.log("whoa")
        }

        return (
            <div>
                <p>Go for the dough</p>
                <InputGroup>
                    <Input onChange={(event) => (this.updateCurItem(event))} value={this.state.currentItem}/>
                    <Button onClick={() => (this.updateShoppingCart())}>Add to Cart</Button>
                </InputGroup>
                <Table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        );
    }

}

