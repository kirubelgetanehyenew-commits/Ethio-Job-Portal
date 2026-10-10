import { ShieldCheck } from "lucide-react";

function DashboardHeader() {
  return (
    <div className="page-header">
      <div className="flex items-center justify-between w-full">

        <div>
          <h1 className="text-4xl font-black text-slate-100">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400 text-lg">
            Welcome back. Monitor users, companies, jobs and platform activity.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl" style={{ background: "var(--color-primary-light)" }}>
          <ShieldCheck style={{ color: "var(--color-primary)" }} size={42} />
        </div>

      </div>
    </div>
  );
}

export default DashboardHeader;