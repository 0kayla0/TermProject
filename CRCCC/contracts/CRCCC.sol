pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Register.sol";

//This will be the CryptoRamCashCoinChain token contract
contract CRCCC is ERC20, ERC20Detailed{

    //For now I think we said that there is one register per vendor
    //If that assumption changes then it could be a mapping of address to an index space that contains an array of Registers
    mapping (string => address) studentAccounts;

    mapping (string => address) RegisterAddress;
    mapping (string => Register) RegisterAccounts;

    uint8 private DECIMALS = 2;

    constructor() ERC20Detailed("Crypto Ram Cash Coin Chain", "CRCCC", DECIMALS) public{
//        owner = msg.sender;
    }

    function registerNewStudent(string name) public{
        studentAccounts[name] = msg.sender;
        _mint(msg.sender,300);
    }

    //TODO maybe the manager needs to pay into the contract before they can spawn a new register
    function spawnNewRegister(string vendorID) public payable returns(bool){
        RegisterAccounts[vendorID] = new Register();
    }

    //Assumption is that only one item can be purchased at a time
    function purchaseItem(string vendorID, string itemName) public returns(bool){

        //Select the register that the student is looking to make a purchase at
        Register register = RegisterAccounts[vendorID];

        //Obtain the price of the item that the student wants to purchase
        //TODO capture the return of the item

        //assert that the user has the amount of CRCCC that the vendor calls for for that item

        //Initiate a transfer from the students account and transfer the coins to the registers studentAccounts
        bool result = transfer(RegisterAddress[vendorID], 3);

        //determine the success of the transfer => this could fail if the student does not have enough money
        if(result == true){
            //logic here
        }
        //based upon success update the register and its inventory
        return result;
    }
}
