import Search from '@/components/shared/Search'
import { getOrdersByEvent } from '@/lib/actions/order.actions'
import { formatDateTime, formatPrice } from '@/lib/utils'
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Orders = async (props: { searchParams: Promise<any> }) => {
    const searchParams = await props.searchParams;
    const eventId = (searchParams?.eventId as string) || ''
    const searchText = (searchParams?.query as string) || ''

    const orders = await getOrdersByEvent({ eventId, searchString: searchText })

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left text-white px-6 md:px-12">Orders</h3>
            </section>

            <section className="wrapper mt-8 px-6 md:px-12">
                <Search placeholder="Search buyer name..." />
            </section>

            <section className="wrapper overflow-x-auto my-8 px-6 md:px-12">
                <table className="w-full border-collapse border-white/10 bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border">
                    <thead>
                        <tr className="p-medium-14 border-b border-white/10 text-muted-foreground text-left">
                            <th className="min-w-[250px] py-4 px-6 text-white font-bold">Order ID</th>
                            <th className="min-w-[200px] flex-1 py-4 px-6 text-white font-bold">Event Title</th>
                            <th className="min-w-[150px] py-4 px-6 text-white font-bold">Buyer</th>
                            <th className="min-w-[100px] py-4 px-6 text-white font-bold">Created</th>
                            <th className="min-w-[100px] py-4 px-6 text-white font-bold">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length === 0 ? (
                            <tr className="border-b border-white/10">
                                <td colSpan={5} className="py-20 text-center text-muted-foreground italic">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            <>
                                {orders &&
                                    orders.map((row: any) => (
                                        <tr
                                            key={row.id}
                                            className="p-regular-14 lg:p-regular-16 border-b border-white/10 text-white/90 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="min-w-[250px] py-4 px-6 text-primary">{row.stripeId}</td>
                                            <td className="min-w-[200px] flex-1 py-4 px-6">{row.event?.title}</td>
                                            <td className="min-w-[150px] py-4 px-6">{row.buyer?.firstName} {row.buyer?.lastName}</td>
                                            <td className="min-w-[100px] py-4 px-6">
                                                {formatDateTime(row.createdAt).dateTime}
                                            </td>
                                            <td className="min-w-[100px] py-4 px-6">
                                                {formatPrice(row.totalAmount)}
                                            </td>
                                        </tr>
                                    ))}
                            </>
                        )}
                    </tbody>
                </table>
            </section>
            <Footer />
        </div>
    )
}

export default Orders
