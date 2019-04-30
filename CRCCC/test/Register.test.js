const Register = artifacts.require('./Register.sol');
const ganache = require("ganache-cli");


require('chai').should();

contract("Register contract", () => {

    let register;

    beforeEach(async () =>{
        register = await Register.new("Lake Street Market");
    });

    describe("Initial setup", () => {

        it("Has the correct vendor name", async () => {
            let vendorName = await register.vendorName();
            vendorName.should.equal("Lake Street Market");
        });

        it("Contains three items by default", async() => {

            let item1 = await register.getItemByName("Cupcake");
            let item2 = await register.getItemByName("Orange");
            let item3 = await register.getItemByName("Meatball");

            item1.name.should.equal("Cupcake");
            item1.price.toNumber().should.equal(150);
            item1.count.toNumber().should.equal(10);

            item2.name.should.equal("Orange");
            item2.price.toNumber().should.equal(50);
            item2.count.toNumber().should.equal(10);

            item3.name.should.equal("Meatball");
            item3.price.toNumber().should.equal(1000);
            item3.count.toNumber().should.equal(10);
        });

        it("Can add new items to the register to sell", async() => {
            await register.addItem("burrito", 12, 40);

            let newItem = await register.getItemByName("burrito");

            newItem.name.should.equal("burrito");
            newItem.price.toNumber().should.equal(12);
            newItem.count.toNumber().should.equal(40);

        });

    });

    describe("Perform transactions", () => {

        it("Update the inventory after a successful transaction", async () => {

            for(let i = 0; i < 9; i++) {
                await register.purchase("Cupcake");
            }

            let item = await register.getItemByName("Cupcake");

            item.count.toNumber().should.equal(1);

        });

        it("Should fail if there are not enough items in the inventory", async() => {

            for(let i = 0; i < 10; i++) {
                await register.purchase("Cupcake");
            }

            let item = await register.getItemByName("Cupcake");

            let result;

            try {
                await register.purchase("Cupcake");
                result = false;
            }catch(err){
                result = true;
            }

            result.should.equal(true);
        });

    });

});

