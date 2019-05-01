pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;

contract Register{

   string public vendorName;

   struct Item{
       string Name;
       uint256 Number;
       uint256 Price;
       uint256 Count;
   }

    // inventory of items available for sale
    mapping (uint => Item) inventory;
    mapping( uint => uint) inventorySold;
    uint256[] itemNumArray;
    uint256 _totalSales;

    constructor(string _vendorName)public {
        vendorName = _vendorName;
        //Basic inventory
        uint number;
        itemNumArray.push(number = createItemNumber("Cupcake"));
        inventory[number] = Item("Cupcake", number, 150, 10);
        inventorySold[number] = 0;
        itemNumArray.push(number = createItemNumber("Orange"));
        inventory[number] = Item("Orange", number, 50, 10);
        inventorySold[number] = 0;
        itemNumArray.push(number = createItemNumber("Meatball"));
        inventory[number] = Item("Meatball", number, 1000, 10);
        inventorySold[number] = 0;
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
    function addItem(string name, uint256 price, uint256 count) public{
        uint256 number = createItemNumber(name);
        inventory[number] = Item(name, number, price, count);
        itemNumArray.push(number);
        inventorySold[number] = 0;
    }

    //gets item by Name
    function getItemByName(string itemName)public view returns(string name, uint256 num, uint256 price, uint256 count){
        uint256 number = createItemNumber(itemName);
        name = inventory[number].Name;
        num = inventory[number].Number;
        price = inventory[number].Price;
        count = inventory[number].Count;
    }

    //returns item by ItemNumber
    function getItemByNumber(uint256 number)public view returns(string name, uint256 num, uint256 price, uint256 count){
        name = inventory[number].Name;
        num = inventory[number].Number;
        price = inventory[number].Price;
        count = inventory[number].Count;
    }

    //given a name returns a price
    function getPrice(string name)public view returns(uint256 price){
        uint256 num = createItemNumber(name);
        price = inventory[num].Price;
    }

    //with purchase update count, add price to total sales, keep track of inventory sold
    function purchase(string name)public returns(bool) {
        uint256 num = createItemNumber(name);
        require(inventory[num].Count > 0);
        if(inventory[num].Count > 0){
            inventory[num].Count = inventory[num].Count -1;
            _totalSales = _totalSales + inventory[num].Price;
            inventorySold[num] = inventorySold[num]+1;
            return true;
        }else{
            return false;
        }
    }

    //customer item lookup return name count price all items
    function itemLookup() public view returns(string){
       //loop through items to add to string
        string memory temp;
        for(uint i = 0; i < itemNumArray.length; i++){
            temp = append(temp, ", ", inventory[itemNumArray[i]].Name);
            temp = append(temp, ", ", appendUintToString(inventory[itemNumArray[i]].Price));
            temp = append(temp, ", ", appendUintToString(inventory[itemNumArray[i]].Count));
        }
        return temp;
    }

    //get inventory return name number price count all items
    function getInventory() public view returns(string){
        //loop through items add to string
        string memory temp;
        for(uint i = 0; i < itemNumArray.length; i++){
            temp = append(temp, ", ", inventory[itemNumArray[i]].Name);
            temp = append(temp, ", ", appendUintToString(inventory[itemNumArray[i]].Number));
            temp = append(temp, ", ", appendUintToString(inventory[itemNumArray[i]].Price));
            temp = append(temp, ", ", appendUintToString(inventory[itemNumArray[i]].Count));
        }
        return temp;
    }


    //cashout return totalsales, and inventory name, count all items
    //if item has had no sales "name, (blank)"
    function cashOut() public view returns(uint256 totalSales, string soldInventoryItems){
        totalSales = _totalSales;
        string memory temp;
        for(uint i = 0; i < itemNumArray.length; i++){
            temp = append(temp, ", ", inventory[itemNumArray[i]].Name);
            temp = append(temp, ", ", appendUintToString(inventorySold[itemNumArray[i]]));
        }
        soldInventoryItems = temp;
    }

    //given the name of an item returns the number sold
    function numberSold(string Name) public view returns(uint256 totalSold){
        totalSold = inventorySold[createItemNumber(Name)];
    }

    //helper
    //https://ethereum.stackexchange.com/questions/10811/solidity-concatenate-uint-into-a-string
    function appendUintToString(uint256 number) private pure returns (string str) {
        uint maxlength = 78;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        //number to bytes
        while (number != 0) {
            uint remainder = number % 10;
            number = number / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        uint h;
        for(h = 0; h < i; h++) {
            s[h] = reversed[i-1-h];
        }
        str = string(s);
    }

    //https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity
    function append(string a, string b, string c)private pure returns (string){
        return string(abi.encodePacked(a, b, c));
    }

    //gets item by Number
    //second way returns tuple(name, num, price, count)
    //uses pragma experimental ABIEncoderV2;
    //can change to get item by name if easier to use
    function getItemStruct(uint256 itemNumber)public view returns(Register.Item){
        return inventory[itemNumber];
    }
}