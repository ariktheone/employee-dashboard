import React, { useState, useMemo } from "react";
import { 
  Briefcase, User, Users, MapPin, CalendarDays, Filter, Search, Plus, 
  TrendingUp, Clock, Building, Globe, Eye, Edit, Trash2, MoreHorizontal,
  Award, Target, CheckCircle, XCircle
} from "lucide-react";

// Enhanced job data with more fields
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    posted: "2025-05-01",
    applicants: 12,
    status: "Open",
    manager: "Arijit Mondal",
    salary: "₹8-12 LPA",
    experience: "2-4 years",
    skills: ["React", "JavaScript", "CSS"],
    priority: "High",
    deadline: "2025-06-15"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Kolkata",
    type: "Contract",
    posted: "2025-04-20",
    applicants: 7,
    status: "Closed",
    manager: "Priya Sen",
    salary: "₹6-10 LPA",
    experience: "3-5 years",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    priority: "Medium",
    deadline: "2025-05-30"
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full Time",
    posted: "2025-05-10",
    applicants: 5,
    status: "Open",
    manager: "Rahul Das",
    salary: "₹10-15 LPA",
    experience: "3-6 years",
    skills: ["Node.js", "Python", "AWS"],
    priority: "High",
    deadline: "2025-06-20"
  },
  {
    id: 4,
    title: "HR Executive",
    department: "HR",
    location: "Remote",
    type: "Part Time",
    posted: "2025-04-28",
    applicants: 3,
    status: "Open",
    manager: "Soma Roy",
    salary: "₹4-6 LPA",
    experience: "1-3 years",
    skills: ["Recruitment", "Communication", "Excel"],
    priority: "Low",
    deadline: "2025-06-10"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Mumbai",
    type: "Full Time",
    posted: "2025-05-15",
    applicants: 8,
    status: "Open",
    manager: "Vikash Kumar",
    salary: "₹12-18 LPA",
    experience: "4-7 years",
    skills: ["Docker", "Kubernetes", "Jenkins"],
    priority: "High",
    deadline: "2025-06-25"
  },
  {
    id: 6,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Delhi",
    type: "Full Time",
    posted: "2025-05-12",
    applicants: 15,
    status: "In Review",
    manager: "Anita Sharma",
    salary: "₹8-14 LPA",
    experience: "5-8 years",
    skills: ["Digital Marketing", "Analytics", "Strategy"],
    priority: "Medium",
    deadline: "2025-06-18"
  }
];

const statusConfig = {
  "Open": { color: "bg-green-100 text-green-700", icon: CheckCircle },
  "Closed": { color: "bg-red-100 text-red-700", icon: XCircle },
  "In Review": { color: "bg-yellow-100 text-yellow-700", icon: Clock }
};

const priorityConfig = {
  "High": { color: "bg-red-50 text-red-600", dot: "bg-red-500" },
  "Medium": { color: "bg-yellow-50 text-yellow-600", dot: "bg-yellow-500" },
  "Low": { color: "bg-green-50 text-green-600", dot: "bg-green-500" }
};

const JobDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // table or cards

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalJobs = jobsData.length;
    const openJobs = jobsData.filter(job => job.status === "Open").length;
    const totalApplicants = jobsData.reduce((sum, job) => sum + job.applicants, 0);
    const avgApplicants = Math.round(totalApplicants / totalJobs);
    const departments = [...new Set(jobsData.map(job => job.department))];
    const highPriorityJobs = jobsData.filter(job => job.priority === "High").length;

    return {
      totalJobs,
      openJobs,
      totalApplicants,
      avgApplicants,
      departments: departments.length,
      highPriorityJobs
    };
  }, []);

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.department.toLowerCase().includes(search.toLowerCase()) ||
                         job.location.toLowerCase().includes(search.toLowerCase()) ||
                         job.manager.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesDepartment = departmentFilter === "All" || job.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(jobsData.map(job => job.department))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              Job Management Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Comprehensive overview of all job postings and recruitment pipeline</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-6 py-3 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm border border-slate-200">
              <Eye className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.totalJobs}</div>
            <div className="text-sm text-slate-600">Total Jobs</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.openJobs}</div>
            <div className="text-sm text-slate-600">Open Positions</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.totalApplicants}</div>
            <div className="text-sm text-slate-600">Total Applicants</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.avgApplicants}</div>
            <div className="text-sm text-slate-600">Avg per Job</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Building className="w-5 h-5 text-teal-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.departments}</div>
            <div className="text-sm text-slate-600">Departments</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Award className="w-5 h-5 text-red-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{analytics.highPriorityJobs}</div>
            <div className="text-sm text-slate-600">High Priority</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 flex-1 max-w-md">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Search jobs, departments, managers..."
                className="bg-transparent outline-none flex-1 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm min-w-32"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="In Review">In Review</option>
                </select>
              </div>

              <select
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm min-w-36"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    viewMode === "table" ? "bg-white text-slate-700 shadow-sm" : "text-slate-500"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    viewMode === "cards" ? "bg-white text-slate-700 shadow-sm" : "text-slate-500"
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Display */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Job Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Location & Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Applicants</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Manager</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        No jobs found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-900 mb-1">{job.title}</div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityConfig[job.priority].color}`}>
                                <div className={`w-2 h-2 rounded-full ${priorityConfig[job.priority].dot} inline-block mr-1`}></div>
                                {job.priority}
                              </span>
                              <span className="text-xs text-slate-500">{job.experience}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{job.department}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-700">{job.location}</span>
                            </div>
                            <div className="text-sm text-slate-500">{job.type}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{job.salary}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-slate-900">{job.applicants}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{job.manager}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[job.status].color}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Building className="w-4 h-4" />
                      {job.department}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityConfig[job.priority].color}`}>
                      {job.priority}
                    </span>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location} • {job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{job.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="w-4 h-4 text-slate-400" />
                    <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-xs">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-slate-900">{job.applicants}</span>
                      <span className="text-sm text-slate-500">applicants</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[job.status].color}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-900">{job.salary}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-6 text-center text-sm text-slate-500">
            Showing {filteredJobs.length} of {jobsData.length} jobs
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;