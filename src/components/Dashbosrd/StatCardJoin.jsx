import DashboardCard from '@/components/DashboardCard';
// Example imports: swap these out with your actual HeroUI or GravityUI icon imports
import { ChartBarIcon, DocumentTextIcon, UsersIcon } from '@heroicons/react/24/outline'; 

export default function StatCardJoin() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Opportunities */}
          <DashboardCard 
            title="Total Opportunities"
            description="Active Leads & Potential Deals"
            value="12,450"
            percentage="+8.1%"
            timeframe="vs last month"
            borderColor="blue"
            icon={ChartBarIcon} 
          />

          {/* Card 2: Total Applications */}
          <DashboardCard 
            title="Total Applications"
            description="Applications received for open roles"
            value="6,783"
            percentage="+5.2%"
            timeframe="this week"
            borderColor="orange"
            icon={DocumentTextIcon} 
          />

          {/* Card 3: Accepted Members */}
          <DashboardCard 
            title="Accepted Members"
            description="Onboarded and Active Members"
            value="2,911"
            percentage="+11%"
            timeframe="new members"
            borderColor="green"
            icon={UsersIcon} 
          />

        </div>
      </div>
    </div>
  );
}