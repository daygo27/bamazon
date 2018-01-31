var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //runSearch();
});

var buy = function(){
    connection.query("SELECT * FROM products", function(err, res){
      var table = new Table({
          head: ["ID", "Product Name", "Department", "Price", "Quantity"]
      });

      //displaying items
      console.log("Welcome to the Dungeon Store, here is what's for sale:");
      console.log("======================================================");
      for (var i=0; i<res.length; i++) {
        table.push([res[i].id, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]);
    }
      console.log("------------------------------------------------------");
      console.log(table.toString());
      inquirer.prompt([{
          name: "itemId",
          type: "input",
          message: "What is the item you would like to purchase? (Enter by Item ID)",
          validate: function(value){
            if(isNaN(value) == false) {
                return true;
            } else{
              return false;
            }
          }
      }, {
          name: "Quantity",
          type: "input",
          message: "How many of this specific item would you like to purchase?",
          validate: function(value){
            if (isNaN(value) == false) {
                   return true;

          }else {
            return false;
          }


      }
    }]).then(function(response) {
      var inputId = response.itemId - 1;;
      var inputProduct = res[inputId];
      var inputQuantity = response.Quantity;
      if (inputQuantity < res[inputId].StockQuantity){
        console.log("Your total for " + "(" + response.Quantity + ")" + " - " + res[inputId].ProductName + " is: " + "$" + res[inputId].Price * inputQuantity);
        connection.query("UPDATE products SET ? WHERE ?", [{
                    StockQuantity: res[inputId].StockQuantity - inputQuantity
                }, {
                    id: res[inputId].id
                }], function(err, res) {
                    //console.log(err);
                    buy();
                });

        } else {
            console.log("Apologies, insufficient quanity at this time. Available amount is " + res[inputId].StockQuantity + " in our Inventory.");
            buy();
                  }
              })
          })
      }
      buy();
