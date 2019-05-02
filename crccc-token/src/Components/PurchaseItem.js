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

        console.log("Adding " + temp_curItem + " to the cart");
        console.log(temp_cart);

        this.setState({cart : temp_cart});
        this.setState({currentItem : temp_curItem});
        console.log("yee")
    }

    itemPrice(itemName){
        let price = 0;
        let tempInventory = [...this.props.inventory];
        let results = tempInventory.filter(item => (itemName === item.name));
        if(results.length !== 0){
            price = results[0].price;
        }
        return price;
    }

    updateCurItem(event){
        this.setState({currentItem : event.target.value});
    }

    //TODO check to make sure that the returned price from state is actually an int and not an unparsed string from json response
    render(){

        let total_price = 0;
        let transaction;

        //FIXME <td>{item.price}</td>
        if(this.state.cart.length !== 0){
            transaction = this.state.cart.map((item) => (
                <tr>
                    <td>{item}</td>
                    <td>{this.itemPrice(item)}</td>
                </tr>
            ));
        }else{
            transaction =(
                <tr>
                    <td>There is currently nothing in your cart</td>
                    <td>0</td>
                </tr>
            );
        }

        // for(let i = 0; i < this.state.cart.length; i++){
        //     total_price += this.itemPrice(this.state.cart[i]);
        // }
        //
        // let total_row= (
        //     <tr>
        //         <td>ORDER TOTAL</td>
        //         <td>{total_price}</td>
        //     </tr>
        // );

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
                        {transaction}
                    </tbody>
                </Table>
            </div>
        );
    }

}

