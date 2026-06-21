import React from 'react';

// ১. সিঙ্গেল কার্ড কম্পোনেন্ট (StatCard)
function StatCard({ title, description, value, percentage, timeframe, icon: Icon, borderColor }) {
  const borderColors = {
    blue: 'border-t-blue-500',
    orange: 'border-t-orange-500',
    green: 'border-t-green-500'
  };

  const textColors = {
    blue: 'text-blue-600',
    orange: 'text-orange-500',
    green: 'text-emerald-600'
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border-t-4 ${borderColors[borderColor] || 'border-t-gray-500'} flex flex-col justify-between min-h-[220px] w-[350] transition-all hover:shadow-md`}>
      <div>
        <h3 className="text-gray-950 font-bold text-lg tracking-tight">{title}</h3>
        <p className="text-gray-400 text-xs mt-1 font-medium">{description}</p>
      </div>

      <div className="my-4 flex items-baseline gap-1">
        <span className={`text-4xl font-extrabold tracking-tight ${textColors[borderColor] || 'text-gray-900'}`}>
          {value}
        </span>
        <span className={`text-sm font-bold align-super ${textColors[borderColor] || 'text-gray-900'}`}>↗</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
          <span>▲</span>
          <span>{percentage}</span>
          <span className="text-gray-400 font-medium ml-1">{timeframe}</span>
        </div>

        {Icon && (
          <div className="text-gray-400 p-2 bg-gray-50 rounded-lg">
            <Icon className="w-6 h-6 stroke-[1.5]" />
          </div>
        )}
      </div>
    </div>
  );
}


export default function DashboardCardsGroup() {
 
  const cardData = [
    {
      title: "Total Opportunities",
      description: "Active Leads & Potential Deals",
      value: "12,450",
      percentage: "+8.1%",
      timeframe: "vs last month",
      borderColor: "blue",
      icon: null 
    },
    {
      title: "Total Applications",
      description: "Applications received for open roles",
      value: "6,783",
      percentage: "+5.2%",
      timeframe: "this week",
      borderColor: "orange",
      icon: null 
    },
    {
      title: "Accepted Members",
      description: "Onboarded and Active Members",
      value: "2,911",
      percentage: "+11%",
      timeframe: "new members",
      borderColor: "green",
      icon: null 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cardData.map((card, index) => (
        <StatCard 
          key={index}
          title={card.title}
          description={card.description}
          value={card.value}
          percentage={card.percentage}
          timeframe={card.timeframe}
          borderColor={card.borderColor}
          icon={card.icon}
        />
      ))}
    </div>
  );
}