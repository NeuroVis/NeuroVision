export default async function Page({
    params
                             }: {
    params: Promise<Record<string, string[]>>
}) {
    const {network} = await params;

    return <>{network[0]}</>
}