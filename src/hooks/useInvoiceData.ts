import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { InvoiceData, InvoiceState, LineItem, SenderInfo, ClientInfo } from '../types';

export const useInvoiceData = () => {
  const [data, setData] = useState<InvoiceData>(() => ({
    sender: { name: '', email: '', address: '' },
    client: { name: '', email: '', address: '' },
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ id: uuidv4(), description: 'Design Services', quantity: 1, price: 150 }],
    taxRate: 10,
    discountRate: 0,
    currency: 'USD',
    logo: null,
    brandColor: '#0B4FD1', // default to blue-600
    template: 'modern',
  }));

  const updateSender = (updates: Partial<SenderInfo>) => setData((prev) => ({ ...prev, sender: { ...prev.sender, ...updates } }));
  const updateClient = (updates: Partial<ClientInfo>) => setData((prev) => ({ ...prev, client: { ...prev.client, ...updates } }));

  const updateData = (updates: Partial<InvoiceData>) => setData((prev) => ({ ...prev, ...updates }));

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: uuidv4(), description: '', quantity: 1, price: 0 }],
    }));
  };

  const updateItem = (id: string, updates: Partial<LineItem>) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Derived state (Calculations)
  const invoiceState: InvoiceState = useMemo(() => {
    const subTotal = data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const discountAmount = (subTotal * data.discountRate) / 100;
    const taxableAmount = subTotal - discountAmount;
    const taxAmount = (taxableAmount * data.taxRate) / 100;
    const totalAmount = taxableAmount + taxAmount;

    return {
      ...data,
      subTotal,
      taxAmount,
      discountAmount,
      totalAmount,
    };
  }, [data]);

  return {
    state: invoiceState,
    updateSender,
    updateClient,
    updateData,
    addItem,
    updateItem,
    removeItem,
    handleLogoUpload,
  };
};
