pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Register.sol";

//This will be the CryptoRamCashCoinChain token contract
contract CRCCC is ERC20, ERC20Detailed{

    //This mapping holds all of the student accounts within the system
    mapping (string => address) studentAccounts;

    //Allows us to get the register instance via name
    mapping (string => address) RegisterAddress;

    //This is the address for the register for when a transaction is happening with a student
    mapping (string => Register) RegisterAccounts;

    //This is the account of the manager that owns the register. This is the account where all the crccc will
    //go to when the register closes for the day
    mapping (string => address) RegisterOwner;

    //This will hold the string representation of the end of day reports for a register once it has been closed.
    mapping (string => string) RegisterReports;

    constructor() ERC20Detailed("Crypto Ram Cash Coin Chain", "CRCCC", 2) public{ }

    //This will create a new student to the token contract and give them a balance of 300 at the start
    function registerNewStudent(string name) public returns(bool){

        //Ensures that the student hasn't been previously registered with the contract
        require(studentAccounts[name] == 0x0);

        studentAccounts[name] = msg.sender;
        _mint(msg.sender,300);

    }

    //This will allow a manager to spawn a new register by providing the name of the venue/vendor name
    function spawnNewRegister(string vendorID) public payable returns(bool){

        //Ensure that the register doesnt already exist
        require(RegisterAddress[vendorID] == 0x0);

        address new_reg = address(new Register(vendorID));

        //RegisterAccounts[vendorID] = new_reg;
        RegisterAddress[vendorID] = new_reg;
        RegisterOwner[vendorID] = msg.sender;

    }

    //Assumption is that only one item can be purchased at a time
    function purchaseItem(string vendorID, string itemName) public returns(bool){

        //Select the register that the student is looking to make a purchase at
        Register register = RegisterAccounts[vendorID];

        //Obtain the price of the item that the student wants to purchase
        uint256 price = register.getPrice(itemName);

        //assert that the user has the amount of CRCCC that the vendor calls for for that item
        require(balanceOf(msg.sender) >= price);

        //Initiate a transfer from the students account and transfer the coins to the registers studentAccounts
        bool result = transfer(RegisterAddress[vendorID], price);

        //determine the success of the transfer => this could fail if the student does not have enough money
        if(result == true){

            bool  regTransaction = register.purchase(itemName);

            //This is in the event where the vendor does not have enough of the item to instock
            //to sell to the customer
            if( regTransaction == false){

                //TODO revert the transfer of the transaction. Refund the customer the amount of tokens moved

                return false;
            }
        }
        //based upon success update the register and its inventory
        return result;
    }

    //TODO Remove this function and alter the mocha tests that use this function
    function purchaseItem(string vendorID, uint256 price) public returns(bool){
        require(balanceOf(msg.sender) >= price);
        return transfer(RegisterAddress[vendorID], price);
    }

    //This function is responsible for:
    //  * transferring the tokens from the register to the managers account
    //  * populating the register report into the mapping for that register
    function closeRegister(string vendorID) public returns(bool){

        //This function can only be performed by the manager of the register
        require(RegisterOwner[vendorID] == msg.sender);

        //FIXME replace this with the cash out function of the Register Contract
        uint256 reg_balance = balanceOf(RegisterAddress[vendorID]);
        _transfer(RegisterAddress[vendorID], msg.sender, reg_balance);

    }

    function viewRegisterReport(string vendorID) public view {
        //FIXME Revise to ensure functionality
        Register register = RegisterAccounts[vendorID];
        register.getInventory();
    }

    //Debugging functions used in mocha tests

    function viewRegisterAddress(string vendorID) public view returns(address){
        return RegisterAddress[vendorID];
    }

    function viewRegisterBalance(string vendorID) public view returns(uint256){
        return balanceOf(RegisterAddress[vendorID]);
    }


}
