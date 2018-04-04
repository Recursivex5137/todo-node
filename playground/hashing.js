const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 4
};

let token = jwt.sign(data, '123abs');
console.log(token);
let decoded = jwt.verify(token, '123abs');
console.log('decoded', decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// let data = {
//   id: 4
// };

// // Hash
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data Same');
// } else {
//   console.log('Data not Same');
// }
