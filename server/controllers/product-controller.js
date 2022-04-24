const { MongoClient } = require("mongodb");

//process.env.ATLAS_URI saveed in config.env
const client = new MongoClient(process.env.ATLAS_URI);

// The database to use
const dbName = "FoodOrderDB";

const products = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected correctly to server(Prodcuct collection)");

    const db = client.db(dbName);

    // Use the collection "Product"
    const col = db.collection("Product");

    // Find one document
    //Returns an array that contains all documents returned by the cursor.
    const myDoc = await col.find({}).toArray();
    res.json(myDoc);

    // console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.products = products;
