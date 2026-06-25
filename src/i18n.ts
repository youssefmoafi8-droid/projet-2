import { Language } from "./types";

export interface TranslationDict {
  dir: "ltr" | "rtl";
  dashboard: string;
  revenues: string;
  expenses: string;
  staff: string;
  netProfit: string;
  totalRevenues: string;
  totalExpenses: string;
  serviceRevenue: string;
  partsRevenue: string;
  fixedExpenses: string;
  inventoryExpenses: string;
  activeStaff: string;
  completedJobs: string;
  revenueBreakdown: string;
  expenseBreakdown: string;
  financialSummary: string;
  recentTransactions: string;
  customerName: string;
  phone: string;
  vehicleModel: string;
  licensePlate: string;
  description: string;
  mechanic: string;
  partsCost: string;
  laborCost: string;
  totalAmount: string;
  date: string;
  paymentStatus: string;
  paid: string;
  unpaid: string;
  partial: string;
  partName: string;
  quantity: string;
  unitPrice: string;
  category: string;
  amount: string;
  itemName: string;
  supplier: string;
  unitCost: string;
  status: string;
  pending: string;
  received: string;
  cancelled: string;
  role: string;
  hourlyRate: string;
  active: string;
  onLeave: string;
  inactive: string;
  estimatedHours: string;
  inProgress: string;
  completed: string;
  vehicleDetails: string;
  addInvoice: string;
  addSale: string;
  addExpense: string;
  addPurchase: string;
  addStaff: string;
  addJob: string;
  cancel: string;
  submit: string;
  delete: string;
  filterAll: string;
  searchPlaceholder: string;
  operatingExpenses: string;
  inventoryPurchases: string;
  staffDirectory: string;
  jobAssignments: string;
  noData: string;
  rent: string;
  electricity: string;
  water: string;
  internet: string;
  maintenance: string;
  other: string;
  invoiceDetails: string;
  partsSales: string;
  currency: string;
  workshopTitle: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    dir: "ltr",
    dashboard: "Dashboard",
    revenues: "Revenues",
    expenses: "Expenses",
    staff: "Staff & Jobs",
    netProfit: "Net Profit",
    totalRevenues: "Total Revenues",
    totalExpenses: "Total Expenses",
    serviceRevenue: "Service Labor",
    partsRevenue: "Parts Sales",
    fixedExpenses: "Fixed/Variable Charges",
    inventoryExpenses: "Inventory Purchases",
    activeStaff: "Active Staff",
    completedJobs: "Completed Jobs",
    revenueBreakdown: "Revenue Breakdown",
    expenseBreakdown: "Expense Breakdown",
    financialSummary: "Financial Summary",
    recentTransactions: "Recent Transactions",
    customerName: "Customer Name",
    phone: "Phone Number",
    vehicleModel: "Vehicle Model",
    licensePlate: "License Plate",
    description: "Description",
    mechanic: "Mechanic",
    partsCost: "Parts Cost",
    laborCost: "Labor Cost",
    totalAmount: "Total Amount",
    date: "Date",
    paymentStatus: "Payment Status",
    paid: "Paid",
    unpaid: "Unpaid",
    partial: "Partial",
    partName: "Part Name",
    quantity: "Quantity",
    unitPrice: "Unit Price",
    category: "Category",
    amount: "Amount",
    itemName: "Item Name",
    supplier: "Supplier",
    unitCost: "Unit Cost",
    status: "Status",
    pending: "Pending",
    received: "Received",
    cancelled: "Cancelled",
    role: "Role / Specialty",
    hourlyRate: "Hourly Rate",
    active: "Active",
    onLeave: "On Leave",
    inactive: "Inactive",
    estimatedHours: "Estimated Hours",
    inProgress: "In Progress",
    completed: "Completed",
    vehicleDetails: "Vehicle Details",
    addInvoice: "Log Service Invoice",
    addSale: "Log Parts Sale",
    addExpense: "Log Operating Expense",
    addPurchase: "Log Inventory Purchase",
    addStaff: "Register Staff Member",
    addJob: "Assign New Job",
    cancel: "Cancel",
    submit: "Submit",
    delete: "Delete",
    filterAll: "All",
    searchPlaceholder: "Search...",
    operatingExpenses: "Operating Expenses",
    inventoryPurchases: "Inventory Purchases",
    staffDirectory: "Staff Directory",
    jobAssignments: "Job Assignments",
    noData: "No data available",
    rent: "Rent",
    electricity: "Electricity",
    water: "Water",
    internet: "Internet",
    maintenance: "Maintenance",
    other: "Other",
    invoiceDetails: "Service Invoices",
    partsSales: "Direct Parts Sales",
    currency: " DH",
    workshopTitle: "AutoWorkshop Suite",
  },
  fr: {
    dir: "ltr",
    dashboard: "Tableau de Bord",
    revenues: "Revenus",
    expenses: "Dépenses",
    staff: "Personnel & Tâches",
    netProfit: "Bénéfice Net",
    totalRevenues: "Total des Revenus",
    totalExpenses: "Total des Dépenses",
    serviceRevenue: "Main d'œuvre",
    partsRevenue: "Vente de Pièces",
    fixedExpenses: "Charges Fixes/Variables",
    inventoryExpenses: "Achats de Stock",
    activeStaff: "Personnel Actif",
    completedJobs: "Tâches Terminées",
    revenueBreakdown: "Répartition des Revenus",
    expenseBreakdown: "Répartition des Dépenses",
    financialSummary: "Résumé Financier",
    recentTransactions: "Transactions Récentes",
    customerName: "Nom du Client",
    phone: "Numéro de Téléphone",
    vehicleModel: "Modèle de Véhicule",
    licensePlate: "Plaque d'immatriculation",
    description: "Description",
    mechanic: "Mécanicien",
    partsCost: "Coût des Pièces",
    laborCost: "Coût de Main d'œuvre",
    totalAmount: "Montant Total",
    date: "Date",
    paymentStatus: "Statut de Paiement",
    paid: "Payé",
    unpaid: "Impayé",
    partial: "Partiel",
    partName: "Nom de la Pièce",
    quantity: "Quantité",
    unitPrice: "Prix Unitaire",
    category: "Catégorie",
    amount: "Montant",
    itemName: "Nom de l'article",
    supplier: "Fournisseur",
    unitCost: "Coût Unitaire",
    status: "Statut",
    pending: "En attente",
    received: "Reçu",
    cancelled: "Annulé",
    role: "Rôle / Spécialité",
    hourlyRate: "Taux Horaire",
    active: "Actif",
    onLeave: "En congé",
    inactive: "Inactif",
    estimatedHours: "Heures Estimées",
    inProgress: "En cours",
    completed: "Terminé",
    vehicleDetails: "Détails du Véhicule",
    addInvoice: "Enregistrer une Facture",
    addSale: "Enregistrer une Vente de Pièces",
    addExpense: "Enregistrer une Charge",
    addPurchase: "Enregistrer un Achat de Stock",
    addStaff: "Enregistrer un Employé",
    addJob: "Assigner une Tâche",
    cancel: "Annuler",
    submit: "Valider",
    delete: "Supprimer",
    filterAll: "Tous",
    searchPlaceholder: "Rechercher...",
    operatingExpenses: "Charges d'Exploitation",
    inventoryPurchases: "Achats d'Inventaire",
    staffDirectory: "Annuaire du Personnel",
    jobAssignments: "Assignations des Tâches",
    noData: "Aucune donnée disponible",
    rent: "Loyer",
    electricity: "Électricité",
    water: "Eau",
    internet: "Internet",
    maintenance: "Maintenance d'Équipement",
    other: "Autre",
    invoiceDetails: "Factures de Service",
    partsSales: "Ventes Directes de Pièces",
    currency: " DH",
    workshopTitle: "AutoWorkshop Suite",
  },
  ar: {
    dir: "rtl",
    dashboard: "لوحة التحكم",
    revenues: "الإيرادات",
    expenses: "المصروفات",
    staff: "الموظفين والمهام",
    netProfit: "صافي الأرباح",
    totalRevenues: "إجمالي الإيرادات",
    totalExpenses: "إجمالي المصروفات",
    serviceRevenue: "خدمات وصيانة",
    partsRevenue: "مبيعات قطع الغيار",
    fixedExpenses: "النفقات الثابتة والمتغيرة",
    inventoryExpenses: "مشتريات المخزون",
    activeStaff: "الموظفين النشطين",
    completedJobs: "المهام المنجزة",
    revenueBreakdown: "تفصيل الإيرادات",
    expenseBreakdown: "تفصيل المصروفات",
    financialSummary: "الملخص المالي",
    recentTransactions: "المعاملات الأخيرة",
    customerName: "اسم العميل",
    phone: "رقم الهاتف",
    vehicleModel: "طراز المركبة",
    licensePlate: "رقم اللوحة",
    description: "الوصف",
    mechanic: "الميكانيكي",
    partsCost: "تكلفة قطع الغيار",
    laborCost: "تكلفة اليد العاملة",
    totalAmount: "المبلغ الإجمالي",
    date: "التاريخ",
    paymentStatus: "حالة الدفع",
    paid: "مدفوع",
    unpaid: "غير مدفوع",
    partial: "مدفوع جزئياً",
    partName: "اسم القطعة",
    quantity: "الكمية",
    unitPrice: "سعر الوحدة",
    category: "الفئة",
    amount: "المبلغ",
    itemName: "اسم الصنف",
    supplier: "المورد",
    unitCost: "تكلفة الوحدة",
    status: "الحالة",
    pending: "قيد الانتظار",
    received: "تم الاستلام",
    cancelled: "ملغى",
    role: "الدور / التخصص",
    hourlyRate: "أجر الساعة",
    active: "نشط",
    onLeave: "في إجازة",
    inactive: "غير نشط",
    estimatedHours: "الساعات المقدرة",
    inProgress: "قيد العمل",
    completed: "مكتمل",
    vehicleDetails: "تفاصيل المركبة",
    addInvoice: "تسجيل فاتورة صيانة",
    addSale: "تسجيل بيع قطع غيار",
    addExpense: "تسجيل نفقات تشغيلية",
    addPurchase: "تسجيل شراء مخزون",
    addStaff: "تسجيل موظف جديد",
    addJob: "تعيين مهمة جديدة",
    cancel: "إلغاء",
    submit: "تأكيد",
    delete: "حذف",
    filterAll: "الكل",
    searchPlaceholder: "بحث...",
    operatingExpenses: "المصاريف التشغيلية",
    inventoryPurchases: "مشتريات المخزون",
    staffDirectory: "سجل الموظفين",
    jobAssignments: "توزيع المهام",
    noData: "لا توجد بيانات متاحة",
    rent: "الإيجار",
    electricity: "الكهرباء",
    water: "الماء",
    internet: "الإنترنت",
    maintenance: "صيانة المعدات",
    other: "أخرى",
    invoiceDetails: "فواتير الخدمات",
    partsSales: "مبيعات قطع الغيار المباشرة",
    currency: " د.م.",
    workshopTitle: "AutoWorkshop Suite",
  },
};
