import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Edit, Eye, Trash2, CheckCircle2 } from 'lucide-react';

const EmployeeDetailModal = ({ employee, onClose }) => {
  const [mode, setMode] = useState('view'); // view | edit | confirmDelete

  if (!employee) return null;

  // Simulated edit form (for demo)
  const [editData, setEditData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    location: employee.location,
    position: employee.position,
    department: employee.department,
  });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    // Here you would call an API or update state in parent
    setMode('view');
    // Optionally show a toast/snackbar
  };

  const handleDelete = () => {
    // Here you would call an API or update state in parent
    setMode('deleted');
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-200 animate-fadeIn relative">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg">{employee.avatar}</span>
            {mode === 'edit'
              ? 'Edit Employee'
              : mode === 'confirmDelete'
              ? 'Confirm Delete'
              : mode === 'deleted'
              ? 'Employee Deleted'
              : 'Employee Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-blue-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Deleted State */}
          {mode === 'deleted' && (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
              <div className="text-lg font-semibold text-green-700">Employee deleted!</div>
            </div>
          )}

          {/* Edit State */}
          {mode === 'edit' && (
            <form
              className="space-y-6"
              onSubmit={e => {
                e.preventDefault();
                handleEditSave();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Name</label>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Email</label>
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Phone</label>
                  <input
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Location</label>
                  <input
                    name="location"
                    value={editData.location}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Position</label>
                  <input
                    name="position"
                    value={editData.position}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Department</label>
                  <input
                    name="department"
                    value={editData.department}
                    onChange={handleEditChange}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  onClick={() => setMode('view')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Confirm Delete State */}
          {mode === 'confirmDelete' && (
            <div className="flex flex-col items-center justify-center py-8">
              <Trash2 className="w-12 h-12 text-red-400 mb-4" />
              <div className="text-lg font-semibold text-red-700 mb-2">Are you sure you want to delete this employee?</div>
              <div className="flex gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  onClick={() => setMode('view')}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          )}

          {/* View State */}
          {mode === 'view' && (
            <>
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-6xl">{employee.avatar}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{employee.name}</h3>
                  <p className="text-lg text-gray-600">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Employment Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Salary:</span>
                      <span className="text-sm font-medium">{employee.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Join Date:</span>
                      <span className="text-sm font-medium">{employee.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Performance:</span>
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tasks:</span>
                      <span className="text-sm font-medium">{employee.completedTasks}/{employee.tasks}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={() => setMode('edit')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Employee
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => window.open(`mailto:${employee.email}`)}
                  title="Send Email"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setMode('confirmDelete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;