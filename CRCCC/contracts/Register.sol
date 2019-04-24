pragma solidity ^0.4.25;

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
    uint256[] itemNumArray;


      constructor(string _vendorName)public {
            vendorName = _vendorName;
            //Basic inventory
            uint number;
            itemNumArray.push(number = createItemNumber("Cupcake"));
            inventory[number] = Item("Cupcake ", number, 150);
            itemNumArray.push(number = createItemNumber("Orange"));
            inventory[number] = Item("Orange ", number, 50);
            itemNumArray.push(number = createItemNumber("Meatball"));
            inventory[number] = Item("Meatball ", number, 1000);
        }


    //creates itemNumber from name of item
    //converts to all lowercase
    //https://ethereum.stackexchange.com/questions/10932/how-to-convert-string-to-int
    //https://gist.github.com/ottodevs/c43d0a8b4b891ac2da675f825b1d1dbf
    function createItemNumber(string name) internal pure returns (uint256 number){
        bytes memory b = bytes(name);
        for (uint i = 0; i < b.length; i++) {
            //if uppercase add 32 so lowercase
            if((b[i]>=65)&&(b[i]<=90)){
                b[i] = bytes1(int(b[i])+32);
            }
            uint c = uint(b[i]);
            number = c + number;
        }
        return number;
    }


    //adds an item to the inventory
    //future improvement --> only manager
    function addItem(string name, uint256 price) public{
        uint256 number = createItemNumber(name);
        inventory[number] = Item(name, number, price);
        itemNumArray.push(number);

    }


     //gets item by Name
      function getItemByName(string itemName)public view returns(string name, uint256 num, uint256 price){
            uint256 number = createItemNumber(itemName);
            name = inventory[number].Name;
            num = inventory[number].Number;
            price = inventory[number].Price;
        }

      function getItemByNumber(uint256 number)public view returns(string name, uint256 num, uint256 price){
            name = inventory[number].Name;
            num = inventory[number].Number;
            price = inventory[number].Price;
       }

}