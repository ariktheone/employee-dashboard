import React, { useState, useMemo } from "react";
import {
  Users, Briefcase, TrendingUp, Award, BarChart2, PieChart, UserCheck, UserPlus, UserX, CalendarDays, Globe, Eye, Edit, Trash2
} from "lucide-react";

// Sample consultancy data
const consultancyStats = {
  totalClients: 42,
  activeProjects: 12,
  consultants: 18,
  revenue: 1250000,
  satisfaction: 92,
  newClients: 7,
  churnedClients: 2,
  avgProjectDuration: 4.2,
  industries: 8,
};

const clients = [
  { id: 1, name: "Acme Corp", industry: "Finance", status: "Active", start: "2024-12-01", consultant: "Arijit Mondal", value: 200000 },
  { id: 2, name: "Globex", industry: "Healthcare", status: "Active", start: "2025-01-15", consultant: "Priya Sen", value: 150000 },
  { id: 3, name: "Initech", industry: "Tech", status: "Completed", start: "2024-08-10", consultant: "Rahul Das", value: 180000 },
  { id: 4, name: "Umbrella", industry: "Pharma", status: "Active", start: "2025-02-01", consultant: "Soma Roy", value: 120000 },
  { id: 5, name: "Wayne Enterprises", industry: "Manufacturing", status: "Active", start: "2025-03-10", consultant: "Vikash Kumar", value: 250000 },
  { id: 6, name: "Stark Industries", industry: "Tech", status: "Completed", start: "2024-09-20", consultant: "Anita Sharma", value: 220000 },
];

const industries = [
  { name: "Finance", value: 6 },
  { name: "Healthcare", value: 5 },
  { name: "Tech", value: 10 },
  { name: "Pharma", value: 4 },
  { name: "Manufacturing", value: 7 },
  { name: "Retail", value: 3 },
  { name: "Education", value: 2 },
  { name: "Others", value: 5 },
];

// Simple bar chart component
const BarChart = ({ data, height = 120 }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2 h-[120px]">
      {data.map((d, i) => (
        <div key={d.name} className="flex flex-col items-center group">
          <div
            className="w-6 rounded-t-lg bg-gradient-to-t from-blue-400 to-indigo-500 transition-all duration-300 group-hover:scale-110 shadow-lg"
            style={{
              height: `${(d.value / max) * height}px`,
            }}
            title={d.name + ": " + d.value}
          />
          <span className="text-xs mt-1 text-slate-500">{d.name.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
};

// Simple pie chart using SVG
const PieChartSVG = ({ data, size = 120 }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const colors = [
    "#3b82f6", "#6366f1", "#f59e42", "#10b981", "#ef4444", "#a21caf", "#eab308", "#64748b"
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const startAngle = (cumulative / total) * 2 * Math.PI;
        const endAngle = ((cumulative + d.value) / total) * 2 * Math.PI;
        const x1 = size / 2 + (size / 2 - 10) * Math.cos(startAngle);
        const y1 = size / 2 + (size / 2 - 10) * Math.sin(startAngle);
        const x2 = size / 2 + (size / 2 - 10) * Math.cos(endAngle);
        const y2 = size / 2 + (size / 2 - 10) * Math.sin(endAngle);
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        const pathData = [
          `M ${size / 2} ${size / 2}`,
          `L ${x1} ${y1}`,
          `A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArc} 1 ${x2} ${y2}`,
          "Z"
        ].join(" ");
        cumulative += d.value;
        return (
          <path
            key={d.name}
            d={pathData}
            fill={colors[i % colors.length]}
            stroke="#fff"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

const ConsultancyPage = () => {
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const filteredClients = useMemo(() =>
    clients.filter(c =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.industry.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.consultant.toLowerCase().includes(clientSearch.toLowerCase())
    ), [clientSearch]
  );

  // Button handlers (replace with real logic as needed)
  const handleExport = () => alert("Exporting report...");
  const handleAddClient = () => alert("Add Client functionality coming soon!");
  const handleEdit = (client) => alert(`Edit ${client.name} (coming soon)`);
  const handleDelete = (client) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      alert("Delete functionality coming soon!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8 relative">
        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              Consultancy Dashboard
            </h1>
            <p className="text-blue-600 mt-2">Overview of consultancy clients, projects, and performance</p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center px-4 py-2 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow hover:shadow-lg"
              onClick={handleExport}
            >
              <BarChart2 className="w-4 h-4 mr-2 text-blue-600" />
              Export Report
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleAddClient}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { icon: <Users className="w-6 h-6 text-blue-500 mb-2" />, value: consultancyStats.totalClients, label: "Clients", color: "text-blue-900", sub: "text-blue-600" },
            { icon: <Briefcase className="w-6 h-6 text-indigo-500 mb-2" />, value: consultancyStats.activeProjects, label: "Active Projects", color: "text-indigo-900", sub: "text-indigo-600" },
            { icon: <UserCheck className="w-6 h-6 text-green-500 mb-2" />, value: consultancyStats.consultants, label: "Consultants", color: "text-green-900", sub: "text-green-600" },
            { icon: <TrendingUp className="w-6 h-6 text-amber-500 mb-2" />, value: `₹${(consultancyStats.revenue/100000).toFixed(1)}L`, label: "Revenue", color: "text-amber-900", sub: "text-amber-600" },
            { icon: <Award className="w-6 h-6 text-purple-500 mb-2" />, value: `${consultancyStats.satisfaction}%`, label: "Satisfaction", color: "text-purple-900", sub: "text-purple-600" },
            { icon: <UserPlus className="w-6 h-6 text-blue-400 mb-2" />, value: consultancyStats.newClients, label: "New Clients", color: "text-blue-900", sub: "text-blue-600" },
            { icon: <UserX className="w-6 h-6 text-red-400 mb-2" />, value: consultancyStats.churnedClients, label: "Churned", color: "text-red-900", sub: "text-red-600" },
            { icon: <CalendarDays className="w-6 h-6 text-slate-400 mb-2" />, value: `${consultancyStats.avgProjectDuration}m`, label: "Avg Duration", color: "text-slate-900", sub: "text-slate-600" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow border border-blue-100 flex flex-col items-center hover:scale-105 transition-all duration-200"
            >
              {stat.icon}
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className={`text-xs ${stat.sub}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-blue-700">Clients by Industry</span>
            </div>
            <BarChart data={industries} />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {industries.map((ind, i) => (
                <span key={ind.name} className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">{ind.name}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-indigo-700">Revenue by Industry</span>
            </div>
            <PieChartSVG data={industries.map((ind, i) => ({
              ...ind,
              value: ind.value * 100000 // fake revenue per industry
            }))} />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {industries.map((ind, i) => (
                <span key={ind.name} className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs">{ind.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Clients
            </h2>
            <input
              type="text"
              placeholder="Search clients, industry, consultant..."
              className="px-4 py-2 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={clientSearch}
              onChange={e => setClientSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-50">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Consultant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-blue-400">
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map(client => (
                    <tr key={client.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4 font-semibold text-blue-900">{client.name}</td>
                      <td className="px-6 py-4 text-blue-700">{client.industry}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(client.start).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{client.consultant}</td>
                      <td className="px-6 py-4 font-mono text-blue-700">₹{client.value.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" onClick={() => setSelectedClient(client)}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" onClick={() => handleEdit(client)}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" onClick={() => handleDelete(client)}>
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

        {/* Client Details Modal */}
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-blue-200 relative animate-fadeIn">
              <button
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-xl"
                onClick={() => setSelectedClient(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                {selectedClient.name}
              </h3>
              <div className="space-y-2 mb-4">
                <div>
                  <span className="font-semibold text-blue-900">Industry:</span> {selectedClient.industry}
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Status:</span>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                    selectedClient.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {selectedClient.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Start Date:</span> {new Date(selectedClient.start).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Consultant:</span> {selectedClient.consultant}
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Value:</span> ₹{selectedClient.value.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={() => setSelectedClient(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animation for fadeIn */}
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </div>
    </div>
  );
};

export default ConsultancyPage;