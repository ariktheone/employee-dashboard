import React, { useState } from 'react';
import clientsData from '../../data/clients.json';

const statusBadge = (status) =>
  status === 'Active'
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-gray-100 text-gray-700';

// Popup Modal for View/Edit
const ClientModal = ({ client, onClose, mode }) => {
  if (!client) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-blue-200 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
          {mode === 'edit' ? 'Edit Client' : 'Client Details'}
        </h3>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-blue-900">Name:</span> {client.name}
          </div>
          <div>
            <span className="font-semibold text-blue-900">Contact:</span> {client.contact}
          </div>
          <div>
            <span className="font-semibold text-blue-900">Status:</span>{' '}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${statusBadge(client.status)}`}>
              {client.status}
            </span>
          </div>
          <div>
            <span className="font-semibold text-blue-900">Location:</span> {client.location}
          </div>
          <div>
            <span className="font-semibold text-blue-900">Email:</span> {client.email}
          </div>
          <div>
            <span className="font-semibold text-blue-900">Phone:</span> {client.phone}
          </div>
        </div>
        {mode === 'edit' && (
          <div className="mt-6">
            <div className="text-blue-500 text-sm mb-2">Edit functionality coming soon!</div>
            {/* You can add form fields here for real editing */}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientsPage = () => {
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [modalClient, setModalClient] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const clients = clientsData;

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.contact.toLowerCase().includes(search.toLowerCase()) ||
      client.location.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (client, mode = 'view') => {
    setModalClient(client);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalClient(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Modal */}
      {modalClient && (
        <ClientModal client={modalClient} onClose={closeModal} mode={modalMode} />
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-1 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7V7a4 4 0 00-4-4H7a4 4 0 00-4 4v2m16 0v2a4 4 0 01-3 3.87M4 10v2a4 4 0 003 3.87"
                ></path>
              </svg>
            </span>
            Clients
          </h2>
          <p className="text-gray-500">Manage your company clients here.</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="px-4 py-2 rounded-lg border border-blue-100 bg-blue-50/60 text-blue-900 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className={`p-2 rounded-lg border border-blue-100 bg-white shadow transition ${view === 'grid' ? 'text-blue-600 bg-blue-50' : 'text-blue-400 hover:bg-blue-50'}`}
            onClick={() => setView('grid')}
            title="Grid View"
            aria-label="Grid View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
          </button>
          <button
            className={`p-2 rounded-lg border border-blue-100 bg-white shadow transition ${view === 'list' ? 'text-blue-600 bg-blue-50' : 'text-blue-400 hover:bg-blue-50'}`}
            onClick={() => setView('list')}
            title="List View"
            aria-label="List View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center font-medium shadow-lg"
            onClick={() => alert('Add Client functionality coming soon!')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Client
          </button>
        </div>
      </div>

      {/* Grid/List View */}
      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-blue-300 border border-blue-100 shadow-sm">
          No clients found.
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition h-full flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-lg font-bold text-blue-800">{client.name}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${statusBadge(client.status)}`}>
                    {client.status}
                  </span>
                </div>
                <div className="text-sm text-blue-600 mb-2">{client.contact}</div>
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{client.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
                  {client.email}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm16 0a2 2 0 00-2-2h-2a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2V5z" /></svg>
                  {client.phone}
                </div>
              </div>
              <div className="bg-blue-50 rounded-b-2xl px-6 py-3 flex justify-end gap-2">
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={() => openModal(client, 'view')}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 text-blue-700 hover:bg-blue-100 transition"
                  onClick={() => openModal(client, 'edit')}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-50">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase">Phone</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-semibold text-blue-900">{client.name}</td>
                  <td className="px-6 py-4">{client.contact}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${statusBadge(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{client.location}</span>
                  </td>
                  <td className="px-6 py-4">{client.email}</td>
                  <td className="px-6 py-4">{client.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition mr-2"
                      onClick={() => openModal(client, 'view')}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-xs rounded-lg bg-gray-100 text-blue-700 hover:bg-blue-100 transition"
                      onClick={() => openModal(client, 'edit')}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;