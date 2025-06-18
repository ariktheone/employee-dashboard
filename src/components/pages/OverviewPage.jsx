import React from 'react';
import StatCard from '../../ui/StatCard.jsx';
import {
  Users,
  UserPlus,
  DollarSign,
  Award,
  Calendar,
  BarChart3,
  ChevronRight,
  ArrowRightCircle,
  Sparkle
} from 'lucide-react';

const OverviewPage = () => {
  const recentActivities = [
    { id: 1, action: 'New employee onboarded', user: 'Sarah Johnson', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Performance review completed', user: 'Michael Chen', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'Leave request approved', user: 'Emily Rodriguez', time: '1 day ago', type: 'warning' },
    { id: 4, action: 'Salary adjustment processed', user: 'David Park', time: '2 days ago', type: 'success' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today', type: 'meeting' },
    { id: 2, title: 'Performance Reviews', time: '2:00 PM', date: 'Tomorrow', type: 'review' },
    { id: 3, title: 'New Hire Orientation', time: '9:00 AM', date: 'Friday', type: 'orientation' },
    { id: 4, title: 'Department Sync', time: '3:00 PM', date: 'Monday', type: 'meeting' },
  ];

  // Example action handlers
  const handleViewAllActivities = () => {
    alert('View all activities functionality coming soon!');
  };
  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\n${event.time} • ${event.date}`);
  };

  return (
    <div className="space-y-10 px-4 md:px-6 py-6 bg-gradient-to-b from-slate-50 to-white min-h-screen relative overflow-x-hidden">
      {/* Decorative background assets */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      {/* Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="1,247"
          change="+12% this month"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatCard
          title="New Hires"
          value="23"
          change="+5% this month"
          icon={UserPlus}
          trend="up"
          color="green"
        />
        <StatCard
          title="Avg. Salary"
          value="$78,500"
          change="+3.2% this year"
          icon={DollarSign}
          trend="up"
          color="purple"
        />
        <StatCard
          title="Performance"
          value="92%"
          change="-2% this quarter"
          icon={Award}
          trend="down"
          color="orange"
        />
      </section>

      {/* Activities and Events */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition duration-200 hover:shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Sparkle className="w-6 h-6 text-indigo-400 animate-spin-slow" />
              Recent Activities
            </h2>
            <button
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline font-medium transition"
              onClick={handleViewAllActivities}
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-4">
            {recentActivities.map(({ id, action, user, time, type }) => (
              <li
                key={id}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 hover:bg-indigo-100/70 rounded-xl transition group cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`Activity: ${action}`}
                onClick={() => alert(`${action}\nBy: ${user}\n${time}`)}
              >
                <span
                  className={`mt-1 w-2.5 h-2.5 rounded-full ring-2 ring-white shadow ${
                    type === 'success' ? 'bg-green-500' :
                    type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition">{action}</p>
                  <p className="text-xs text-gray-500 mt-1">{user} • {time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none group-hover:opacity-20 transition">
            <BarChart3 className="w-32 h-32 text-indigo-200" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition duration-200 hover:shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-400 animate-bounce" />
              Upcoming Events
            </h2>
          </div>
          <ul className="space-y-4">
            {upcomingEvents.map((event) => (
              <li
                key={event.id}
                className="border border-gray-100 hover:border-indigo-200 p-4 bg-gradient-to-r from-blue-50 to-white hover:bg-indigo-50 rounded-xl transition flex items-center justify-between group cursor-pointer"
                onClick={() => handleEventClick(event)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${event.title}`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.time} • {event.date}</p>
                </div>
                <ArrowRightCircle className="w-5 h-5 text-indigo-300 group-hover:text-indigo-500 transition" />
              </li>
            ))}
          </ul>
          <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none group-hover:opacity-20 transition">
            <Calendar className="w-32 h-32 text-blue-200" />
          </div>
        </div>
      </section>

      {/* Performance Trends Placeholder */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition duration-200 hover:shadow-2xl relative overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-purple-400 animate-pulse" />
          Performance Trends
        </h2>
        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-100 rounded-lg relative">
          <div className="text-center animate-pulse z-10">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Performance analytics chart will be shown here</p>
          </div>
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
            <BarChart3 className="w-24 h-24 text-purple-200" />
          </div>
        </div>
      </section>
      {/* Custom Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OverviewPage;
