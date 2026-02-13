const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                buyer: true,
                event: true,
            }
        });

        console.log('--- ORDER DIAGNOSTIC ---');
        console.log(`Found ${orders.length} recent orders in DB.`);

        orders.forEach((order, i) => {
            console.log(`\nOrder ${i + 1}:`);
            console.log(`ID: ${order.id}`);
            console.log(`Stripe/Razorpay ID: ${order.stripeId}`);
            console.log(`Event: ${order.event ? order.event.title : 'MISSING'}`);
            console.log(`Buyer: ${order.buyer ? order.buyer.username : 'MISSING'}`);
            console.log(`Amount: ${order.totalAmount}`);
            console.log(`Created: ${order.createdAt}`);
        });

    } catch (error) {
        console.error('Error during diagnostic:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
