import EventForm from "@/components/shared/EventForm";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getEventById } from "@/lib/actions/event.actions";
import { redirect } from "next/navigation";

const UpdateEvent = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const { id } = params;
    const { userId } = await auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserByClerkId(userId);
    const event = await getEventById(id);

    if (event.organizerId !== user.id) redirect("/");

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left text-white px-6 md:px-12">Update Event</h3>
            </section>

            <div className="wrapper my-8 px-6 md:px-12">
                <EventForm userId={user.id} type="Update" event={event} eventId={event.id} />
            </div>
            <Footer />
        </div>
    );
};

export default UpdateEvent;
