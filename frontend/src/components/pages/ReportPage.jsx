import React, { useState } from "react";
import {
  FileText, BarChart2, PieChart, Users, Briefcase, Calendar, Download, CheckCircle, AlertTriangle
} from "lucide-react";

// Dummy data for reports
const reportStats = [
  { icon: <Users className="w-6 h-6 text-blue-500" />, label: "Employees", value: 42 },
  { icon: <Briefcase className="w-6 h-6 text-indigo-500" />, label: "Projects", value: 12 },
  { icon: <CheckCircle className="w-6 h-6 text-green-500" />, label: "Attendance Rate", value: "96%" },
  { icon: <AlertTriangle className="w-6 h-6 text-red-400" />, label: "Issues", value: 3 },
];

// Dummy data for charts
const attendanceData = [
  { month: "Jan", present: 95, absent: 5 },
  { month: "Feb", present: 97, absent: 3 },
  { month: "Mar", present: 94, absent: 6 },
  { month: "Apr", present: 98, absent: 2 },
  { month: "May", present: 96, absent: 4 },
  { month: "Jun", present: 97, absent: 3 },
];

const projectPie = [
  { name: "Completed", value: 8, color: "#10b981" },
  { name: "Ongoing", value: 3, color: "#6366f1" },
  { name: "Delayed", value: 1, color: "#ef4444" },
];

// Simple Bar Chart
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.present + d.absent));
  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.map((d, i) => (
        <div key={d.month} className="flex flex-col items-center group">
          <div className="flex flex-col-reverse">
            <div
              className="w-6 rounded-t bg-green-400 group-hover:bg-green-500 transition-all"
              style={{ height: `${(d.present / max) * 100}px` }}
              title={`Present: ${d.present}%`}
            />
            <div
              className="w-6 rounded-t bg-red-300 group-hover:bg-red-400 transition-all"
              style={{ height: `${(d.absent / max) * 100}px` }}
              title={`Absent: ${d.absent}%`}
            />
          </div>
          <span className="text-xs mt-1 text-slate-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
};

// Simple Pie Chart
const PieChartSVG = ({ data, size = 120 }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
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
            fill={d.color}
            stroke="#fff"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

const ReportPage = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Report downloaded! (Demo)");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8 relative">
        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              Reports & Analytics
            </h1>
            <p className="text-blue-600 mt-2">Overview of key metrics, attendance, and project status</p>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {downloading ? "Downloading..." : "Download Report"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportStats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow border border-blue-100 flex flex-col items-center hover:scale-105 transition-all duration-200"
            >
              {stat.icon}
              <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
              <div className="text-xs text-blue-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-blue-700">Attendance Overview</span>
            </div>
            <BarChart data={attendanceData} />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Present</span>
              <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Absent</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-indigo-700">Project Status</span>
            </div>
            <PieChartSVG data={projectPie} />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {projectPie.map((p) => (
                <span key={p.name} className="px-2 py-1 rounded text-xs flex items-center gap-1"
                  style={{ background: p.color + "22", color: p.color }}>
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: p.color }}></span>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            Recent Activities
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-50">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                <tr>
                  <td className="px-6 py-4">2025-05-10</td>
                  <td className="px-6 py-4">Project Alpha completed</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Success</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">2025-05-08</td>
                  <td className="px-6 py-4">Attendance marked for May</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Info</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">2025-05-05</td>
                  <td className="px-6 py-4">Issue reported in Project Beta</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Alert</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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

export default ReportPage;