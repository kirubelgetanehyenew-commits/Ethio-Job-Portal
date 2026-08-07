import { ShieldCheck } from "lucide-react";

function DashboardHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500 text-lg">
            Welcome back. Monitor users, companies, jobs and platform activity.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-100">
          <ShieldCheck className="text-indigo-600" size={42} />
        </div>

      </div>
    </div>
  );
}

export default DashboardHeader;