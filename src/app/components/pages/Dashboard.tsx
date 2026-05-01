import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { Annotation } from "../ui/Annotation";

export function Dashboard() {
  const stats = [
    { label: "Courses Completed", value: "12", icon: BookOpen, color: "bg-[#06B6D4]" },
    { label: "Active Students", value: "2,456", icon: Users, color: "bg-[#10B981]" },
    { label: "Certificates Earned", value: "847", icon: Award, color: "bg-[#1E3A8A]" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "bg-purple-600" },
  ];

  const recentCourses = [
    { 
      name: "Data Structures & Algorithms", 
      progress: 75, 
      status: "In Progress",
      nextDeadline: "Mar 5, 2026"
    },
    { 
      name: "Operating Systems", 
      progress: 100, 
      status: "Completed",
      nextDeadline: null
    },
    { 
      name: "Database Systems", 
      progress: 45, 
      status: "In Progress",
      nextDeadline: "Mar 12, 2026"
    },
  ];

  return (
    <div className="relative space-y-6 p-4 sm:p-6 lg:p-8">
      <Annotation number={3} label="Hero Section – Quick overview with action button" position="top-right" />
      
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] p-5 text-white shadow-lg sm:p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Welcome back, Abdullah! 👋</h1>
          <p className="mb-6 max-w-2xl text-sm text-blue-100 sm:text-base">
            You're on track to complete your Software Engineering pathway this semester.
          </p>
          {/* FIXED PATH BELOW: /app/roadmap */}
          <Link 
            to="/app/roadmap" 
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-[#1E3A8A] transition-all hover:shadow-lg sm:px-6 sm:text-base"
          >
            View Your Roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 hidden h-64 w-64 rounded-full bg-white/10 -mr-32 -mt-32 sm:block"></div>
        <div className="absolute bottom-0 right-20 hidden h-48 w-48 rounded-full bg-white/5 -mb-24 sm:block"></div>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Annotation number={4} label="Statistics Cards – Display key metrics and achievements" position="top-right" />
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Courses */}
      <div className="relative rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <Annotation number={5} label="Recent Courses – Track your course progress" position="top-right" />
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Courses</h2>
          {/* FIXED PATH BELOW: /app/roadmap */}
          <Link to="/app/roadmap" className="text-[#06B6D4] hover:text-[#1E3A8A] dark:hover:text-[#06B6D4] transition-colors">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentCourses.map((course, index) => (
            <div 
              key={index}
              className="flex flex-col gap-4 rounded-2xl bg-[#F8FAFC] p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{course.name}</h3>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="w-full sm:max-w-xs">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          course.progress === 100 ? 'bg-[#10B981]' : 'bg-[#06B6D4]'
                        } transition-all`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:ml-8">
                {course.nextDeadline && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {course.nextDeadline}
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs ${
                  course.status === "Completed" 
                    ? "bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/20"
                    : "bg-[#06B6D4]/10 text-[#06B6D4] dark:bg-[#06B6D4]/20"
                }`}>
                  {course.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}