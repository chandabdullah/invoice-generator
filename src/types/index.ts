export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
}

export interface SenderInfo {
  name: string;
  email: string;
  address: string;
}

export type TemplateType = 'minimal' | 'corporate' | 'modern' | 'elegant' | 'bold' | 'slate' | 'neon' | 'classic';

export type CurrencyType = 'USD' | 'EUR' | 'GBP';

export interface InvoiceData {
  sender: SenderInfo;
  client: ClientInfo;
  invoiceNumber: string;
  date: string;
  dueDate?: string;
  items: LineItem[];
  taxRate: number;
  discountRate: number;
  currency: CurrencyType;
  logo: string | null;
  brandColor: string;
  template: TemplateType;
  notes: string;
}

export interface InvoiceState extends InvoiceData {
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
}
