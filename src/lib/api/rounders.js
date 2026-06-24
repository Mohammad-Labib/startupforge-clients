
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const rounderParts = async (rounderId) => {
    const res = await fetch(`${baseUrl}/api/rounders?rounderId=${rounderId}`)
    return res.json();
}