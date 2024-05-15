const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
  const uri = "your_mongodb_connection_string"; // replace with your MongoDB connection string
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('animeDatabase');
    const collection = database.collection('animeCollection');

    // Read data from JSON file
    const animeData = JSON.parse(fs.readFileSync('anime_data.json', 'utf8'));

    // Insert data into collection
    const result = await collection.insertMany(animeData);

    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
