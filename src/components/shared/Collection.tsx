import React from "react";
import Card from "./Card";
// import Pagination from "./Pagination";

type CollectionProps = {
    data: any[];
    emptyTitle: string;
    emptyStateSubtext: string;
    limit: number;
    page: number | string;
    totalPages?: number;
    urlParamName?: string;
    collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {data.map((event) => {
                            const hasOrderLink = collectionType === "Events_Organized";
                            const hidePrice = collectionType === "My_Tickets";

                            return (
                                <li key={event.id} className="flex justify-center">
                                    <Card
                                        event={event}
                                        hasOrderLink={hasOrderLink}
                                        hidePrice={hidePrice}
                                    />
                                </li>
                            );
                        })}
                    </ul>

                    {/* {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )} */}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[300px] w-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 py-28 text-center backdrop-blur-sm">
                    <div className="p-4 rounded-full bg-primary/10 mb-2">
                        <svg className="w-12 h-12 text-primary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="p-bold-20 md:h3-bold text-white">{emptyTitle}</h3>
                    <p className="p-regular-14 text-white/50 max-w-md mx-auto">{emptyStateSubtext}</p>
                </div>
            )}
        </>
    );
};

export default Collection;
