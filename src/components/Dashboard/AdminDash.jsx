import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="w-full bg-white shadow flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>

        <div className="relative group">
          <button className="flex items-center gap-2 bg-red-600 text-white rounded-full px-4 py-2">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </button>
          <div className="absolute right-0 hidden group-hover:block mt-2 bg-white shadow-lg rounded-md w-48">
            <div className="p-4">
              <p className="font-semibold">{user?.displayName || "Admin"}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <hr />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6">
        {/* User Management */}
        <h2 className="text-lg font-semibold mb-4">User Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { role: "Students", count: 1200 },
            { role: "Teachers", count: 45 },
            { role: "Developers", count: 12 },
            { role: "Interns", count: 85 },
          ].map((u, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-gray-800">{u.count}</h3>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
          ))}
        </div>

        {/* System Stats */}
        <h2 className="text-lg font-semibold mt-8 mb-4">System Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-gray-800">Active Users</h3>
            <p className="text-2xl font-semibold text-blue-600">1050</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-gray-800">Courses Available</h3>
            <p className="text-2xl font-semibold text-green-600">230</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-gray-800">Pending Requests</h3>
            <p className="text-2xl font-semibold text-red-600">18</p>
          </div>
        </div>
      </main>
    </div>
  );
}
