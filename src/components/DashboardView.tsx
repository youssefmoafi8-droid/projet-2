import React from "react";
import {
  ServiceInvoice,
  PartsSale,
  OperatingExpense,
  InventoryPurchase,
  StaffMember,
  JobTask,
} from "../types";
import { TranslationDict } from "../i18n";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Calendar,
} from "lucide-react";

interface DashboardViewProps {
  invoices: ServiceInvoice[];
  partsSales: PartsSale[];
  expenses: OperatingExpense[];
  purchases: InventoryPurchase[];
  staff: StaffMember[];
  jobs: JobTask[];
  dict: TranslationDict;
}

export default function DashboardView({
  invoices,
  partsSales,
  expenses,
  purchases,
  staff,
  jobs,
  dict,
}: DashboardViewProps) {
  const serviceRevenueSum = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const partsSalesSum = partsSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalRevenues = serviceRevenueSum + partsSalesSum;

  const fixedExpensesSum = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const inventoryExpensesSum = purchases.reduce((sum, pur) => sum + pur.totalCost, 0);
  const totalExpenses = fixedExpensesSum + inventoryExpensesSum;

  const netProfit = totalRevenues - totalExpenses;
  const isProfit = netProfit >= 0;

  const activeStaffCount = staff.filter((s) => s.status === "Active").length;
  const completedJobsCount = jobs.filter((j) => j.status === "Completed").length;

  const servicePercentage = totalRevenues > 0 ? (serviceRevenueSum / totalRevenues) * 100 : 0;
  const partsPercentage = totalRevenues > 0 ? (partsSalesSum / totalRevenues) * 100 : 0;

  const fixedPercentage = totalExpenses > 0 ? (fixedExpensesSum / totalExpenses) * 100 : 0;
  const inventoryPercentage = totalExpenses > 0 ? (inventoryExpensesSum / totalExpenses) * 100 : 0;

  const activities = [
    ...invoices.map((inv) => ({
      type: "invoice",
      title: `${inv.customerName} - ${inv.vehicleModel}`,
      amount: inv.totalAmount,
      date: inv.date,
      isRevenue: true,
    })),
    ...partsSales.map((sale) => ({
      type: "sale",
      title: `${sale.partName} (${sale.quantity})`,
      amount: sale.totalAmount,
      date: sale.date,
      isRevenue: true,
    })),
    ...expenses.map((exp) => ({
      type: "expense",
      title: `${dict[exp.category.toLowerCase() as keyof TranslationDict] || exp.category} - ${exp.description}`,
      amount: exp.amount,
      date: exp.date,
      isRevenue: false,
    })),
    ...purchases.map((pur) => ({
      type: "purchase",
      title: `${pur.itemName} (${pur.quantity})`,
      amount: pur.totalCost,
      date: pur.date,
      isRevenue: false,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 transition-all duration-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {dict.totalRevenues}
            </span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              {totalRevenues.toLocaleString()}{dict.currency}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
              <span>{dict.serviceRevenue}: {servicePercentage.toFixed(0)}%</span>
              <span>•</span>
              <span>{dict.partsRevenue}: {partsPercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 transition-all duration-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {dict.totalExpenses}
            </span>
            <div className="p-1.5 bg-rose-500/10 text-rose-500 rounded">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              {totalExpenses.toLocaleString()}{dict.currency}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
              <span>{dict.fixedExpenses}: {fixedPercentage.toFixed(0)}%</span>
              <span>•</span>
              <span>{dict.inventoryExpenses}: {inventoryPercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 transition-all duration-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {dict.netProfit}
            </span>
            <div className={`p-1.5 rounded ${isProfit ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className={`text-xl font-bold tracking-tight font-mono ${isProfit ? "text-emerald-500" : "text-amber-500"}`}>
              {isProfit ? "" : "-"}{Math.abs(netProfit).toLocaleString()}{dict.currency}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-slate-400">
              {totalRevenues > 0 ? (
                <span className={isProfit ? "text-emerald-500" : "text-amber-500"}>
                  {((netProfit / totalRevenues) * 100).toFixed(1)}% profit margin
                </span>
              ) : (
                <span>0% profit margin</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 transition-all duration-200 shadow-sm">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4">
            {dict.financialSummary}
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-medium mb-1 text-slate-500">
                <span>{dict.serviceRevenue}</span>
                <span className="font-mono">{serviceRevenueSum.toLocaleString()}{dict.currency} ({servicePercentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-550"
                  style={{ width: `${servicePercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-medium mb-1 text-slate-500">
                <span>{dict.partsRevenue}</span>
                <span className="font-mono">{partsSalesSum.toLocaleString()}{dict.currency} ({partsPercentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-550"
                  style={{ width: `${partsPercentage}%` }}
                />
              </div>
            </div>

            <div className="border-t border-slate-150 dark:border-slate-800 my-3" />

            <div>
              <div className="flex justify-between text-[10px] font-medium mb-1 text-slate-500">
                <span>{dict.fixedExpenses}</span>
                <span className="font-mono">{fixedExpensesSum.toLocaleString()}{dict.currency} ({fixedPercentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-550"
                  style={{ width: `${fixedPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-medium mb-1 text-slate-500">
                <span>{dict.inventoryExpenses}</span>
                <span className="font-mono">{inventoryExpensesSum.toLocaleString()}{dict.currency} ({inventoryPercentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-550"
                  style={{ width: `${inventoryPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 transition-all duration-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
              {dict.recentTransactions}
            </h4>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString(undefined, { month: "short", year: "numeric" })}
            </span>
          </div>

          {activities.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
              <span className="text-xs text-slate-400">{dict.noData}</span>
            </div>
          ) : (
            <div className="flex-1 space-y-2">
              {activities.map((act, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${act.isRevenue ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                      {act.isRevenue ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {act.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono">
                        {act.date}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold font-mono ${act.isRevenue ? "text-emerald-500" : "text-rose-500"}`}>
                    {act.isRevenue ? "+" : "-"}{act.amount.toLocaleString()}{dict.currency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-3.5 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-500 rounded">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{dict.activeStaff}</p>
            <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
              {activeStaffCount}
            </h5>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-3.5 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 text-violet-500 rounded">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{dict.completedJobs}</p>
            <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
              {completedJobsCount}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
