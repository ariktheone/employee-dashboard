import React, { useState, useMemo } from "react";
import {
  Calendar, Gift, Sun, Snowflake, Users, ChevronLeft, ChevronRight, Plus, XCircle,
  Search, Filter, Download, Eye, EyeOff, Star, MapPin, Clock, Info
} from "lucide-react";


// Sample holiday data for the year
const holidays = [
  { id: 1, date: "2025-01-01", name: "New Year's Day", type: "Public", location: "National", importance: "high", icon: <Sun className="w-4 h-4 text-yellow-500" />, description: "Start of the Gregorian calendar year" },
  { id: 2, date: "2025-01-14", name: "Makar Sankranti", type: "Festival", location: "Regional", importance: "medium", icon: <Gift className="w-4 h-4 text-orange-500" />, description: "Hindu harvest festival marking the sun's transition" },
  { id: 3, date: "2025-01-26", name: "Republic Day", type: "Public", location: "National", importance: "high", icon: <Sun className="w-4 h-4 text-green-500" />, description: "Commemorates the adoption of the Constitution of India" },
  { id: 4, date: "2025-03-17", name: "Holi", type: "Festival", location: "National", importance: "high", icon: <Gift className="w-4 h-4 text-pink-500" />, description: "Festival of colors celebrating spring" },
  { id: 5, date: "2025-04-14", name: "Good Friday", type: "Public", location: "National", importance: "medium", icon: <Sun className="w-4 h-4 text-purple-500" />, description: "Christian commemoration of Jesus Christ's crucifixion" },
  { id: 6, date: "2025-05-01", name: "Labour Day", type: "Public", location: "National", importance: "medium", icon: <Sun className="w-4 h-4 text-blue-500" />, description: "International Workers' Day" },
  { id: 7, date: "2025-08-15", name: "Independence Day", type: "Public", location: "National", importance: "high", icon: <Sun className="w-4 h-4 text-orange-600" />, description: "Commemorates India's independence from British rule" },
  { id: 8, date: "2025-10-02", name: "Gandhi Jayanti", type: "Public", location: "National", importance: "high", icon: <Sun className="w-4 h-4 text-green-600" />, description: "Birthday of Mahatma Gandhi" },
  { id: 9, date: "2025-10-20", name: "Durga Puja", type: "Festival", location: "Regional", importance: "high", icon: <Gift className="w-4 h-4 text-red-500" />, description: "Hindu festival celebrating Goddess Durga" },
  { id: 10, date: "2025-11-01", name: "Diwali", type: "Festival", location: "National", importance: "high", icon: <Gift className="w-4 h-4 text-yellow-600" />, description: "Festival of lights" },
  { id: 11, date: "2025-11-15", name: "Guru Nanak Jayanti", type: "Festival", location: "National", importance: "medium", icon: <Gift className="w-4 h-4 text-blue-600" />, description: "Birthday of Guru Nanak" },
  { id: 12, date: "2025-12-25", name: "Christmas", type: "Festival", location: "National", importance: "high", icon: <Snowflake className="w-4 h-4 text-blue-400" />, description: "Christian celebration of Jesus Christ's birth" },
];

// Helper to get month name
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const HolidayPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [modalMonth, setModalMonth] = useState(selectedMonth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "Public",
    importance: "medium",
    description: ""
  });

  // Group holidays by month
  const holidaysByMonth = useMemo(() => 
    Array.from({ length: 12 }, (_, i) =>
      holidays.filter(h => new Date(h.date).getMonth() === i)
    ), []
  );

  // Filter holidays based on search and type
  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All" || holiday.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const handlePrev = () => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  const handleNext = () => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));

  const handleAddHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      // In a real app, you'd add the holiday to your state/database
      console.log("Adding holiday:", newHoliday);
      setShowAddModal(false);
      setNewHoliday({
        name: "",
        date: "",
        type: "Public",
        importance: "medium",
        description: ""
      });
      alert("Holiday added successfully!");
    }
  };

  const handleMonthClick = (i) => {
    setModalMonth(i);
    setShowMonthModal(true);
  };

  const handleExportCalendar = () => {
    // In a real app, this would generate and download a calendar file
    alert("Calendar exported! (Demo)");
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    return type === "Public" 
      ? "bg-blue-100 text-blue-700 border-blue-200" 
      : "bg-purple-100 text-purple-700 border-purple-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Holiday Calendar</h1>
                  <p className="text-sm text-gray-500">2025 • {filteredHolidays.length} holidays</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                  showFilters ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-700'
                } hover:bg-gray-50 transition-colors`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <button
                onClick={handleExportCalendar}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Holiday
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          {showFilters && (
            <div className="pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search holidays..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Types</option>
                    <option value="Public">Public Holidays</option>
                    <option value="Festival">Festivals</option>
                  </select>
                  
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 text-sm ${
                        viewMode === "grid" 
                          ? "bg-blue-50 text-blue-600 border-r border-gray-300" 
                          : "text-gray-500 hover:text-gray-700 border-r border-gray-300"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 text-sm ${
                        viewMode === "list" 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Navigator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-2xl font-semibold text-gray-900 min-w-32 text-center">
            {monthNames[selectedMonth]}
          </div>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {viewMode === "grid" ? (
          /* Year Calendar Grid */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {monthNames.map((month, i) => (
                <div
                  key={month}
                  className={`rounded-lg p-4 border-2 cursor-pointer transition-all duration-200 ${
                    i === selectedMonth
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => handleMonthClick(i)}
                >
                  <div className="text-lg font-semibold text-gray-900 mb-3">{month}</div>
                  <div className="space-y-2">
                    {holidaysByMonth[i].length === 0 ? (
                      <div className="text-sm text-gray-400 text-center py-2">No holidays</div>
                    ) : (
                      holidaysByMonth[i].slice(0, 3).map((h) => (
                        <div key={h.id} className="flex items-center space-x-2 bg-gray-50 rounded-md px-2 py-1">
                          {h.icon}
                          <span className="text-xs font-medium text-gray-700 truncate flex-1">{h.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(h.type)}`}>
                            {h.type.charAt(0)}
                          </span>
                        </div>
                      ))
                    )}
                    {holidaysByMonth[i].length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{holidaysByMonth[i].length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Holidays</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredHolidays.map((holiday) => (
                <div key={holiday.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {holiday.icon}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium text-gray-900">{holiday.name}</h3>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(holiday.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {holiday.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{holiday.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(holiday.type)}`}>
                        {holiday.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getImportanceColor(holiday.importance)}`}>
                        {holiday.importance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Month Holidays */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Gift className="w-5 h-5 text-blue-600" />
              <span>Holidays in {monthNames[selectedMonth]}</span>
            </h2>
            <span className="text-sm text-gray-500">
              {holidaysByMonth[selectedMonth].length} holiday{holidaysByMonth[selectedMonth].length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-3">
            {holidaysByMonth[selectedMonth].length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No holidays this month</p>
              </div>
            ) : (
              holidaysByMonth[selectedMonth].map((holiday) => (
                <div key={holiday.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  {holiday.icon}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-medium text-gray-900">{holiday.name}</h3>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(holiday.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {holiday.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{holiday.description}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className={`text-xs px-2 py-1 rounded-full border text-center ${getTypeColor(holiday.type)}`}>
                      {holiday.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border text-center ${getImportanceColor(holiday.importance)}`}>
                      {holiday.importance}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Month Modal */}
      {showMonthModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowMonthModal(false)} />
            
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{monthNames[modalMonth]} Holidays</span>
                  </h3>
                  <button
                    onClick={() => setShowMonthModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {holidaysByMonth[modalMonth].length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No holidays this month</p>
                    </div>
                  ) : (
                    holidaysByMonth[modalMonth].map((holiday) => (
                      <div key={holiday.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                        {holiday.icon}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">{holiday.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(holiday.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(holiday.type)}`}>
                          {holiday.type}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Holiday Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowAddModal(false)} />
            
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-blue-600" />
                    <span>Add New Holiday</span>
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Name</label>
                    <input
                      type="text"
                      value={newHoliday.name}
                      onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                      placeholder="Enter holiday name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newHoliday.date}
                      onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select 
                        value={newHoliday.type}
                        onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Public">Public Holiday</option>
                        <option value="Festival">Festival</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Importance</label>
                      <select 
                        value={newHoliday.importance}
                        onChange={(e) => setNewHoliday({...newHoliday, importance: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={newHoliday.description}
                      onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
                      placeholder="Enter holiday description"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddHoliday}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Add Holiday
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayPage;