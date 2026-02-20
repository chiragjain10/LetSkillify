import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function DeveloperDashboard() {
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
        <h1 className="text-xl font-bold text-gray-700">Developer Dashboard</h1>

        <div className="relative group">
          <button className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-2">
            {user?.email?.charAt(0).toUpperCase() || "D"}
          </button>
          <div className="absolute right-0 hidden group-hover:block mt-2 bg-white shadow-lg rounded-md w-48">
            <div className="p-4">
              <p className="font-semibold">{user?.displayName || "Developer"}</p>
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
        {/* Projects */}
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example project card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x150"
              alt="Project"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">Portfolio Website</h3>
              <p className="text-sm text-gray-500">React + Tailwind project</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x150"
              alt="Project"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">REST API Backend</h3>
              <p className="text-sm text-gray-500">Node.js + Express</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Filter by Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {["React", "Node.js", "MongoDB", "DevOps", "API Integration"].map(
            (tech, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                {tech}
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
}
