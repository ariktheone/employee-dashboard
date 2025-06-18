// components/ui/EmployeeCard.jsx
import React from 'react';
import { Target } from 'lucide-react';

const EmployeeCard = ({ employee, onClick }) => (
  <div 
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-blue-200"
    onClick={() => onClick(employee)}
  >
    <div className="flex items-center space-x-4">
      <div className="text-3xl">{employee.avatar}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <p className="text-xs text-gray-500">{employee.department}</p>
      </div>
      <div className="text-right">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {employee.status}
        </span>
        <div className="mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Target className="w-3 h-3 mr-1" />
            {employee.performance}%
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeeCard;