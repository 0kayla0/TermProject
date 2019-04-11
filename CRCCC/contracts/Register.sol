pragma solidity ^0.4.21;

contract Register {
   
   address public manager;
   string public vendorName;

   struct Item{
       string Name;
       uint256 Number;
       uint256 Price;
   }
   
    // inventory of items available for sale
    mapping (uint => Item) inventory;  

    //NOTE: do we need this, since we use this to index into the inventory and that is what is given as a param @ ln 34
    //can this be the item.Number and mapped by the item number? easier lookup and records like an array of ints
    uint count = 0;

    constructor(string _vendorName){
        vendorName = _vendorName;
    }

    //adds an item to the inventory
    //future improvment --> only manager
    function addItem(string name, uint256 num, uint256 price) public returns(bool){
        inventory[count] = Item(name, num, price);
        count++;
    } 
  
  
  
    //gets item by order added to inventory need to know the count
    function getItemByCount(uint _count)public view returns(string name, uint256 num, uint256 price){
        name = inventory[_count].Name;
        num = inventory[_count].Number;
        price = inventory[_count].Price;
    }
    
    
    //gets item by Name
    // function getItemByName(string Name)public view returns(string name, uint256 num, uint256 price){
        //if mapped by item.Number this changes
   // }
    
    
    //gets item by Number 
    // function getItemByNumber(uint256 number)public view returns(string name, uint256 num, uint256 price){
        //might change
    //}
    
   
    
    
  
}
