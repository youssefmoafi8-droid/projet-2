import React, { useState } from "react";
import { StaffMember, JobTask } from "../types";
import { TranslationDict } from "../i18n";
import { Plus, Search, User, Briefcase, Phone, DollarSign, Clock, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

interface StaffViewProps {
  staff: StaffMember[];
  jobs: JobTask[];
  dict: TranslationDict;
  onAddStaff: (member: Omit<StaffMember, "id">) => void;
  onAddJob: (job: Omit<JobTask, "id">) => void;
  onUpdateJobStatus: (id: string, status: JobTask["status"]) => void;
  onDeleteStaff: (id: string) => void;
  onDeleteJob: (id: string) => void;
}

export default function StaffView({
  staff,
  jobs,
  dict,
  onAddStaff,
  onAddJob,
  onUpdateJobStatus,
  onDeleteStaff,
  onDeleteJob,
}: StaffViewProps) {
  const [subTab, setSubTab] = useState<"directory" | "jobs">("directory");
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffRate, setStaffRate] = useState("");
  const [staffStatus, setStaffStatus] = useState<StaffMember["status"]>("Active");

  const [jobDesc, setJobDesc] = useState("");
  const [jobVehicle, setJobVehicle] = useState("");
  const [jobStaffId, setJobStaffId] = useState("");
  const [jobHours, setJobHours] = useState("");
  const [jobStatus, setJobStatus] = useState<JobTask["status"]>("Pending");

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffRole) return;
    onAddStaff({
      name: staffName,
      role: staffRole,
      phone: staffPhone,
      hourlyRate: parseFloat(staffRate) || 0,
      status: staffStatus,
    });
    setStaffName("");
    setStaffRole("");
    setStaffPhone("");
    setStaffRate("");
    setStaffStatus("Active");
    setShowStaffForm(false);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDesc || !jobVehicle || !jobStaffId) return;
    onAddJob({
      description: jobDesc,
      vehicleDetails: jobVehicle,
      assignedStaffId: jobStaffId,
      status: jobStatus,
      estimatedHours: parseFloat(jobHours) || 0,
      date: new Date().toISOString().split("T")[0],
    });
    setJobDesc("");
    setJobVehicle("");
    setJobStaffId("");
    setJobHours("");
    setJobStatus("Pending");
    setShowJobForm(false);
  };

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.vehicleDetails.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStaffStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "On Leave":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/10";
    }
  };

  const getJobStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "In Progress":
        return "bg-sky-500/10 text-sky-500 border-sky-500/20";
      default:
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded w-full sm:w-auto">
          <button
            onClick={() => {
              setSubTab("directory");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "directory" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.staffDirectory}
          </button>
          <button
            onClick={() => {
              setSubTab("jobs");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "jobs" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.jobAssignments}
          </button>
        </div>

        <div>
          {subTab === "directory" ? (
            <button
              onClick={() => setShowStaffForm(!showStaffForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addStaff}
            </button>
          ) : (
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addJob}
            </button>
          )}
        </div>
      </div>

      {showStaffForm && (
        <form onSubmit={handleStaffSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.customerName} *</label>
              <input
                type="text"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.role} *</label>
              <input
                type="text"
                required
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.phone}</label>
              <input
                type="text"
                value={staffPhone}
                onChange={(e) => setStaffPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.hourlyRate} ({dict.currency}) *</label>
              <input
                type="number"
                required
                value={staffRate}
                onChange={(e) => setStaffRate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.status}</label>
              <select
                value={staffStatus}
                onChange={(e) => setStaffStatus(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="Active">{dict.active}</option>
                <option value="On Leave">{dict.onLeave}</option>
                <option value="Inactive">{dict.inactive}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowStaffForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-cyan-600 text-white rounded text-xs font-semibold hover:bg-cyan-700 transition shadow-sm"
            >
              {dict.submit}
            </button>
          </div>
        </form>
      )}

      {showJobForm && (
        <form onSubmit={handleJobSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.vehicleDetails} *</label>
              <input
                type="text"
                required
                value={jobVehicle}
                onChange={(e) => setJobVehicle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.mechanic} *</label>
              <select
                required
                value={jobStaffId}
                onChange={(e) => setJobStaffId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="">-- {dict.mechanic} --</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.estimatedHours} *</label>
              <input
                type="number"
                step="0.5"
                required
                value={jobHours}
                onChange={(e) => setJobHours(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.status}</label>
              <select
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="Pending">{dict.pending}</option>
                <option value="In Progress">{dict.inProgress}</option>
                <option value="Completed">{dict.completed}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.description} *</label>
            <textarea
              rows={2}
              required
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowJobForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-violet-600 text-white rounded text-xs font-semibold hover:bg-violet-700 transition shadow-sm"
            >
              {dict.submit}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-3 shadow-sm">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
          />
        </div>

        {subTab === "directory" ? (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">{dict.status}:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">{dict.filterAll}</option>
              <option value="Active">{dict.active}</option>
              <option value="On Leave">{dict.onLeave}</option>
              <option value="Inactive">{dict.inactive}</option>
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">{dict.status}:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">{dict.filterAll}</option>
              <option value="Pending">{dict.pending}</option>
              <option value="In Progress">{dict.inProgress}</option>
              <option value="Completed">{dict.completed}</option>
            </select>
          </div>
        )}
      </div>

      {subTab === "directory" ? (
        filteredStaff.length === 0 ? (
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-8 text-center">
            <User className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((member) => {
              const activeTasksCount = jobs.filter((j) => j.assignedStaffId === member.id && j.status !== "Completed").length;
              return (
                <div key={member.id} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded flex items-center justify-center font-bold text-xs select-none">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{member.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{member.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getStaffStatusStyle(member.status)}`}>
                        {dict[member.status.toLowerCase().replace(" ", "") as keyof TranslationDict] || member.status}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5">
                      {member.phone && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono">{member.hourlyRate.toLocaleString()}{dict.currency} / hour</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span>{activeTasksCount} active task(s)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-2.5 flex items-center justify-end">
                    <button
                      onClick={() => onDeleteStaff(member.id)}
                      className="p-1 text-rose-600 hover:bg-rose-500/10 rounded transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-8 text-center">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const mechanic = staff.find((s) => s.id === job.assignedStaffId);
            return (
              <div key={job.id} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        {job.vehicleDetails}
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                        {job.date}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getJobStatusStyle(job.status)}`}>
                      {dict[job.status.toLowerCase().replace(" ", "") as keyof TranslationDict] || job.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-2.5 rounded">
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {job.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center font-bold text-[9px] text-slate-600 dark:text-slate-400">
                        {mechanic ? mechanic.name.split(" ").map((n) => n[0]).join("") : "?"}
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {mechanic ? mechanic.name : "Unassigned"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{job.estimatedHours} {dict.estimatedHours.toLowerCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {job.status !== "Completed" && (
                      <button
                        onClick={() => onUpdateJobStatus(job.id, "Completed")}
                        className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded text-[10px] font-bold transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {dict.completed}
                      </button>
                    )}
                    {job.status === "Pending" && (
                      <button
                        onClick={() => onUpdateJobStatus(job.id, "In Progress")}
                        className="flex items-center gap-1 px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 rounded text-[10px] font-bold transition cursor-pointer"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {dict.inProgress}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="p-1 text-rose-600 hover:bg-rose-500/10 rounded transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
