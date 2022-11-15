const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://projcts:MSyLqqqwNwqvFqoS@cluster0.fznm9xj.mongodb.net/final_froject');
  console.log("connect mongoose");
  
}