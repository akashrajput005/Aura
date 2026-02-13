import { getAllEvents } from "@/lib/actions/event.actions";
import Collection from "./Collection";

export default async function CommunityEvents({ searchText, category, page }: { searchText: string, category: string, page: number }) {
    const events = await getAllEvents({
        query: searchText,
        category,
        page,
        limit: 6,
    });

    return (
        <Collection
            data={events?.data || []}
            emptyTitle="No Community Events"
            emptyStateSubtext="Switch to 'Aura Discovery' or create your own event!"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages || 0}
        />
    );
}
