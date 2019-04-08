pragma solidity ^0.4.21;

contract Register {
   
   address public manager;
   
   
   
   struct Item{
       string Name;
       uint256 Number;
       uint256 Price;
   }
   
    // invventory of items available for sale    
    mapping (uint => Item) inventory;  
    
    //can this be the item.Number and mapped by the item number? easier lookup and records like an array of ints
    uint count = 0;
    
    //adds an item to the inventory
    //future improvment --> only manager
    function addItem(string name, uint256 num, uint256 price) public returns(bool){
        inventory[count] = Item(name, num, price);
        count++;
    } 
  
  
  
    //gets item by order added to inventory need to know the count
    function getItemByCount(uint count)public view returns(string name, uint256 num, uint256 price){
        name = inventory[count].Name;
        num = inventory[count].Number;
        price = inventory[count].Price;
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
