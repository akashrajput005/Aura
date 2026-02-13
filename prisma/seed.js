require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')
    console.log('DB URL check:', process.env.DATABASE_URL ? 'FOUND' : 'MISSING')

    const categoryNames = [
        'Music', 'Nightlife', 'Workshops', 'Wellness', 'Tech', 'Art & Culture', 'Sports', 'Networking'
    ]

    console.log('Seeding categories...')
    for (const name of categoryNames) {
        try {
            await prisma.category.upsert({
                where: { name },
                update: {},
                create: { name }
            })
        } catch (err) {
            console.warn(`Failed to seed category ${name}:`, err.message)
        }
    }
    console.log('Categories synced.')

    let user = await prisma.user.findFirst({
        where: { email: 'hello@aura.com' }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                clerkId: 'system_auth_id',
                email: 'hello@aura.com',
                username: 'aura_official',
                firstName: 'Aura',
                lastName: 'Admin',
                photo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1080',
            }
        })
        console.log('System user created.')
    }

    const musicCat = await prisma.category.findUnique({ where: { name: 'Music' } })
    const techCat = await prisma.category.findUnique({ where: { name: 'Tech' } })

    const sampleEvents = [
        {
            title: 'Zomaland - Mumbai Edition',
            description: 'The ultimate food and entertainment carnival is back!',
            location: 'Jio World Garden, BKC, Mumbai',
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1080',
            startDateTime: new Date('2026-03-15T10:00:00Z'),
            endDateTime: new Date('2026-03-16T22:00:00Z'),
            price: '499',
            isFree: false,
            url: 'https://zomato.com/zomaland',
            categoryId: musicCat.id,
            organizerId: user.id
        },
        {
            title: 'Google I/O Extended - Bangalore',
            description: 'Join the local developer community.',
            location: 'Google Signature, Bangalore',
            imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f3?q=80&w=1080',
            startDateTime: new Date('2026-05-20T09:00:00Z'),
            endDateTime: new Date('2026-05-20T18:00:00Z'),
            price: '0',
            isFree: true,
            url: 'https://events.google.com',
            categoryId: techCat.id,
            organizerId: user.id
        }
    ]

    console.log('Seeding sample events...')
    for (const eventData of sampleEvents) {
        try {
            await prisma.event.create({
                data: eventData
            })
        } catch (err) {
            console.warn(`Failed to seed event ${eventData.title}:`, err.message)
        }
    }

    console.log('Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('CRITICAL SEED ERROR:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
