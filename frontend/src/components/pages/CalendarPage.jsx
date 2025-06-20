import React, { useState } from "react";
import {
  Calendar, ChevronLeft, ChevronRight, Plus, CheckCircle, Clock, FileText, Users, Award, BarChart2, PieChart, UserCheck
} from "lucide-react";

// Sample year plan data
const yearPlan = [
  { month: "January", goal: "Kickoff new projects", events: 3, completed: 2, highlight: "Annual Strategy Meet" },
  { month: "February", goal: "Team training", events: 2, completed: 2, highlight: "Skill Workshop" },
  { month: "March", goal: "Client onboarding", events: 4, completed: 3, highlight: "Major Client Signed" },
  { month: "April", goal: "Quarterly review", events: 2, completed: 2, highlight: "Q1 Review" },
  { month: "May", goal: "Product launch", events: 3, completed: 2, highlight: "Launch Event" },
  { month: "June", goal: "Mid-year feedback", events: 2, completed: 1, highlight: "Feedback Drive" },
  { month: "July", goal: "Team building", events: 2, completed: 2, highlight: "Offsite" },
  { month: "August", goal: "Process audit", events: 2, completed: 1, highlight: "Audit Complete" },
  { month: "September", goal: "Hiring drive", events: 3, completed: 2, highlight: "New Hires" },
  { month: "October", goal: "Festive campaign", events: 2, completed: 1, highlight: "Campaign Launch" },
  { month: "November", goal: "CSR activity", events: 2, completed: 2, highlight: "Charity Event" },
  { month: "December", goal: "Year-end review", events: 3, completed: 2, highlight: "Annual Awards" },
];

// Example event data for visualization
const eventTypes = [
  { type: "Meetings", value: 12, color: "#3b82f6" },
  { type: "Launches", value: 6, color: "#f59e42" },
  { type: "Reviews", value: 8, color: "#10b981" },
  { type: "CSR", value: 3, color: "#a21caf" },
  { type: "Hiring", value: 5, color: "#ef4444" },
  { type: "Training", value: 4, color: "#6366f1" },
];

// Pie chart for event types
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
            key={d.type}
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

const CalendarPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showAddModal, setShowAddModal] = useState(false);

  const handlePrev = () => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  const handleNext = () => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
  const monthData = yearPlan[selectedMonth];

  // Add Event Modal logic (demo)
  const handleAddEvent = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    alert("Event added! (Demo)");
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
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              Yearly Calendar & Plan
            </h1>
            <p className="text-blue-600 mt-2">Track your annual goals, events, and highlights</p>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>

        {/* Month Navigator */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            onClick={handlePrev}
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600" />
          </button>
          <div className="text-xl font-semibold text-blue-800">{monthData.month}</div>
          <button
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            onClick={handleNext}
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* Month Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-indigo-500" />
            <span className="font-semibold text-indigo-700">Highlight</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 mb-2">{monthData.highlight}</div>
          <div className="flex flex-wrap gap-6 justify-center mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-blue-700 font-semibold">{monthData.completed}</span>
              <span className="text-slate-500 text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-blue-700 font-semibold">{monthData.events - monthData.completed}</span>
              <span className="text-slate-500 text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-blue-700 font-semibold">{monthData.events}</span>
              <span className="text-slate-500 text-sm">Total Events</span>
            </div>
          </div>
          <div className="text-lg text-slate-700 mb-2">
            <span className="font-semibold text-blue-800">Goal:</span> {monthData.goal}
          </div>
        </div>

        {/* Visualization Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-blue-700">Event Types Distribution</span>
            </div>
            <PieChartSVG data={eventTypes} />
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {eventTypes.map((et) => (
                <span key={et.type} className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs flex items-center gap-1">
                  <span style={{ background: et.color }} className="w-3 h-3 rounded-full inline-block"></span>
                  {et.type}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-indigo-700">Completion Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg width="96" height="96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="12"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 * (1 - monthData.completed / monthData.events)
                    }
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-indigo-700">
                  {Math.round((monthData.completed / monthData.events) * 100)}%
                </div>
              </div>
              <div className="mt-2 text-slate-600 text-sm">Events Completed</div>
            </div>
          </div>
        </div>

        {/* Year Plan Timeline */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Year Plan Timeline
          </h2>
          <div className="overflow-x-auto custom-scrollbar">
            <div className="flex gap-8 min-w-[900px]">
              {yearPlan.map((m, i) => (
                <div
                  key={m.month}
                  className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${i === selectedMonth
                      ? "border-blue-500 bg-blue-50 scale-105 shadow-lg"
                      : "border-blue-100 bg-white hover:bg-blue-50"
                    }`}
                  style={{ minWidth: 120 }}
                  onClick={() => setSelectedMonth(i)}
                >
                  <div className="text-lg font-bold text-blue-800">{m.month.slice(0, 3)}</div>
                  <div className="text-xs text-slate-500 mb-1">{m.goal}</div>
                  <div className="flex gap-1 items-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-700">{m.completed}/{m.events}</span>
                  </div>
                  <div className="mt-1 text-xs text-indigo-600">{m.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <form
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-blue-200 relative animate-fadeIn"
              onSubmit={handleAddEvent}
            >
              <button
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-xl"
                onClick={() => setShowAddModal(false)}
                type="button"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6 text-blue-500" />
                Add New Event
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">Event Name</label>
                  <input className="w-full border border-blue-200 rounded-lg px-3 py-2" required placeholder="Event name" />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">Month</label>
                  <select className="w-full border border-blue-200 rounded-lg px-3 py-2" defaultValue={yearPlan[selectedMonth].month}>
                    {yearPlan.map((m) => (
                      <option key={m.month} value={m.month}>{m.month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">Type</label>
                  <select className="w-full border border-blue-200 rounded-lg px-3 py-2">
                    {eventTypes.map((et) => (
                      <option key={et.type} value={et.type}>{et.type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-slate-100 text-blue-700 hover:bg-slate-200 transition"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  type="submit"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Animation for fadeIn */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c7d2fe;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
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

export default CalendarPage;