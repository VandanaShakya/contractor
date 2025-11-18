import React, { useState } from 'react';
import { User } from "lucide-react";
import { Link } from 'react-router-dom';
import Supervisor from './AdminSupervisor';



export default function ResponsiveAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateRange, setDateRange] = useState('Last 7 days');

  const menus = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'supervisors', label: 'Supervisors' },
    { key: 'assignments', label: 'Assignments' },
    { key: 'uploads', label: 'Uploads' },
    { key: 'reports', label: 'Reports' },
    { key: 'settings', label: 'Settings' },
  ];

  // Fake data for overview cards and uploads
  const kpis = {
    assignments: 128,
    uploadsToday: 24,
    activeSupervisors: 12,
    pending: 5,
  };

  const uploads = Array.from({ length: 8 }).map((_, i) => ({
    _id: `u-${i}`,
    imageUrl: `https://picsum.photos/seed/${i}/400/300`,
    supervisorName: `Supervisor ${i + 1}`,
    assignmentId: `ASG-${1000 + i}`,
    description: `Site visit and status update ${i + 1}`,
    lat: 28.6 + Math.random() * 0.1,
    lng: 77.2 + Math.random() * 0.1,
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    status: i % 3 === 0 ? 'pending' : 'approved',
  }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Topbar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* hamburger (mobile) */}
              <button
                className="md:hidden p-2 rounded hover:bg-gray-100"
                onClick={() => setSidebarOpen((s) => !s)}
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold">CT</div>
                <div className="hidden sm:block font-semibold">Contractor Admin</div>
              </div>
            </div>

            {/* Search / date / notifications / profile */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="Search supervisors, assignments..."
                  />
                </div>

                <div className="hidden sm:flex items-center gap-3">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option>Today</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Custom</option>
                  </select>

                  <button className="p-2 rounded hover:bg-gray-100" title="Notifications">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm hidden sm:block">Admin</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white border-r`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="text-sm font-semibold">Main Menu</div>
            </div>
            <nav className="p-4 space-y-1 flex-1 overflow-auto">
              {menus.map((m) => (
                <button
                  key={m.key}
                  onClick={() => { setActiveMenu(m.key); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-100 ${activeMenu === m.key ? 'bg-gray-100 font-medium' : ''}`}
                >
                  <span className="w-4 text-gray-500">•</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </nav>

<Link to="/admin-profile">
              <div className="p-4 border-t text-xs text-[#9cacab]">
  <button className="cursor-pointer text-gray-300 hover:text-white">
    <User size={22} className='text-[#02e9e5] border-1 border-[#2e9e5] rounded-2xl'/>
  </button>
</div>
</Link>

          </div>
        </aside>

        {/* Backdrop for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 min-h-screen ml-0 md:ml-64">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header inside main for small screens */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold capitalize">{activeMenu}</h2>
              <div className="flex items-center gap-3 sm:hidden">
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="border rounded px-2 py-1 text-sm">
                  <option>Today</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>

            {/* Dashboard content switcher */}
            {activeMenu === 'dashboard' && (
              <section className="space-y-6">
                {/* Overview cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-xs text-gray-500">Assignments</div>
                    <div className="text-2xl font-bold">{kpis.assignments}</div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-xs text-gray-500">Today's uploads</div>
                    <div className="text-2xl font-bold">{kpis.uploadsToday}</div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-xs text-gray-500">Supervisors active</div>
                    <div className="text-2xl font-bold">{kpis.activeSupervisors}</div>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-xs text-gray-500">Pending approvals</div>
                    <div className="text-2xl font-bold">{kpis.pending}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map + Filters */}
                  <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm min-h-[420px]">
                    <div className="h-96 border rounded flex items-center justify-center text-gray-400">
                      Map placeholder — integrate Leaflet/Google Maps
                    </div>
                  </div>

                  <aside className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold mb-2">Filters</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="block text-xs text-gray-500">Supervisor</label>
                        <input className="w-full border rounded px-2 py-1 mt-1" placeholder="Search supervisor" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Status</label>
                        <select className="w-full border rounded px-2 py-1 mt-1 text-sm">
                          <option>All</option>
                          <option>Pending</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Date range</label>
                        <input type="date" className="w-full border rounded px-2 py-1 mt-1" />
                        <input type="date" className="w-full border rounded px-2 py-1 mt-1" />
                      </div>
                      <button className="w-full bg-blue-600 text-white px-3 py-2 rounded">Apply</button>
                    </div>
                  </aside>
                </div>

                {/* Recent uploads list */}
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold mb-3">Recent uploads</h3>
                  <div className="space-y-3 max-h-80 overflow-auto">
                    {uploads.map((u) => (
                      <div key={u._id} className="flex gap-3 border-b pb-3">
                        <img src={u.imageUrl} alt="" className="w-24 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold">{u.supervisorName}</div>
                              <div className="text-xs text-gray-500">{u.assignmentId}</div>
                            </div>
                            <div className="text-xs text-gray-500 text-right">{new Date(u.createdAt).toLocaleString()}</div>
                          </div>
                          <div className="text-sm mt-2">{u.description}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => setSelectedItem(u)} className="text-xs px-2 py-1 border rounded">View</button>
                            <button className="text-xs px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                            <button className="text-xs px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail panel (slide-in on select) */}
                {selectedItem && (
                  <div className="fixed right-4 bottom-6 w-96 bg-white rounded shadow-lg p-4 z-50">
                    <div className="flex items-start gap-3">
                      <img src={selectedItem.imageUrl} alt="" className="w-28 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{selectedItem.supervisorName}</div>
                        <div className="text-xs text-gray-500">{selectedItem.assignmentId}</div>
                        <div className="text-sm mt-2">{selectedItem.description}</div>
                        <div className="text-xs text-gray-500 mt-2">Lat: {selectedItem.lat.toFixed(4)}, Lng: {selectedItem.lng.toFixed(4)}</div>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
                          <button onClick={() => setSelectedItem(null)} className="px-3 py-1 border rounded">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </section>
            )}

            {activeMenu === 'supervisors' && (
             <Supervisor/>
            )}

            {activeMenu === 'assignments' && (
              <section className="space-y-6">
                <div className="bg-white p-4 rounded shadow-sm">Assignments timeline / gallery</div>
                <div className="bg-white p-4 rounded shadow-sm">Assignment details</div>
              </section>
            )}

            {activeMenu === 'uploads' && (
              <section className="space-y-6">
                <div className="bg-white p-4 rounded shadow-sm">Uploads management</div>
                <div className="bg-white p-4 rounded shadow-sm">Upload detail panel</div>
              </section>
            )}

            {activeMenu === 'reports' && (
              <section className="space-y-6">
                <div className="bg-white p-4 rounded shadow-sm">Reports & exports</div>
              </section>
            )}

            {activeMenu === 'settings' && (
              <section className="space-y-6">
                <div className="bg-white p-4 rounded shadow-sm">Settings</div>
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}




// // src/pages/DashboardSkeleton.jsx
// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from '../../features/authSlice';
// import { Link, useNavigate } from 'react-router-dom';

// export default function AdminDashboard() {
//   const { user } = useAuth();
//   const [kpis, setKpis] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [filters, setFilters] = useState({ supervisor: '', status: '', from: '', to: '' });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const [kpiRes, uploadsRes] = await Promise.all([
//           axiosInstance.get('/api/dashboard/kpis'),
//           axiosInstance.get('/api/uploads?limit=20'),
//         ]);
//         setKpis(kpiRes.data);
//         setUploads(uploadsRes.data.uploads ?? uploadsRes.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user]);

//   if (!user) return <div>Please login</div>;
//   if (loading) return <div>Loading dashboard...</div>;

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-4 hidden md:block">
//         <h2 className="text-xl font-semibold mb-4">Admin</h2>
//         <nav className="space-y-2 text-sm">
//           <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
//           <Link to="/supervisors" className="block p-2 rounded hover:bg-gray-100">Supervisors</Link>
//           <Link to="/assignments" className="block p-2 rounded hover:bg-gray-100">Assignments</Link>
//           <Link to="/uploads" className="block p-2 rounded hover:bg-gray-100">Uploads</Link>
//           <Link to="/reports" className="block p-2 rounded hover:bg-gray-100">Reports</Link>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6">
//         <header className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p className="text-sm text-gray-600">Welcome back, {user.name ?? user.email}</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Search supervisors, assignments..."
//               className="border rounded px-3 py-2"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   // implement search handler
//                 }
//               }}
//             />
//             <button onClick={() => navigate('/reports')} className="px-3 py-2 bg-blue-600 text-white rounded">Reports</button>
//           </div>
//         </header>

//         {/* KPIs */}
//         <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-4 rounded shadow-sm">
//             <div className="text-xs text-gray-500">Assignments</div>
//             <div className="text-2xl font-bold">{kpis?.assignments ?? '-'}</div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-sm">
//             <div className="text-xs text-gray-500">Today's uploads</div>
//             <div className="text-2xl font-bold">{kpis?.uploadsToday ?? '-'}</div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-sm">
//             <div className="text-xs text-gray-500">Supervisors active</div>
//             <div className="text-2xl font-bold">{kpis?.activeSupervisors ?? '-'}</div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-sm">
//             <div className="text-xs text-gray-500">Pending approvals</div>
//             <div className="text-2xl font-bold">{kpis?.pending ?? '-'}</div>
//           </div>
//         </section>

//         {/* Map + Feed */}
//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm min-h-[480px]">
//             {/* TODO: Integrate map here (Leaflet or Google Maps) */}
//             <div className="h-[420px] border rounded flex items-center justify-center text-gray-400">
//               Map placeholder — integrate Leaflet/Google Maps & plot uploads
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded shadow-sm">
//             <h3 className="font-semibold mb-3">Recent uploads</h3>
//             <div className="space-y-3 max-h-[480px] overflow-auto">
//               {uploads.map((u) => (
//                 <div key={u._id} className="flex gap-3 border-b pb-3">
//                   <img src={u.imageUrl} alt="" className="w-20 h-20 object-cover rounded" />
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="text-sm font-semibold">{u.supervisorName}</div>
//                         <div className="text-xs text-gray-500">{u.assignmentId}</div>
//                       </div>
//                       <div className="text-xs text-gray-500">{new Date(u.createdAt).toLocaleString()}</div>
//                     </div>
//                     <div className="text-sm mt-2">{u.description?.slice(0, 120)}</div>
//                     <div className="mt-2 flex items-center gap-2">
//                       <a className="text-xs text-blue-600 underline" target="_blank" rel="noreferrer"
//                          href={`https://www.google.com/maps?q=${u.lat},${u.lng}`}>View map</a>
//                       <button className="text-xs px-2 py-1 border rounded">View</button>
//                       <button className="text-xs px-2 py-1 bg-green-600 text-white rounded">Approve</button>
//                       <button className="text-xs px-2 py-1 bg-red-600 text-white rounded">Reject</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {uploads.length === 0 && <div className="text-gray-500">No uploads yet</div>}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
