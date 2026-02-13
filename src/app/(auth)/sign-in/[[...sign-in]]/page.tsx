import { SignIn } from "@clerk/nextjs";

export default async function Page(props: { params: Promise<{ 'sign-in': string[] }> }) {
    const params = await props.params;
    return (
        <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
            <SignIn />
        </div>
    );
}
