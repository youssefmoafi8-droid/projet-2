import React, { useState } from "react";
import { ServiceInvoice, PartsSale, StaffMember } from "../types";
import { TranslationDict } from "../i18n";
import { Plus, Search, Tag, Phone, Car, FileText, ClipboardList, Wrench, User, DollarSign } from "lucide-react";

interface RevenuesViewProps {
  invoices: ServiceInvoice[];
  partsSales: PartsSale[];
  staff: StaffMember[];
  dict: TranslationDict;
  onAddInvoice: (invoice: Omit<ServiceInvoice, "id" | "totalAmount">) => void;
  onAddPartsSale: (sale: Omit<PartsSale, "id" | "totalAmount">) => void;
  onDeleteInvoice: (id: string) => void;
  onDeletePartsSale: (id: string) => void;
}

export default function RevenuesView({
  invoices,
  partsSales,
  staff,
  dict,
  onAddInvoice,
  onAddPartsSale,
  onDeleteInvoice,
  onDeletePartsSale,
}: RevenuesViewProps) {
  const [subTab, setSubTab] = useState<"invoices" | "parts">("invoices");
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showPartsForm, setShowPartsForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [invCustomer, setInvCustomer] = useState("");
  const [invPhone, setInvPhone] = useState("");
  const [invVehicle, setInvVehicle] = useState("");
  const [invPlate, setInvPlate] = useState("");
  const [invDesc, setInvDesc] = useState("");
  const [invMechanic, setInvMechanic] = useState("");
  const [invPartsCost, setInvPartsCost] = useState("");
  const [invLaborCost, setInvLaborCost] = useState("");
  const [invStatus, setInvStatus] = useState<"Paid" | "Unpaid" | "Partial">("Paid");
  const [invDate, setInvDate] = useState("");

  const [salePart, setSalePart] = useState("");
  const [saleCustomer, setSaleCustomer] = useState("");
  const [saleQty, setSaleQty] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleDate, setSaleDate] = useState("");

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invCustomer || !invVehicle || !invLaborCost) return;
    onAddInvoice({
      customerName: invCustomer,
      customerPhone: invPhone,
      vehicleModel: invVehicle,
      licensePlate: invPlate,
      description: invDesc,
      mechanicId: invMechanic,
      partsCost: parseFloat(invPartsCost) || 0,
      laborCost: parseFloat(invLaborCost) || 0,
      date: invDate || new Date().toISOString().split("T")[0],
      paymentStatus: invStatus,
    });
    setInvCustomer("");
    setInvPhone("");
    setInvVehicle("");
    setInvPlate("");
    setInvDesc("");
    setInvMechanic("");
    setInvPartsCost("");
    setInvLaborCost("");
    setInvStatus("Paid");
    setInvDate("");
    setShowInvoiceForm(false);
  };

  const handlePartsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salePart || !saleCustomer || !saleQty || !salePrice) return;
    onAddPartsSale({
      partName: salePart,
      customerName: saleCustomer,
      quantity: parseInt(saleQty) || 1,
      unitPrice: parseFloat(salePrice) || 0,
      date: saleDate || new Date().toISOString().split("T")[0],
    });
    setSalePart("");
    setSaleCustomer("");
    setSaleQty("");
    setSalePrice("");
    setSaleDate("");
    setShowPartsForm(false);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPartsSales = partsSales.filter((sale) => {
    const matchesSearch =
      sale.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Partial":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded w-full sm:w-auto">
          <button
            onClick={() => {
              setSubTab("invoices");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "invoices" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.invoiceDetails}
          </button>
          <button
            onClick={() => {
              setSubTab("parts");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded transition ${subTab === "parts" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            {dict.partsSales}
          </button>
        </div>

        <div>
          {subTab === "invoices" ? (
            <button
              onClick={() => setShowInvoiceForm(!showInvoiceForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addInvoice}
            </button>
          ) : (
            <button
              onClick={() => setShowPartsForm(!showPartsForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {dict.addSale}
            </button>
          )}
        </div>
      </div>

      {showInvoiceForm && (
        <form onSubmit={handleInvoiceSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.customerName} *</label>
              <input
                type="text"
                required
                value={invCustomer}
                onChange={(e) => setInvCustomer(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.phone}</label>
              <input
                type="text"
                value={invPhone}
                onChange={(e) => setInvPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.vehicleModel} *</label>
              <input
                type="text"
                required
                value={invVehicle}
                onChange={(e) => setInvVehicle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.licensePlate}</label>
              <input
                type="text"
                value={invPlate}
                onChange={(e) => setInvPlate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.mechanic}</label>
              <select
                value={invMechanic}
                onChange={(e) => setInvMechanic(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
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
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.date}</label>
              <input
                type="date"
                value={invDate}
                onChange={(e) => setInvDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.partsCost} ({dict.currency})</label>
              <input
                type="number"
                step="0.01"
                value={invPartsCost}
                onChange={(e) => setInvPartsCost(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.laborCost} ({dict.currency}) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={invLaborCost}
                onChange={(e) => setInvLaborCost(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.paymentStatus}</label>
              <select
                value={invStatus}
                onChange={(e) => setInvStatus(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Paid">{dict.paid}</option>
                <option value="Partial">{dict.partial}</option>
                <option value="Unpaid">{dict.unpaid}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.description}</label>
            <textarea
              rows={2}
              value={invDesc}
              onChange={(e) => setInvDesc(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowInvoiceForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              {dict.submit}
            </button>
          </div>
        </form>
      )}

      {showPartsForm && (
        <form onSubmit={handlePartsSubmit} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 space-y-3 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.partName} *</label>
              <input
                type="text"
                required
                value={salePart}
                onChange={(e) => setSalePart(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.customerName} *</label>
              <input
                type="text"
                required
                value={saleCustomer}
                onChange={(e) => setSaleCustomer(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.quantity} *</label>
              <input
                type="number"
                required
                min="1"
                value={saleQty}
                onChange={(e) => setSaleQty(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.unitPrice} ({dict.currency}) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{dict.date}</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowPartsForm(false)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dict.cancel}
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition shadow-sm"
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
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {subTab === "invoices" && (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">{dict.paymentStatus}:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">{dict.filterAll}</option>
              <option value="Paid">{dict.paid}</option>
              <option value="Partial">{dict.partial}</option>
              <option value="Unpaid">{dict.unpaid}</option>
            </select>
          </div>
        )}
      </div>

      {subTab === "invoices" ? (
        filteredInvoices.length === 0 ? (
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-8 text-center">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredInvoices.map((inv) => {
              const mechanicName = staff.find((s) => s.id === inv.mechanicId)?.name || "-";
              return (
                <div key={inv.id} className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {inv.customerName}
                        </h4>
                        {inv.customerPhone && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{inv.customerPhone}</span>
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getStatusStyle(inv.paymentStatus)}`}>
                        {dict[inv.paymentStatus.toLowerCase() as keyof TranslationDict] || inv.paymentStatus}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-850 pt-2 grid grid-cols-2 gap-y-2 gap-x-3">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          {dict.vehicleModel}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <Car className="w-3.5 h-3.5 text-slate-400" />
                          <span className="line-clamp-1">{inv.vehicleModel}</span>
                        </div>
                      </div>

                      {inv.licensePlate && (
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            {dict.licensePlate}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                            <Tag className="w-3.5 h-3.5 text-slate-400" />
                            <span>{inv.licensePlate}</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          {dict.mechanic}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="line-clamp-1">{mechanicName}</span>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          {dict.date}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>{inv.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-800 p-2.5 rounded">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                        {dict.description}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal">
                        {inv.description || "-"}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-850 pt-2 flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>{dict.laborCost}: {inv.laborCost.toLocaleString()}{dict.currency}</span>
                      <span>{dict.partsCost}: {inv.partsCost.toLocaleString()}{dict.currency}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">
                        {dict.totalAmount}
                      </span>
                      <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                        {inv.totalAmount.toLocaleString()}{dict.currency}
                      </span>
                    </div>
                    <button
                      onClick={() => onDeleteInvoice(inv.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded transition cursor-pointer"
                    >
                      {dict.delete}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : filteredPartsSales.length === 0 ? (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded p-8 text-center">
          <Wrench className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <span className="text-xs text-slate-400 font-medium">{dict.noData}</span>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-slate-800 rounded overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="p-3">{dict.partName}</th>
                  <th className="p-3">{dict.customerName}</th>
                  <th className="p-3">{dict.quantity}</th>
                  <th className="p-3">{dict.unitPrice}</th>
                  <th className="p-3">{dict.totalAmount}</th>
                  <th className="p-3">{dict.date}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredPartsSales.map((sale) => (
                  <tr key={sale.id} className="text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="p-3 font-bold text-slate-950 dark:text-white">{sale.partName}</td>
                    <td className="p-3 font-medium">{sale.customerName}</td>
                    <td className="p-3 font-mono">{sale.quantity}</td>
                    <td className="p-3 font-mono">{sale.unitPrice.toLocaleString()}{dict.currency}</td>
                    <td className="p-3 font-bold text-slate-950 dark:text-white font-mono">{sale.totalAmount.toLocaleString()}{dict.currency}</td>
                    <td className="p-3 font-mono text-slate-400">{sale.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onDeletePartsSale(sale.id)}
                        className="px-2 py-1 text-xs text-rose-600 hover:bg-rose-500/10 rounded transition cursor-pointer"
                      >
                        {dict.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
