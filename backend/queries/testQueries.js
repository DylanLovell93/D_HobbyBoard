//import the DB variable that we'll be making queries to
const db = require("../db/dbConfig");

//Create a function that returns a database query
// async, since it contains a db call
// try the query,
const testQuery = async () => {
  //try the query
  try {
    //fetch data from the database
    const test = db.one("SELECT * FROM testTable WHERE test_id=1");
    //return it
    return test;
  } catch (err) {
    //if the query fails, returns the error
    return err;
  }
};

//export function
module.exports = { testQuery };
