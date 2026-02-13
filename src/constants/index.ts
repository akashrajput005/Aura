export const headerLinks = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Create Event',
        route: '/events/create',
    },
    {
        label: 'Aura Galaxy',
        route: '/profile',
    },
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    currency: 'INR',
    isFree: false,
    url: '',
}
