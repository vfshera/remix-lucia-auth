import { Link, Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-300">
      <div className="w-full space-y-10">
        <Outlet />
        <div className="text-center">
          <Link
            to="/"
            className="text-xl text-center text-blue-400 font-semibold "
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
