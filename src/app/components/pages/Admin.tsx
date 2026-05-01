import { MoreVertical, TrendingUp, TrendingDown, Users, BookOpen } from "lucide-react";
import { Annotation } from "../ui/Annotation";

interface Student {
  id: string;
  name: string;
  email: string;
  courses: number;
  progress: number;
  status: "active" | "inactive";
}

interface CourseStats {
  name: string;
  enrolled: number;
  completed: number;
  avgRating: number;
  trend: "up" | "down";
}

const students: Student[] = [
  { id: "1", name: "Alice Johnson", email: "alice.j@university.edu", courses: 4, progress: 85, status: "active" },
  { id: "2", name: "Bob Smith", email: "bob.smith@university.edu", courses: 3, progress: 72, status: "active" },
  { id: "3", name: "Carol White", email: "carol.w@university.edu", courses: 5, progress: 93, status: "active" },
  { id: "4", name: "David Brown", email: "david.b@university.edu", courses: 2, progress: 45, status: "inactive" },
  { id: "5", name: "Emma Davis", email: "emma.d@university.edu", courses: 4, progress: 88, status: "active" },
  { id: "6", name: "Frank Miller", email: "frank.m@university.edu", courses: 3, progress: 67, status: "active" },
];

const courseStats: CourseStats[] = [
  { name: "Data Structures", enrolled: 245, completed: 189, avgRating: 4.7, trend: "up" },
  { name: "Algorithms", enrolled: 198, completed: 156, avgRating: 4.5, trend: "up" },
  { name: "Operating Systems", enrolled: 167, completed: 142, avgRating: 4.8, trend: "down" },
  { name: "Database Systems", enrolled: 223, completed: 178, avgRating: 4.6, trend: "up" },
];

export function Admin() {
  const overviewStats = [
    { label: "Total Students", value: "2,456", icon: Users, change: "+12.5%", trend: "up" },
    { label: "Active Courses", value: "48", icon: BookOpen, change: "+3", trend: "up" },
    { label: "Avg Completion", value: "78%", icon: TrendingUp, change: "+5.2%", trend: "up" },
    { label: "Satisfaction", value: "4.7/5", icon: TrendingUp, change: "+0.2", trend: "up" },
  ];

  return (
    <div className="p-8 relative">
      <Annotation number={3} label="Admin Dashboard – Manage students, courses, and view analytics" position="top-right" />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage students, courses, and analytics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8 relative">
        <Annotation number={4} label="Overview Statistics – Key metrics and trends" position="top-right" />
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <span className={`text-sm flex items-center gap-1 ${
                  stat.trend === "up" ? "text-[#10B981]" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Course Performance Table */}
      <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Performance</h2>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Course Name</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Enrolled</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Completed</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Completion Rate</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Avg Rating</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((course, index) => {
                const completionRate = Math.round((course.completed / course.enrolled) * 100);
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{course.name}</td>
                    <td className="py-4 px-4 text-gray-600">{course.enrolled}</td>
                    <td className="py-4 px-4 text-gray-600">{course.completed}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#06B6D4]"
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-gray-700">{course.avgRating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {course.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-[#10B981]" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Management Table */}
      <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Student Management</h2>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Courses</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Progress</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{student.name}</td>
                  <td className="py-4 px-4 text-gray-600">{student.email}</td>
                  <td className="py-4 px-4 text-gray-600">{student.courses}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#06B6D4]"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      student.status === "active" 
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}