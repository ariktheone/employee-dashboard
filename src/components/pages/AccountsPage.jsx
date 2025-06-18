import React, { useState, useMemo } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  EyeOff,
  Filter,
  Download,
  Plus,
  MoreVertical,
  AlertCircle,
  CheckCircle
} from "lucide-react";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement, 
  PointElement,
  LineElement,
  Tooltip, 
  Legend,
  Filler
);

const accounts = [
  {
    id: 1,
    name: "Main Company Account",
    type: "Bank",
    balance: 120000,
    currency: "USD",
    number: "**** 1234",
    status: "Active",
    bank: "Chase Bank",
    lastTransaction: "2025-05-29",
    monthlyChange: 5.2,
  },
  {
    id: 2,
    name: "Petty Cash",
    type: "Cash",
    balance: 2500,
    currency: "USD",
    number: "N/A",
    status: "Active",
    bank: "Office Safe",
    lastTransaction: "2025-05-30",
    monthlyChange: -2.1,
  },
  {
    id: 3,
    name: "Vendor Payments",
    type: "Bank",
    balance: 34000,
    currency: "USD",
    number: "**** 5678",
    status: "Active",
    bank: "Wells Fargo",
    lastTransaction: "2025-05-28",
    monthlyChange: 12.8,
  },
  {
    id: 4,
    name: "Salary Account",
    type: "Bank",
    balance: 50000,
    currency: "USD",
    number: "**** 9012",
    status: "Inactive",
    bank: "Bank of America",
    lastTransaction: "2025-04-15",
    monthlyChange: 0,
  },
];

const trendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Total Balance',
      data: [180000, 185000, 195000, 200000, 206500],
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3b82f6',
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
    },
  ],
};

const AccountsPage = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const filteredAccounts = useMemo(() => {
    if (selectedFilter === 'All') return accounts;
    if (selectedFilter === 'Active') return accounts.filter(a => a.status === 'Active');
    if (selectedFilter === 'Bank') return accounts.filter(a => a.type === 'Bank');
    if (selectedFilter === 'Cash') return accounts.filter(a => a.type === 'Cash');
    return accounts;
  }, [selectedFilter]);

  const stats = useMemo(() => {
    const total = filteredAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const active = filteredAccounts.filter(a => a.status === 'Active').length;
    const bank = filteredAccounts.filter(a => a.type === 'Bank').length;
    const cash = filteredAccounts.filter(a => a.type === 'Cash').length;
    const avgChange = filteredAccounts.reduce((sum, acc) => sum + acc.monthlyChange, 0) / filteredAccounts.length;
    
    return { total, active, bank, cash, avgChange };
  }, [filteredAccounts]);

  const barData = {
    labels: filteredAccounts.map(a => a.name.split(' ')[0]),
    datasets: [
      {
        label: "Balance (USD)",
        data: filteredAccounts.map(a => a.balance),
        backgroundColor: [
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        ],
        borderRadius: 12,
        borderSkipped: false,
        maxBarThickness: 60,
      },
    ],
  };

  const doughnutData = {
    labels: filteredAccounts.map(a => a.name),
    datasets: [
      {
        label: "Balance Distribution",
        data: filteredAccounts.map(a => a.balance),
        backgroundColor: [
          '#667eea',
          '#f093fb',
          '#4facfe',
          '#43e97b',
        ],
        borderWidth: 0,
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff',
      },
    ],
  };

  const getStatusIcon = (status) => {
    return status === 'Active' ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const formatBalance = (balance) => {
    return balanceVisible ? `$${balance.toLocaleString()}` : '••••••';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Accounts Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage and monitor all your financial accounts</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white transition-all duration-200 shadow-sm"
            >
              {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {balanceVisible ? 'Hide' : 'Show'} Balances
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm">
              <Plus className="w-4 h-4" />
              Add Account
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatBalance(stats.total)}
                </p>
                <p className={`text-sm mt-1 ${getChangeColor(stats.avgChange)}`}>
                  {stats.avgChange > 0 ? '+' : ''}{stats.avgChange.toFixed(1)}% this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                <p className="text-sm text-green-600 mt-1">All systems operational</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bank Accounts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.bank}</p>
                <p className="text-sm text-gray-500 mt-1">Across {stats.bank} institutions</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash Accounts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.cash}</p>
                <p className="text-sm text-gray-500 mt-1">Physical holdings</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Balance Trend</h2>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="h-64">
              <Line 
                data={trendData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#ffffff',
                      bodyColor: '#ffffff',
                      borderColor: '#3b82f6',
                      borderWidth: 1,
                    }
                  },
                  scales: {
                    y: { 
                      beginAtZero: false,
                      grid: { color: 'rgba(0, 0, 0, 0.05)' },
                      ticks: { color: '#6b7280' }
                    },
                    x: { 
                      grid: { display: false },
                      ticks: { color: '#6b7280' }
                    }
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribution</h2>
            <div className="flex justify-center">
              <div className="w-48 h-48">
                <Doughnut 
                  data={doughnutData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { 
                        position: "bottom",
                        labels: { 
                          padding: 20,
                          usePointStyle: true,
                          font: { size: 12 }
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                      }
                    },
                    cutout: "65%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <div className="flex gap-3">
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Accounts</option>
                  <option value="Active">Active Only</option>
                  <option value="Bank">Bank Accounts</option>
                  <option value="Cash">Cash Accounts</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredAccounts.map((account) => (
                  <tr 
                    key={account.id} 
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedAccount(account)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            account.type === 'Bank' ? 'bg-blue-100' : 'bg-orange-100'
                          }`}>
                            {account.type === 'Bank' ? 
                              <CreditCard className="w-5 h-5 text-blue-600" /> : 
                              <Wallet className="w-5 h-5 text-orange-600" />
                            }
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">{account.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{account.type}</div>
                      <div className="text-sm text-gray-500">{account.bank}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatBalance(account.balance)}
                      </div>
                      <div className="text-sm text-gray-500">{account.currency}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${getChangeColor(account.monthlyChange)}`}>
                        {account.monthlyChange > 0 ? '+' : ''}{account.monthlyChange.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500">this month</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(account.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          account.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;