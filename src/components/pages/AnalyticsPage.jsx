import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Users, DollarSign, Award, Calendar, Target, Clock, Activity, RefreshCw, Download, Filter, ChevronDown } from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [showFilter, setShowFilter] = useState(false);

  // Sample data - replace with actual data from your API
  const departmentData = [
    { name: 'Engineering', employees: 2, budget: 175000, performance: 89.5 },
    { name: 'Product', employees: 1, budget: 95000, performance: 88 },
    { name: 'Design', employees: 1, budget: 78000, performance: 95 },
    { name: 'Marketing', employees: 1, budget: 82000, performance: 91 },
    { name: 'HR', employees: 1, budget: 75000, performance: 89 }
  ];

  const performanceTrend = [
    { month: 'Jan', performance: 85, satisfaction: 82 },
    { month: 'Feb', performance: 87, satisfaction: 84 },
    { month: 'Mar', performance: 89, satisfaction: 86 },
    { month: 'Apr', performance: 88, satisfaction: 85 },
    { month: 'May', performance: 90, satisfaction: 88 },
    { month: 'Jun', performance: 92, satisfaction: 90 }
  ];

  const taskData = [
    { status: 'Completed', count: 102, color: '#10B981' },
    { status: 'In Progress', count: 23, color: '#F59E0B' },
    { status: 'Pending', count: 12, color: '#EF4444' },
    { status: 'On Hold', count: 8, color: '#6B7280' }
  ];

  const hiringTrend = [
    { month: 'Jan', hires: 1, departures: 0 },
    { month: 'Feb', hires: 2, departures: 1 },
    { month: 'Mar', hires: 1, departures: 0 },
    { month: 'Apr', hires: 0, departures: 1 },
    { month: 'May', hires: 1, departures: 0 },
    { month: 'Jun', hires: 1, departures: 0 }
  ];

  // Download handler (CSV export example)
  const handleDownload = () => {
    const csv = [
      ['Department', 'Employees', 'Budget', 'Performance'],
      ...departmentData.map(d => [d.name, d.employees, d.budget, d.performance])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'department_analytics.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Refresh handler (stub)
  const handleRefresh = () => {
    window.location.reload();
  };

  // Stat Card
  const StatCard = ({ icon: Icon, title, value, change, trend }) => (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition group relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
          <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      <div className="absolute right-0 bottom-0 opacity-10 text-blue-400 pointer-events-none">
        <Icon className="w-20 h-20" />
      </div>
    </div>
  );

  // Filter panel (stub, can be expanded)
  const FilterPanel = () => (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-4">
      <div className="mb-2 font-semibold text-gray-700">Advanced Filters</div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-blue-600" /> Only show departments &gt; 1 employee
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-blue-600" /> Performance above 90%
        </label>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-7 h-7 text-blue-500" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your workforce</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
            onClick={handleDownload}
            title="Export CSV"
          >
            <Download className="w-4 h-4 mr-2 text-blue-600" />
            Export
          </button>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
            onClick={handleRefresh}
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
              onClick={() => setShowFilter((v) => !v)}
              title="Filter"
            >
              <Filter className="w-4 h-4 mr-2 text-blue-600" />
              Filter
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>
            {showFilter && <FilterPanel />}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Employees"
          value="6"
          change="+2 this month"
          trend="up"
        />
        <StatCard
          icon={DollarSign}
          title="Total Payroll"
          value="$505K"
          change="+8.2%"
          trend="up"
        />
        <StatCard
          icon={Award}
          title="Avg Performance"
          value="90.3%"
          change="+2.1%"
          trend="up"
        />
        <StatCard
          icon={Target}
          title="Task Completion"
          value="83.4%"
          change="+5.3%"
          trend="up"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance & Satisfaction Trends</h3>
            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Area Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="performance" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="satisfaction" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Task Distribution</h3>
            <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">Pie Chart</span>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
            <span className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full">Bar Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hiring & Departure Trends</h3>
            <span className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded-full">Line Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hiringTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="departures" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
          <button
            className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs hover:bg-blue-100 transition"
            onClick={handleDownload}
            title="Download Table"
          >
            <Download className="w-4 h-4 mr-1" />
            Export Table
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentData.map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.employees}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${dept.budget.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 mr-2">{dept.performance}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dept.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      dept.performance >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : dept.performance >= 85 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dept.performance >= 90 ? 'Excellent' : dept.performance >= 85 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow hover:shadow-lg transition">
          <div className="flex items-center mb-3">
            <Activity className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Productivity Insight</h4>
          </div>
          <p className="text-blue-800 text-sm">Team productivity has increased by 15% this quarter, with Design department leading at 95% performance.</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow hover:shadow-lg transition">
          <div className="flex items-center mb-3">
            <Clock className="w-6 h-6 text-green-600 mr-2" />
            <h4 className="font-semibold text-green-900">Efficiency Trend</h4>
          </div>
          <p className="text-green-800 text-sm">Task completion rate has improved to 83.4%, with most tasks being completed ahead of schedule.</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow hover:shadow-lg transition">
          <div className="flex items-center mb-3">
            <Award className="w-6 h-6 text-purple-600 mr-2" />
            <h4 className="font-semibold text-purple-900">Recognition</h4>
          </div>
          <p className="text-purple-800 text-sm">3 employees have exceeded performance targets this month, contributing to overall team success.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;