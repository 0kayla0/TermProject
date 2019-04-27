pragma solidity ^0.4.25;

import "truffle/Assert.sol";

import "../contracts/Register.sol";



contract TestRegister {

    struct Item{
           string Name;
           uint256 Number;
           uint256 Price;
           uint256 Count;
       }

    function testInitialSetup()public{
        Register reg = new Register("lola");
        Assert.equal(reg.vendorName(), "lola", "Name is set");
    }

    //I can't figure out how to get the name, num, price back from
    //getitembynumber and getitembyname in the register contract
    //because I don't think solidity supports passing strings between
    //contracts they have to be byte32
    function testAddItem() public{
        Register reg = new Register("lola");
        reg.addItem("banana", 25, 10);
    }

}