/* 
    Setting Up 
*/ 

let { Zilliqa } = require('zilliqa.js');
var Promise = require('promise');
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
let miDireccion = zilliqa.util.getAddressFromPrivateKey(privateKey);
console.log("Mi dirección: " + miDireccion);
/* 
    APIs 
*/

node.getBalance({ address: miDireccion }, callback);

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

var enviada = false;
// send the transaction to the node


node.createTransaction(txn, function(err, data){
    //enviada = !(err || data.error);
    callback(err, data);
    var txId = data.result;
    node.getBalance({ address: miDireccion }, function (err, data) {
        console.log("Hemos enviado la transacción.");
        if (err || data.error) {
            console.log('Error')
        } else {
            console.log(data.result)
        }
    });
    node.getTransaction({ txHash: txId }, function(err, data) {
        if (err || data.result.error || !data.result['ID']) {
            console.log(err || data.result.error);
        } else {
            console.log("Info de la transacción.")
            console.log(data.result)
        }
    });
});

/*
var actualizarBalance = function(transactionEnviada){
    transactionEnviada
        .then(function(dirección){
            console.log("Hemos enviado la transacción.")
            node.getBalance({ address: direccion }, callback);
        })
        .catch(function(error){
            console.log(error.message);
        })
};
actualizarBalance();
*/
//Vemos de nuevo el balance
setTimeout(function() { 
    console.log("Segunda llamada al balance:")
    node.getBalance({ address: miDireccion }, callback); }, 
    5000);

