
 "use client"
import StatCard from '@/components/Dashbosrd/StatCard';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const FounderHomePage = () => {
  
    const {data: session, isPending} = useSession();

    if(isPending){
        return <div>Loading...</div>
    }

    const user = session?.user;

    return (
        <div>
            <h1 className='text-2xl font-sm'>This is a Founder page, {user.name}</h1>
            <StatCard></StatCard>
        </div>
    );
};

export default FounderHomePage;