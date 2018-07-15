/* 
    Setting Up 
*/ 

let { Zilliqa } = require('zilliqa.js');

//For local testing, use URL = 'http://localhost:4201'
//To connect to the external network, use URL = 'https://api-scilla.zilliqa.com'

let zilliqa = new Zilliqa({
    nodeUrl: 'https://api-scilla.zilliqa.com'
});

let node = zilliqa.getNode();


// callback receives 2 parameters, error and result
function callback (err, data) {
    if (err || data.error) {
        console.log('Error')
    } else {
        console.log(data.result)
    }
}


// generate a private key and its public address. You can change these to point to your own wallet if you have. 
let privateKey = zilliqa.util.generatePrivateKey();
let address = zilliqa.util.getAddressFromPrivateKey(privateKey);
console.log("Mi dirección: " + address);
/* 
    APIs 
*/

node.getBalance({ address: address }, callback);

// transaction details
let txnDetails = {
    version: 0,
    nonce: 1,
    to: 'E8A67C0B1F19DF61A28E8E8FB5D830377045BCC7',
    amount: 0,
    gasPrice: 1,
    gasLimit: 1
};

// sign the transaction using util methods
let txn = zilliqa.util.createTransactionJson(privateKey, txnDetails);

// send the transaction to the node
node.createTransaction(txn, callback);

//Vemos de nuevo el balance
setTimeout(function() { 
    node.getBalance({ address: address }, callback); }, 
    5000);
