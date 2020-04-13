import { TypeInvoice } from "../enums";

export type Invoice = {
  id: number,
  type: TypeInvoice,
  folio: number,
  issueDate: Date,
  details: DetailInvoice[],
  emitter: Company,
  receiver: Company,
  createdAt: Date,
  updatedAt: Date
}

export type DetailInvoice = {
  id: number,
  description: string,
  amount: number,
  tax: number,
  createdAt: Date,
  updatedAt: Date
}

export type Company = {
  id: number,
  rut: string,
  businessName: string,
  createdAt: Date,
  updatedAt: Date
}

export type InvoiceResponse = {
  invoices: Invoice[],
  total_invoices: number,
  pages: number,
  current_page: number
}
