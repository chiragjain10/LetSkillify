import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function TeacherDashboard() {
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
        <h1 className="text-xl font-bold text-gray-700">Teacher Dashboard</h1>

        <div className="relative group">
          <button className="flex items-center gap-2 bg-green-600 text-white rounded-full px-4 py-2">
            {user?.email?.charAt(0).toUpperCase() || "T"}
          </button>
          <div className="absolute right-0 hidden group-hover:block mt-2 bg-white shadow-lg rounded-md w-48">
            <div className="p-4">
              <p className="font-semibold">{user?.displayName || "Teacher"}</p>
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
        {/* Classes */}
        <h2 className="text-lg font-semibold mb-4">Your Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example class cards */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x150"
              alt="Class"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">Mathematics 101</h3>
              <p className="text-sm text-gray-500">Algebra & Geometry basics</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x150"
              alt="Class"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">Computer Science</h3>
              <p className="text-sm text-gray-500">Intro to Programming</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Filter by Subjects</h2>
        <div className="flex flex-wrap gap-3">
          {["Math", "Science", "English", "Programming", "History"].map(
            (subject, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                {subject}
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
}
