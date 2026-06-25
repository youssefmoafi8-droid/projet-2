import React, { useState } from "react";
import { OperatingExpense, InventoryPurchase } from "../types";
import { TranslationDict } from "../i18n";
import { Plus, Search, Tag, Truck, Receipt, SlidersHorizontal, Trash2 } from "lucide-react";

interface ExpensesViewProps {
  expenses: OperatingExpense[];
  purchases: InventoryPurchase[];
  dict: TranslationDict;
  onAddExpense: (expense: Omit<OperatingExpense, "id">) => void;
  onAddPurchase: (purchase: Omit<InventoryPurchase, "id" | "totalCost">) => void;
  onDeleteExpense: (id: string) => void;
  onDeletePurchase: (id: string) => void;
}

export default function ExpensesView({
  expenses,
  purchases,
  dict,
  onAddExpense,
  onAddPurchase,
  onDeleteExpense,
  onDeletePurchase,
}: ExpensesViewProps) {
  const [subTab, setSubTab] = useState<"operating" | "purchases">("operating");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [expCategory, setExpCategory] = useState<OperatingExpense["category"]>("Rent");
  const [expDesc, setExpDesc] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expDate, setExpDate] = useState("");

  const [purItemName, setPurItemName] = useState("");
  const [purSupplier, setPurSupplier] = useState("");
  const [purQty, setPurQty] = useState("");
  const [purUnitCost, setPurUnitCost] = useState("");
  const [purStatus, setPurStatus] = useState<"Pending" | "Received" | "Cancelled">("Pending");
  const [purDate, setPurDate] = useState("");

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || !expDesc) return;
    onAddExpense({
      category: expCategory,
      description: expDesc,
      amount: parseFloat(expAmount) || 0,
      date: expDate || new Date().toISOString().split("T")[0],
    });
    setExpCategory("Rent");
    setExpDesc("");
    setExpAmount("");
    setExpDate("");
    setShowExpenseForm(false);
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purItemName || !purSupplier || !purQty || !purUnitCost) return;
    onAddPurchase({
      itemName: purItemName,
      supplier: purSupplier,
      quantity: parseInt(purQty) || 1,
      unitCost: parseFloat(purUnitCost) || 0,
      date: purDate || new Date().toISOString().split("T")[0],
      status: purStatus,
    });
    setPurItemName("");
    setPurSupplier("");
    setPurQty("");
    setPurUnitCost("");
    setPurStatus("Pending");
    setPurDate("");
    setShowPurchaseForm(false);
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch =
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPurchases = purchases.filter((pur) => {
    const matchesSearch =
      pur.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pur.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || pur.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/10";
    }
  };

  const categories: OperatingExpense["category"][] = [
    "Rent",
    "Electricity",
    "Water",
    "Internet",
    "Maintenance",
    "Other",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded w-full sm:w-auto">
          <button
            onClick={() => {
              setSubTab("operating");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "operating" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.operatingExpenses}
          </button>
          <button
            onClick={() => {
              setSubTab("purchases");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "purchases" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.inventoryPurchases}
          </button>
        </div>

        <div>
          {subTab === "operating" ? (
            <button
              onClick={() => setShowExpenseForm(!showExpenseForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addExpense}
            </button>
          ) : (
            <button
              onClick={() => setShowPurchaseForm(!showPurchaseForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addPurchase}
            </button>
          )}
        </div>
      </div>

      {showExpenseForm && (
        <form onSubmit={handleExpenseSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.category} *</label>
              <select
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-rose-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {dict[cat.toLowerCase() as keyof TranslationDict] || cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.description} *</label>
              <input
                type="text"
                required
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.amount} ({dict.currency}) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.date}</label>
              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowExpenseForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-rose-600 text-white rounded text-xs font-semibold hover:bg-rose-700 transition shadow-sm"
            >
              {dict.submit}
            </button>
          </div>
        </form>
      )}

      {showPurchaseForm && (
        <form onSubmit={handlePurchaseSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.itemName} *</label>
              <input
                type="text"
                required
                value={purItemName}
                onChange={(e) => setPurItemName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.supplier} *</label>
              <input
                type="text"
                required
                value={purSupplier}
                onChange={(e) => setPurSupplier(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.quantity} *</label>
              <input
                type="number"
                required
                min="1"
                value={purQty}
                onChange={(e) => setPurQty(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.unitCost} ({dict.currency}) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={purUnitCost}
                onChange={(e) => setPurUnitCost(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.status}</label>
              <select
                value={purStatus}
                onChange={(e) => setPurStatus(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="Pending">{dict.pending}</option>
                <option value="Received">{dict.received}</option>
                <option value="Cancelled">{dict.cancelled}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.date}</label>
              <input
                type="date"
                value={purDate}
                onChange={(e) => setPurDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowPurchaseForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-amber-600 text-white rounded text-xs font-semibold hover:bg-amber-700 transition shadow-sm"
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

        {subTab === "operating" ? (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              {dict.category}:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">{dict.filterAll}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {dict[cat.toLowerCase() as keyof TranslationDict] || cat}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              {dict.status}:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">{dict.filterAll}</option>
              <option value="Pending">{dict.pending}</option>
              <option value="Received">{dict.received}</option>
              <option value="Cancelled">{dict.cancelled}</option>
            </select>
          </div>
        )}
      </div>

      {subTab === "operating" ? (
        filteredExpenses.length === 0 ? (
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded p-8 text-center">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExpenses.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/15">
                      {dict[exp.category.toLowerCase() as keyof TranslationDict] || exp.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{exp.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                    {exp.description}
                  </h5>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      {dict.amount}
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                      {exp.amount.toLocaleString()}{dict.currency}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-500/10 rounded transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : filteredPurchases.length === 0 ? (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-8 text-center">
          <Truck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPurchases.map((pur) => (
            <div key={pur.id} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{pur.itemName}</h5>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span className="line-clamp-1">{pur.supplier}</span>
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getStatusStyle(pur.status)}`}>
                    {dict[pur.status.toLowerCase() as keyof TranslationDict] || pur.status}
                  </span>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-2 grid grid-cols-3 gap-1 text-center bg-slate-50 dark:bg-slate-800/30 p-2 rounded">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">
                      {dict.quantity}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block font-mono">
                      {pur.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">
                      {dict.unitCost}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block font-mono">
                      {pur.unitCost.toLocaleString()}{dict.currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">
                      {dict.date}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block font-mono truncate">
                      {pur.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">
                    {dict.totalAmount}
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                    {pur.totalCost.toLocaleString()}{dict.currency}
                  </span>
                </div>
                <button
                  onClick={() => onDeletePurchase(pur.id)}
                  className="px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded transition cursor-pointer"
                >
                  {dict.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
