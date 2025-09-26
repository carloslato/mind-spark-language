// Layout.jsx
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 text-gray-100 p-4">
          <h2 className="text-xl font-bold mb-6">Panel</h2>
          <nav className="flex flex-col gap-3">
            <Link to="/lessons" className="hover:bg-gray-700 rounded p-2">
              Lecciones
            </Link>
            <Link to="/stats" className="hover:bg-gray-700 rounded p-2">
              Progreso
            </Link>
            <Link
              to="/admin/create-lesson"
              className="hover:bg-gray-700 rounded p-2"
            >
              Crear lección
            </Link>
            <hr />
            <Link to="/login" className="hover:bg-gray-700 rounded p-2">
              Login
            </Link>
            <Link to="/Register" className="hover:bg-gray-700 rounded p-2">
              Register
            </Link>
          </nav>
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </>
  );
}
