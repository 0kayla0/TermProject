import React,{Component} from 'react';
import CurrentVendor from "./Components/CurrentVendor";
import CloseRegister from "./Components/CloseRegister";
import SpawnRegister from "./Components/SpawnRegister";
import PurchaseItem from "./Components/PurchaseItem";
import RegisterStudent from "./Components/RegisterStudent";
import ItemsList from "./Components/ItemsList";
import StudentBalance from "./Components/StudentBalance";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        acct_address : "", //will need to query
        acct_name : "",
        cur_register : "",
        available_reg : [] //will need to query the contract to find avaiable
    };
  }

  render(){
    return (
        <div>
          <p>Lets get this bread</p>
          <CurrentVendor/>
          <SpawnRegister/>
          <PurchaseItem/>
          <RegisterStudent/>
          <ItemsList/>
          <StudentBalance/>
          <CloseRegister/>
        </div>
    );
  }

}

