import React, { useState, useMemo, useCallback } from 'react';
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  User,
  List,
  Search,
  Filter,
  Users,
  TrendingUp,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Award,
  Smile,
  Frown,
  ArrowRightCircle,
} from 'lucide-react';
import attendanceData from '../../data/attendance.json';

// Flatten attendance.json structure for UI
const flattenAttendance = (data) => {
  const flat = [];
  data.forEach((emp) => {
    emp.records.forEach((rec) => {
      flat.push({
        id: `${emp.name}-${rec.date}`,
        name: emp.name,
        avatar: emp.avatar,
        department: emp.department,
        ...rec
      });
    });
  });
  return flat;
};

// Enhanced Calendar Component
const AttendanceCalendar = React.memo(({ value, onChange, attendance }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const statsByDay = useMemo(() => {
    const stats = {};
    attendance.forEach((item) => {
      const d = new Date(item.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!stats[day]) stats[day] = { present: 0, absent: 0, leave: 0, late: 0 };
        stats[day][item.status === 'Present' ? 'present' : item.status === 'Absent' ? 'absent' : 'leave']++;
        if (item.late) stats[day].late++;
      }
    });
    return stats;
  }, [attendance, month, year]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const navigateMonth = useCallback((direction) => {
    if (direction === 'prev') {
      if (month === 0) {
        setMonth(11);
        setYear(y => y - 1);
      } else {
        setMonth(m => m - 1);
      }
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(y => y + 1);
      } else {
        setMonth(m => m + 1);
      }
    }
  }, [month]);

  const renderCalendarDay = useCallback((day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isSelected = value === dateStr;
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const stats = statsByDay[day] || { present: 0, absent: 0, leave: 0, late: 0 };

    const indicators = [];
    if (stats.present > 0) indicators.push({ type: 'P', count: stats.present, color: 'bg-emerald-100 text-emerald-700' });
    if (stats.absent > 0) indicators.push({ type: 'A', count: stats.absent, color: 'bg-red-100 text-red-700' });
    if (stats.leave > 0) indicators.push({ type: 'L', count: stats.leave, color: 'bg-blue-100 text-blue-700' });

    return (
      <button
        key={day}
        className={`
          group relative h-20 w-full flex flex-col items-center justify-center 
          rounded-2xl border-2 transition-all duration-200 hover:scale-105
          ${isSelected
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg scale-105'
            : isToday
            ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-md'
            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md'
          }
        `}
        onClick={() => onChange(dateStr)}
        type="button"
      >
        <span className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : ''}`}>{day}</span>
        <div className="flex gap-1 flex-wrap justify-center">
          {indicators.slice(0, 2).map((indicator, i) => (
            <span key={i} className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${isSelected ? 'bg-white/20 text-white' : indicator.color}`}>
              {indicator.count}{indicator.type}
            </span>
          ))}
          {indicators.length > 2 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
              +{indicators.length - 2}
            </span>
          )}
        </div>
        {stats.late > 0 && (
          <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${isSelected ? 'bg-yellow-300' : 'bg-yellow-400'}`} title={`${stats.late} late`} />
        )}
      </button>
    );
  }, [value, onChange, today, month, year, statsByDay]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-110"
          onClick={() => navigateMonth('prev')}
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-blue-800 tracking-wide flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-400" />
          {monthNames[month]} {year}
        </h2>
        <button
          className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-110"
          onClick={() => navigateMonth('next')}
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-blue-400 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => renderCalendarDay(i + 1))}
      </div>
    </div>
  );
});

// Enhanced Statistics Component
const AttendanceStats = React.memo(({ summary }) => {
  const stats = [
    { label: 'Present', value: summary.present, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Absent', value: summary.absent, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { label: 'Late', value: summary.late, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'On Leave', value: summary.leave, icon: User, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
        <div key={label} className={`${bg} ${border} border rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-105`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
        </div>
      ))}
    </div>
  );
});

// Enhanced Filter Controls
const FilterControls = React.memo(({ filters, onFilterChange }) => {
  const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'HR'];
  const statusOptions = ['All', 'Present', 'Absent', 'On Leave'];

  return (
    <div className="bg-white rounded-xl shadow border border-blue-100 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px]"
            value={filters.department}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <select
            className="px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[120px]"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <button
            className={`flex items-center px-4 py-3 rounded-xl border transition-all duration-200 ${
              filters.lateOnly
                ? 'bg-amber-100 border-amber-300 text-amber-700 shadow-sm'
                : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => onFilterChange('lateOnly', !filters.lateOnly)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Late Only
          </button>
        </div>
      </div>
    </div>
  );
});

// Main Component
const AttendancePage = () => {
  const flatAttendance = useMemo(() => flattenAttendance(attendanceData), []);
  
  const [filters, setFilters] = useState({
    department: 'All',
    status: 'All',
    search: '',
    lateOnly: false
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [view, setView] = useState('calendar');

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Optimized filtering
  const filteredAttendance = useMemo(() => {
    return flatAttendance.filter(item => {
      const matchesDept = filters.department === 'All' || item.department === filters.department;
      const matchesStatus = filters.status === 'All' || item.status === filters.status;
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.department.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLate = !filters.lateOnly || item.late;
      const matchesDate = item.date === selectedDate;
      return matchesDept && matchesStatus && matchesSearch && matchesLate && matchesDate;
    });
  }, [flatAttendance, filters, selectedDate]);

  // Optimized summary calculation
  const summary = useMemo(() => {
    const dayData = flatAttendance.filter(a => a.date === selectedDate);
    return {
      present: dayData.filter(a => a.status === 'Present').length,
      absent: dayData.filter(a => a.status === 'Absent').length,
      leave: dayData.filter(a => a.status === 'On Leave').length,
      late: dayData.filter(a => a.late).length,
      total: dayData.length
    };
  }, [flatAttendance, selectedDate]);

  // Get unique dates for date picker
  const availableDates = useMemo(() => {
    const dates = [...new Set(flatAttendance.map(item => item.date))].sort().reverse();
    return dates;
  }, [flatAttendance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <CalendarDays className="w-8 h-8 text-blue-600" />
              </div>
              Attendance Management
            </h1>
            <p className="text-blue-600 mt-2">Track and manage employee attendance records efficiently</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-all duration-200">
              <Download className="w-4 h-4 mr-2 text-blue-600" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics */}
        <AttendanceStats summary={summary} />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-blue-100">
            <button
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                view === 'calendar'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={() => setView('calendar')}
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Calendar View
            </button>
            <button
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                view === 'list'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={() => setView('list')}
            >
              <List className="w-5 h-5 mr-2" />
              List View
            </button>
          </div>
          
          <div className="text-sm text-blue-600 bg-white px-4 py-2 rounded-xl border border-blue-100">
            Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Filters */}
        <FilterControls filters={filters} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        {view === 'calendar' ? (
          <div className="flex justify-center">
            <AttendanceCalendar 
              value={selectedDate} 
              onChange={setSelectedDate} 
              attendance={flatAttendance} 
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Date Selector */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 p-2 min-w-max">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedDate === date
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-blue-700 border border-blue-100 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      weekday: 'short'
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Employee</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Department</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Check In</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Check Out</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Hours</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {filteredAttendance.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <Smile className="w-12 h-12 text-blue-200 mx-auto mb-3" />
                          <p className="text-blue-500 font-medium">No attendance records found</p>
                          <p className="text-blue-400 text-sm">Try adjusting your filters</p>
                        </td>
                      </tr>
                    ) : (
                      filteredAttendance.map(item => {
                        const hours = item.checkIn && item.checkOut 
                          ? ((new Date(`1970-01-01T${item.checkOut}:00`) - new Date(`1970-01-01T${item.checkIn}:00`)) / (1000 * 60 * 60)).toFixed(1)
                          : '--';
                        
                        return (
                          <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.avatar}</span>
                                <span className="font-semibold text-blue-900">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-blue-600 font-medium">{item.department}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  item.status === 'Present' 
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : item.status === 'Absent'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {item.status}
                                </span>
                                {item.late && (
                                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                                    Late
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-blue-700">{item.checkIn || '--'}</td>
                            <td className="px-6 py-4 font-mono text-blue-700">{item.checkOut || '--'}</td>
                            <td className="px-6 py-4 font-mono text-blue-700">{hours}h</td>
                            <td className="px-6 py-4 text-sm text-blue-500">{item.remarks || '--'}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Custom animation for fadeIn */}
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
      `}</style>
    </div>
  );
};

export default AttendancePage;