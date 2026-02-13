const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({
            take: 10,
            select: {
                id: true,
                clerkId: true,
                username: true,
                email: true,
            }
        });

        console.log('--- USER DIAGNOSTIC ---');
        console.log(`Found ${users.length} users in DB.`);

        users.forEach((user, i) => {
            console.log(`\nUser ${i + 1}:`);
            console.log(`Mongo ID: ${user.id}`);
            console.log(`Clerk ID: ${user.clerkId}`);
            console.log(`Username: ${user.username}`);
            console.log(`Email: ${user.email}`);
        });

    } catch (error) {
        console.error('Error during diagnostic:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
