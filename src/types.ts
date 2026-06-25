export interface ServiceInvoice {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  licensePlate: string;
  description: string;
  mechanicId: string;
  partsCost: number;
  laborCost: number;
  totalAmount: number;
  date: string;
  paymentStatus: "Paid" | "Unpaid" | "Partial";
}

export interface PartsSale {
  id: string;
  partName: string;
  customerName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  date: string;
}

export interface OperatingExpense {
  id: string;
  category: "Rent" | "Electricity" | "Water" | "Internet" | "Maintenance" | "Other";
  description: string;
  amount: number;
  date: string;
}

export interface InventoryPurchase {
  id: string;
  itemName: string;
  supplier: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  date: string;
  status: "Pending" | "Received" | "Cancelled";
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  hourlyRate: number;
  status: "Active" | "On Leave" | "Inactive";
}

export interface JobTask {
  id: string;
  description: string;
  vehicleDetails: string;
  assignedStaffId: string;
  status: "Pending" | "In Progress" | "Completed";
  estimatedHours: number;
  date: string;
}

export type Language = "en" | "fr" | "ar";
export type Theme = "light" | "dark";
export type Tab = "dashboard" | "revenues" | "expenses" | "staff";
