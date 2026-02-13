const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const events = await prisma.event.findMany({
            take: 5,
            include: {
                organizer: true,
                category: true,
            }
        });

        console.log('--- DATABASE DIAGNOSTIC ---');
        console.log(`Found ${events.length} events in DB.`);

        events.forEach((event, i) => {
            console.log(`\nEvent ${i + 1}:`);
            console.log(`ID: ${event.id}`);
            console.log(`Title: ${event.title}`);
            console.log(`Organizer: ${event.organizer ? event.organizer.username : 'MISSING'}`);
            console.log(`Category: ${event.category ? event.category.name : 'MISSING'}`);
            console.log(`Start: ${event.startDateTime}`);
            console.log(`End: ${event.endDateTime}`);
        });

    } catch (error) {
        console.error('Error during diagnostic:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
