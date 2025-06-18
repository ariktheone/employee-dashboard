import React, { useState, useMemo } from 'react';
import {
  Users,
  Calendar,
  BarChart3,
  CheckCircle2,
  Briefcase,
  User,
  FileText,
  MoreHorizontal,
  Plus,
  Wallet,
  Star,
  ArrowRightCircle,
  List,
  LayoutGrid,
  Search,
  Filter,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  X,
  Eye,
  Edit3,
  Trash2,
  Download,
  Share2,
  Settings,
  Target,
  Activity
} from 'lucide-react';

// Mock data
const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    description: "Complete overhaul of the customer-facing e-commerce platform with modern UI/UX and enhanced performance.",
    manager: "Sarah Johnson",
    team: ["Alex", "Maria", "John", "Lisa"],
    start: "2024-01-15",
    end: "2024-06-30",
    status: "Active",
    progress: 68,
    budget: "$125,000",
    tasks: 45,
    completed: 31,
    featured: true,
    priority: "High",
    category: "Development",
    tags: ["Frontend", "UX/UI", "React"]
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms with cross-platform compatibility.",
    manager: "Mike Chen",
    team: ["David", "Emma", "Ryan"],
    start: "2024-02-01",
    end: "2024-08-15",
    status: "Planning",
    progress: 25,
    budget: "$89,500",
    tasks: 32,
    completed: 8,
    featured: false,
    priority: "Medium",
    category: "Mobile",
    tags: ["React Native", "iOS", "Android"]
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description: "Business intelligence dashboard for real-time data visualization and reporting.",
    manager: "Jennifer Lee",
    team: ["Tom", "Nina", "Carlos", "Amy", "Ben"],
    start: "2023-11-01",
    end: "2024-03-31",
    status: "Completed",
    progress: 100,
    budget: "$67,200",
    tasks: 28,
    completed: 28,
    featured: false,
    priority: "High",
    category: "Analytics",
    tags: ["Data Viz", "D3.js", "Python"]
  },
  {
    id: 4,
    name: "Cloud Migration",
    description: "Migration of legacy systems to cloud infrastructure with improved scalability and security.",
    manager: "Robert Kim",
    team: ["Frank", "Grace", "Henry"],
    start: "2024-01-20",
    end: "2024-07-20",
    status: "Active",
    progress: 42,
    budget: "$156,000",
    tasks: 38,
    completed: 16,
    featured: true,
    priority: "Critical",
    category: "Infrastructure",
    tags: ["AWS", "DevOps", "Security"]
  }
];

const statusConfig = {
  Active: { 
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200', 
    icon: <Activity className="w-3 h-3" />,
    dot: 'bg-emerald-400'
  },
  Planning: { 
    color: 'bg-amber-100 text-amber-700 border-amber-200', 
    icon: <Clock className="w-3 h-3" />,
    dot: 'bg-amber-400'
  },
  Completed: { 
    color: 'bg-blue-100 text-blue-700 border-blue-200', 
    icon: <CheckCircle2 className="w-3 h-3" />,
    dot: 'bg-blue-400'
  },
};

const priorityConfig = {
  Critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  High: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  Medium: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  Low: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projectsData.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== 'All') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    if (filterPriority !== 'All') {
      filtered = filtered.filter(project => project.priority === filterPriority);
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'deadline':
          return new Date(a.end) - new Date(b.end);
        case 'priority':
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterPriority, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = projectsData.length;
    const active = projectsData.filter(p => p.status === 'Active').length;
    const completed = projectsData.filter(p => p.status === 'Completed').length;
    const avgProgress = Math.round(projectsData.reduce((acc, p) => acc + p.progress, 0) / total);
    
    return { total, active, completed, avgProgress };
  }, []);

  const ProjectCard = ({ project }) => (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {project.featured && (
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            )}
            <h3 className="font-semibold text-slate-900 text-lg leading-tight">{project.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${statusConfig[project.status].color}`}>
              {statusConfig[project.status].icon}
              {project.status}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        
        {/* Priority & Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${priorityConfig[project.priority].bg} ${priorityConfig[project.priority].color} border ${priorityConfig[project.priority].border}`}>
            <AlertCircle className="w-3 h-3 mr-1" />
            {project.priority}
          </span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{project.category}</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{project.manager}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{project.team.length} members</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{new Date(project.end).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Wallet className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{project.budget}</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-slate-600">{project.completed}/{project.tasks} tasks completed</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setSelectedProject(project)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            </div>
            <p className="text-slate-600">Manage and track all your projects in one place</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.active}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.completed}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg Progress</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.avgProgress}%</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Filters */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-slate-200 p-4 w-64 z-10">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="All">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Planning">Planning</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="All">All Priorities</option>
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="name">Name</option>
                          <option value="progress">Progress</option>
                          <option value="deadline">Deadline</option>
                          <option value="priority">Priority</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Project</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Manager</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Progress</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Deadline</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Budget</th>
                    <th className="text-right py-4 px-6 font-semibold text-slate-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {project.featured && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                          <div>
                            <p className="font-medium text-slate-900">{project.name}</p>
                            <p className="text-sm text-slate-500">{project.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{project.manager}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${statusConfig[project.status].color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status].dot}`} />
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-24">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 min-w-12">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{new Date(project.end).toLocaleDateString()}</td>
                      <td className="py-4 px-6 font-medium text-slate-900">{project.budget}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('All');
                setFilterPriority('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{selectedProject.name}</h2>
                    <p className="text-sm text-slate-600">{selectedProject.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Status & Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                      <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${statusConfig[selectedProject.status].color}`}>
                        {statusConfig[selectedProject.status].icon}
                        {selectedProject.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                      <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${priorityConfig[selectedProject.priority].bg} ${priorityConfig[selectedProject.priority].color} border ${priorityConfig[selectedProject.priority].border}`}>
                        <AlertCircle className="w-4 h-4" />
                        {selectedProject.priority}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Overall Progress</label>
                      <span className="text-lg font-bold text-slate-900">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <p className="text-slate-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Project Manager</label>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span className="font-medium text-slate-900">{selectedProject.manager}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Team Members</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.team.map((member, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                              <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-slate-900 text-lg">{selectedProject.budget}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">Start: {new Date(selectedProject.start).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">End: {new Date(selectedProject.end).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tasks</label>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Completed Tasks</span>
                            <span className="font-semibold text-slate-900">{selectedProject.completed}/{selectedProject.tasks}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full">
                            <div 
                              className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${(selectedProject.completed / selectedProject.tasks) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                        <div className="flex flex-wrap gap-1">
                          {selectedProject.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Quick Stats</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{Math.ceil((new Date(selectedProject.end) - new Date()) / (1000 * 60 * 60 * 24))}</div>
                        <div className="text-xs text-slate-600">Days Left</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{selectedProject.completed}</div>
                        <div className="text-xs text-slate-600">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">{selectedProject.tasks - selectedProject.completed}</div>
                        <div className="text-xs text-slate-600">Remaining</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedProject.team.length}</div>
                        <div className="text-xs text-slate-600">Team Size</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    <Edit3 className="w-4 h-4" />
                    Edit Project
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close filters */}
        {showFilters && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowFilters(false)}
          />
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Backdrop blur support */
        @supports (backdrop-filter: blur(8px)) {
          .backdrop-blur-sm {
            backdrop-filter: blur(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;