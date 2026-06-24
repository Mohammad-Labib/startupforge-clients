"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createFounder = async (newFounderData) =>{
    const res = await fetch(`${baseUrl}/api/founders`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFounderData)
    });

    return res.json();
}