import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/privacy',
    '/terms',
    '/refund',
    '/contact'
]);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
