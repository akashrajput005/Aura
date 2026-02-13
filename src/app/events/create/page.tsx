import EventForm from "@/components/shared/EventForm";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CreateEvent = async () => {
    const { userId: clerkId } = await auth();

    if (!clerkId) redirect("/sign-in");

    let user = await getUserByClerkId(clerkId);

    // If user doesn't exist in DB (webhook delay/failure), JIT Sync from Clerk
    if (!user) {
        const clerkUser = await currentUser();
        if (clerkUser) {
            user = await db.user.create({
                data: {
                    clerkId: clerkUser.id,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
                    firstName: clerkUser.firstName,
                    lastName: clerkUser.lastName,
                    photo: clerkUser.imageUrl,
                }
            });
        } else {
            redirect("/?error=user_auth_failed");
        }
    }

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left text-white px-6 md:px-12">Create Event</h3>
            </section>

            <div className="wrapper my-8 px-6 md:px-12">
                <EventForm userId={user.id} type="Create" />
            </div>
            <Footer />
        </div>
    );
};

export default CreateEvent;
