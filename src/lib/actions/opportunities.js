"use server"; 

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_DB_URI;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function createOpportunity(processedData) {
    try {
   
        await client.connect();
        
        const database = client.db("startup_forge");
        const opportunityCollection = database.collection("opportunities");

     
        const result = await opportunityCollection.insertOne({
            ...processedData,
            status: "Active", 
            createdAt: new Date() 
        });

        return { success: true, id: result.insertedId };

    } catch (error) {
        console.error("Error creating opportunity in DB:", error);
        return { success: false, error: error.message };
    } 
    
}