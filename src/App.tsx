import React, { useState, useEffect } from "react";
import {
  ServiceInvoice,
  PartsSale,
  OperatingExpense,
  InventoryPurchase,
  StaffMember,
  JobTask,
  Language,
  Theme,
  Tab,
} from "./types";
import { translations } from "./i18n";
import {
  initialInvoices,
  initialPartsSales,
  initialExpenses,
  initialPurchases,
  initialStaff,
  initialJobs,
} from "./initialData";
import DashboardView from "./components/DashboardView";
import RevenuesView from "./components/RevenuesView";
import ExpensesView from "./components/ExpensesView";
import StaffView from "./components/StaffView";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  Sun,
  Moon,
  Wrench,
  Globe,
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("garage_lang");
    return (saved as Language) || "en";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("garage_theme");
    return (saved as Theme) || "dark";
  });

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const [invoices, setInvoices] = useState<ServiceInvoice[]>(() => {
    const saved = localStorage.getItem("garage_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [partsSales, setPartsSales] = useState<PartsSale[]>(() => {
    const saved = localStorage.getItem("garage_parts_sales");
    return saved ? JSON.parse(saved) : initialPartsSales;
  });

  const [expenses, setExpenses] = useState<OperatingExpense[]>(() => {
    const saved = localStorage.getItem("garage_expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [purchases, setPurchases] = useState<InventoryPurchase[]>(() => {
    const saved = localStorage.getItem("garage_purchases");
    return saved ? JSON.parse(saved) : initialPurchases;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem("garage_staff");
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [jobs, setJobs] = useState<JobTask[]>(() => {
    const saved = localStorage.getItem("garage_jobs");
    return saved ? JSON.parse(saved) : initialJobs;
  });

  useEffect(() => {
    localStorage.setItem("garage_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("garage_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("garage_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("garage_parts_sales", JSON.stringify(partsSales));
  }, [partsSales]);

  useEffect(() => {
    localStorage.setItem("garage_expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("garage_purchases", JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem("garage_staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem("garage_jobs", JSON.stringify(jobs));
  }, [jobs]);

  const dict = translations[lang];
  const isRtl = dict.dir === "rtl";

  const handleAddInvoice = (newInv: Omit<ServiceInvoice, "id" | "totalAmount">) => {
    const totalAmount = newInv.partsCost + newInv.laborCost;
    const invoice: ServiceInvoice = {
      ...newInv,
      id: `inv_${Date.now()}`,
      totalAmount,
    };
    setInvoices((prev) => [invoice, ...prev]);
  };

  const handleAddPartsSale = (newSale: Omit<PartsSale, "id" | "totalAmount">) => {
    const totalAmount = newSale.quantity * newSale.unitPrice;
    const sale: PartsSale = {
      ...newSale,
      id: `sale_${Date.now()}`,
      totalAmount,
    };
    setPartsSales((prev) => [sale, ...prev]);
  };

  const handleAddExpense = (newExp: Omit<OperatingExpense, "id">) => {
    const exp: OperatingExpense = {
      ...newExp,
      id: `exp_${Date.now()}`,
    };
    setExpenses((prev) => [exp, ...prev]);
  };

  const handleAddPurchase = (newPur: Omit<InventoryPurchase, "id" | "totalCost">) => {
    const totalCost = newPur.quantity * newPur.unitCost;
    const pur: InventoryPurchase = {
      ...newPur,
      id: `pur_${Date.now()}`,
      totalCost,
    };
    setPurchases((prev) => [pur, ...prev]);
  };

  const handleAddStaff = (newStaff: Omit<StaffMember, "id">) => {
    const member: StaffMember = {
      ...newStaff,
      id: `st_${Date.now()}`,
    };
    setStaff((prev) => [...prev, member]);
  };

  const handleAddJob = (newJob: Omit<JobTask, "id">) => {
    const job: JobTask = {
      ...newJob,
      id: `job_${Date.now()}`,
    };
    setJobs((prev) => [job, ...prev]);
  };

  const handleUpdateJobStatus = (id: string, status: JobTask["status"]) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status } : j))
    );
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeletePartsSale = (id: string) => {
    setPartsSales((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDeletePurchase = (id: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteStaff = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDeleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`${theme === "dark" ? "dark bg-[#070b14] text-slate-100" : "bg-[#f8fafc] text-slate-800"} min-h-screen font-sans antialiased transition-colors duration-200`}
    >
      <header className="border-b border-slate-200/80 dark:border-slate-850 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur sticky top-0 z-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              {dict.workshopTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setLang("en")}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition ${lang === "en" ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition ${lang === "fr" ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition ${lang === "ar" ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}
              >
                AR
              </button>
            </div>

            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="p-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <nav className="lg:col-span-3 flex lg:flex-col gap-1 p-1 bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-850 rounded shadow-sm">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-xs font-semibold rounded transition whitespace-nowrap cursor-pointer w-full ${activeTab === "dashboard" ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-650" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{dict.dashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab("revenues")}
              className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-xs font-semibold rounded transition whitespace-nowrap cursor-pointer w-full ${activeTab === "revenues" ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border-l-2 border-emerald-650" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{dict.revenues}</span>
            </button>

            <button
              onClick={() => setActiveTab("expenses")}
              className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-xs font-semibold rounded transition whitespace-nowrap cursor-pointer w-full ${activeTab === "expenses" ? "bg-rose-600/10 text-rose-600 dark:text-rose-400 border-l-2 border-rose-650" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>{dict.expenses}</span>
            </button>

            <button
              onClick={() => setActiveTab("staff")}
              className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2 text-xs font-semibold rounded transition whitespace-nowrap cursor-pointer w-full ${activeTab === "staff" ? "bg-violet-600/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-650" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
            >
              <Users className="w-4 h-4" />
              <span>{dict.staff}</span>
            </button>
          </nav>

          <main className="lg:col-span-9 space-y-6">
            {activeTab === "dashboard" && (
              <DashboardView
                invoices={invoices}
                partsSales={partsSales}
                expenses={expenses}
                purchases={purchases}
                staff={staff}
                jobs={jobs}
                dict={dict}
              />
            )}

            {activeTab === "revenues" && (
              <RevenuesView
                invoices={invoices}
                partsSales={partsSales}
                staff={staff}
                dict={dict}
                onAddInvoice={handleAddInvoice}
                onAddPartsSale={handleAddPartsSale}
                onDeleteInvoice={handleDeleteInvoice}
                onDeletePartsSale={handleDeletePartsSale}
              />
            )}

            {activeTab === "expenses" && (
              <ExpensesView
                expenses={expenses}
                purchases={purchases}
                dict={dict}
                onAddExpense={handleAddExpense}
                onAddPurchase={handleAddPurchase}
                onDeleteExpense={handleDeleteExpense}
                onDeletePurchase={handleDeletePurchase}
              />
            )}

            {activeTab === "staff" && (
              <StaffView
                staff={staff}
                jobs={jobs}
                dict={dict}
                onAddStaff={handleAddStaff}
                onAddJob={handleAddJob}
                onUpdateJobStatus={handleUpdateJobStatus}
                onDeleteStaff={handleDeleteStaff}
                onDeleteJob={handleDeleteJob}
              />
            )}
          </main>
        </div>
      </div>

      <footer className="py-8 border-t border-slate-200/80 dark:border-slate-850 bg-white/50 dark:bg-[#070b14]/50 text-center text-xs text-slate-400 dark:text-slate-500 mt-12 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {dict.workshopTitle}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
            <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {lang === "ar" ? "نشط" : lang === "fr" ? "Actif" : "Active"}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono">{dict.workshopTitle}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
