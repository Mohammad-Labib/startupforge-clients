"use client"

// CardBody সরিয়ে শুধু Card, CardHeader, CardFooter, এবং Button রাখা হয়েছে
import { Card, CardHeader, CardFooter, Button } from "@heroui/react";

// Gravity UI Icons থেকে প্রাসঙ্গিক আইকনগুলো ইম্পোর্ট করা হয়েছে
import { Rocket, FileArrowUp, Heart, ArrowUpRightFromSquare } from "@gravity-ui/icons";

// স্টার্টআপ কার্ডের ডাইনামিক ডেটা অ্যারে
const featuredStartups = [
  {
    id: 1,
    name: "EduSmart",
    founder: "Anik Rahman",
    industry: "EdTech",
    teamSize: "2 Developers needed",
    icon: <Rocket size={24} className="text-orange-500" />,
    bgColor: "bg-orange-50/50"
  },
  {
    id: 2,
    name: "GreenGrid",
    founder: "Sadia Islam",
    industry: "Clean Energy",
    teamSize: "1 Marketer needed",
    icon: <FileArrowUp size={24} className="text-green-500" />,
    bgColor: "bg-green-50/50"
  },
  {
    id: 3,
    name: "HealthLink",
    founder: "David Chen",
    industry: "HealthTech",
    teamSize: "3 Researchers needed",
    icon: <Heart size={24} className="text-red-500" />,
    bgColor: "bg-red-50/50"
  }
];

function FeaturedStartupsCard() {
  return (
    <section className="w-full bg-gray-50/50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* সেকশন হেডার */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Startups
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Explore the latest innovations and join promising startup teams.
          </p>
        </div>

        {/* কার্ড গ্রিড লেআউট */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredStartups.map((startup) => (
            <Card 
              key={startup.id} 
             
              className={`border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 ${startup.bgColor}`}
            >
              {/* কার্ডের উপরের অংশ: নাম ও আইকন */}
              <CardHeader className="flex gap-3 px-5 pt-5 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100">
                  {startup.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    {startup.name}
                  </p>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                    {startup.industry}
                  </span>
                </div>
              </CardHeader>

              {/* কার্ডের মাঝের অংশ: <CardBody> এর বদলে <div> ব্যবহার করা হয়েছে */}
              <div className="px-5 py-3 text-sm text-gray-600 flex flex-col gap-2">
                <div className="flex justify-between items-center border-b border-gray-100/50 pb-2">
                  <span className="text-gray-400 font-medium">Founder</span>
                  <span className="font-semibold text-gray-800">{startup.founder}</span>
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-gray-400 font-medium">Team Size Needed</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs w-fit">
                    {startup.teamSize}
                  </span>
                </div>
              </div>

              {/* কার্ডের নিচের অংশ: অ্যাকশন বাটন */}
              <CardFooter className="px-5 pb-5 pt-2">
                <Button 
                  variant="light" 
                  className="w-full justify-between font-medium text-gray-700 hover:text-[#b06a44] p-0 h-auto min-w-0 bg-transparent group"
                  endContent={<ArrowUpRightFromSquare size={16} className="text-gray-400 group-hover:text-[#b06a44] transition-colors" />}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedStartupsCard;