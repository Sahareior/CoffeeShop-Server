const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

// MongoDB connection URI
const uri = `mongodb+srv://awesome:zBRLpodNN0PFL0Tx@cluster0.j0rll9s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to the database and set up the route
async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Define the GET route for fetching coffees
        app.get('/coffees', async (req, res) => {
            try {
                const coffeesCollection = client.db("test").collection("coffees");
                const coffees = await coffeesCollection.find({}).toArray(); // Fetch all documents in the coffees collection
                res.json(coffees); // Send the fetched coffees as a JSON response
            } catch (error) {
                console.error("Error fetching coffees:", error);
                res.status(500).json({ error: 'An error occurred while fetching coffees.' });
            }
        });

    } finally {
        // You can optionally close the client connection here or keep it open for subsequent requests
        // await client.close();
    }
}

run().catch(console.dir);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
