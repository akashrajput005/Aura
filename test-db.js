const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://akashsingh032004:%409097924757Ak@cluster0.1mysxm5.mongodb.net/aura?retryWrites=true&w=majority";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
