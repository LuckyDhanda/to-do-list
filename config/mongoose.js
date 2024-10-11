// require library
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// connect to database
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/to_do_list');
}

// acquire the connection (if it is successfull)
const db = mongoose.connection;

// if it's up and running then print message
db.once('open', ()=>{
    console.log("successfully connected to database")
})