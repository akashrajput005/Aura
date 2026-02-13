const { fetchExternalEvents } = require('./src/lib/discovery');
require('dotenv').config();

async function testDiscovery() {
    console.log("Testing Discovery for Mumbai...");
    const mumbaiEvents = await fetchExternalEvents({ city: 'Mumbai' });
    console.log(`Found ${mumbaiEvents.length} events for Mumbai.`);
    if (mumbaiEvents.length > 0) {
        console.log("First event:", mumbaiEvents[0].title);
    }

    console.log("\nTesting Discovery for Delhi (API check)...");
    const delhiEvents = await fetchExternalEvents({ city: 'Delhi' });
    console.log(`Found ${delhiEvents.length} events for Delhi.`);

    console.log("\nDiscovery Test Complete.");
}

testDiscovery();
