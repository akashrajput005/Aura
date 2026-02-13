import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Categories
    const categories = [
        { name: 'Music' },
        { name: 'Nightlife' },
        { name: 'Workshops' },
        { name: 'Wellness' },
        { name: 'Tech' },
        { name: 'Art & Culture' },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        })
    }

    console.log('Categories seeded!')

    // Find a user to act as organizer (or create a system user)
    let user = await prisma.user.findFirst()
    if (!user) {
        user = await prisma.user.create({
            data: {
                clerkId: 'system_user',
                email: 'hello@aura.com',
                username: 'Aura Official',
                firstName: 'Aura',
                lastName: 'Guardian',
                photo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
            }
        })
    }

    const musicCat = await prisma.category.findUnique({ where: { name: 'Music' } })
    const techCat = await prisma.category.findUnique({ where: { name: 'Tech' } })
    const artCat = await prisma.category.findUnique({ where: { name: 'Art & Culture' } })

    // Seed some Real-world like events for India
    const events = [
        {
            title: 'Zomaland by Zomato - Mumbai',
            description: 'The ultimate food and entertainment carnival is back! Join us for a weekend of delicious food, games, and live music performance by top artists.',
            location: 'Jio World Garden, BKC, Mumbai',
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
            startDateTime: new Date('2026-03-20T12:00:00Z'),
            endDateTime: new Date('2026-03-21T22:00:00Z'),
            price: '699',
            isFree: false,
            url: 'https://zomaland.com',
            categoryId: musicCat?.id!,
            organizerId: user.id,
        },
        {
            title: 'DevFest 2026 Bangalore',
            description: 'The largest Google Developer Groups event in India. Learn about the latest in AI, Cloud, and Web technologies from industry experts.',
            location: 'KTPO Whitefield, Bangalore',
            imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f3?q=80&w=2070&auto=format&fit=crop',
            startDateTime: new Date('2026-04-05T09:30:00Z'),
            endDateTime: new Date('2026-04-05T18:00:00Z'),
            price: '0',
            isFree: true,
            url: 'https://devfest.gdg.com',
            categoryId: techCat?.id!,
            organizerId: user.id,
        },
        {
            title: 'The Lil Flea - Delhi Edition',
            description: 'A celebration of creativity, curated shops, indie music, and amazing food. The perfect weekend getaway for the Delhi creative community.',
            location: 'Major Dhyan Chand National Stadium, Delhi',
            imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
            startDateTime: new Date('2026-03-15T10:00:00Z'),
            endDateTime: new Date('2026-03-17T21:00:00Z'),
            price: '300',
            isFree: false,
            url: 'https://thelilflea.com',
            categoryId: artCat?.id!,
            organizerId: user.id,
        }
    ]

    for (const event of events) {
        await prisma.event.create({
            data: event
        })
    }

    console.log('Events seeded!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
