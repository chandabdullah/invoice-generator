import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { InvoiceState } from '../../types';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZJhjp-Ek-_EeA.woff', fontWeight: 600 },
  ],
});

interface Props {
  state: InvoiceState;
}

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'USD': default: return '$';
  }
};

export const InvoiceDocument: React.FC<Props> = ({ state }) => {
  const symbol = getCurrencySymbol(state.currency);
  const brand = state.brandColor;

  const isModern  = state.template === 'modern';
  const isCorp    = state.template === 'corporate';
  const isMinimal = state.template === 'minimal';
  const isElegant = state.template === 'elegant';
  const isBold    = state.template === 'bold';
  const isSlate   = state.template === 'slate';
  const isNeon    = state.template === 'neon';
  const isClassic = state.template === 'classic';

  // ─── SLATE template: dark left-sidebar ───────────────────────────────────
  if (isSlate) {
    const s = StyleSheet.create({
      page: { flexDirection: 'row', fontFamily: 'Inter', fontSize: 10, backgroundColor: '#fff' },
      sidebar: { width: 180, backgroundColor: '#1e293b', padding: 30, flexDirection: 'column' },
      sidebarTitle: { fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 },
      sidebarSub: { fontSize: 9, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 24 },
      sidebarSection: { marginBottom: 20 },
      sidebarLabel: { fontSize: 8, color: brand, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
      sidebarText: { fontSize: 9, color: '#cbd5e1', lineHeight: 1.6 },
      sidebarDivider: { height: 1, backgroundColor: '#334155', marginVertical: 16 },
      logo: { width: 70, height: 50, objectFit: 'contain', marginBottom: 16 },
      main: { flex: 1, padding: 36, flexDirection: 'column' },
      metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
      metaLabel: { fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
      metaValue: { fontSize: 11, color: '#1e293b', fontWeight: 600 },
      tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 9, borderRadius: 4 },
      tableHeaderText: { fontWeight: 600, fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 },
      tableRow: { flexDirection: 'row', paddingVertical: 9, paddingHorizontal: 9, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
      col1: { width: '48%' }, col2: { width: '16%', textAlign: 'center' },
      col3: { width: '16%', textAlign: 'right' }, col4: { width: '20%', textAlign: 'right' },
      summaryBlock: { alignSelf: 'flex-end', width: '42%', marginTop: 20 },
      summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, color: '#475569' },
      totalBox: { backgroundColor: '#1e293b', borderRadius: 6, padding: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
      totalText: { fontSize: 13, fontWeight: 600, color: '#fff' },
      notesBox: { marginTop: 28, backgroundColor: '#f8fafc', borderRadius: 6, padding: 14, borderLeftWidth: 3, borderLeftColor: brand },
      notesLabel: { fontSize: 8, fontWeight: 600, color: brand, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
      notesText: { fontSize: 9, color: '#475569', lineHeight: 1.7 },
    });
    return (
      <Document>
        <Page size="A4" style={s.page}>
          {/* Sidebar */}
          <View style={s.sidebar}>
            {state.logo ? <Image src={state.logo} style={s.logo} /> : null}
            <Text style={s.sidebarTitle}>{state.logo ? 'INVOICE' : 'INVOICE'}</Text>
            <Text style={s.sidebarSub}>{state.invoiceNumber}</Text>
            <View style={s.sidebarDivider} />
            <View style={s.sidebarSection}>
              <Text style={s.sidebarLabel}>From</Text>
              <Text style={[s.sidebarText, { fontWeight: 600, color: '#e2e8f0' }]}>{state.sender.name || 'Your Company'}</Text>
              <Text style={s.sidebarText}>{state.sender.email}</Text>
              <Text style={s.sidebarText}>{state.sender.address}</Text>
            </View>
            <View style={s.sidebarDivider} />
            <View style={s.sidebarSection}>
              <Text style={s.sidebarLabel}>Billed To</Text>
              <Text style={[s.sidebarText, { fontWeight: 600, color: '#e2e8f0' }]}>{state.client.name || 'Client Name'}</Text>
              <Text style={s.sidebarText}>{state.client.email}</Text>
              <Text style={s.sidebarText}>{state.client.address}</Text>
            </View>
            <View style={s.sidebarDivider} />
            <View style={s.sidebarSection}>
              <Text style={s.sidebarLabel}>Date</Text>
              <Text style={s.sidebarText}>{state.date}</Text>
            </View>
            {state.dueDate && (
              <View style={s.sidebarSection}>
                <Text style={s.sidebarLabel}>Due Date</Text>
                <Text style={s.sidebarText}>{state.dueDate}</Text>
              </View>
            )}
          </View>

          {/* Main content */}
          <View style={s.main}>
            <View style={s.tableHeader}>
              <Text style={[s.col1, s.tableHeaderText]}>Description</Text>
              <Text style={[s.col2, s.tableHeaderText]}>Qty</Text>
              <Text style={[s.col3, s.tableHeaderText]}>Rate</Text>
              <Text style={[s.col4, s.tableHeaderText]}>Amount</Text>
            </View>
            {state.items.map(item => (
              <View key={item.id} style={s.tableRow}>
                <Text style={s.col1}>{item.description || 'Item'}</Text>
                <Text style={s.col2}>{item.quantity}</Text>
                <Text style={s.col3}>{symbol}{item.price.toFixed(2)}</Text>
                <Text style={s.col4}>{symbol}{(item.quantity * item.price).toFixed(2)}</Text>
              </View>
            ))}

            <View style={s.summaryBlock}>
              <View style={s.summaryRow}><Text>Subtotal</Text><Text>{symbol}{state.subTotal.toFixed(2)}</Text></View>
              {state.discountRate > 0 && <View style={s.summaryRow}><Text>Discount ({state.discountRate}%)</Text><Text>-{symbol}{state.discountAmount.toFixed(2)}</Text></View>}
              {state.taxRate > 0 && <View style={s.summaryRow}><Text>Tax ({state.taxRate}%)</Text><Text>{symbol}{state.taxAmount.toFixed(2)}</Text></View>}
              <View style={s.totalBox}>
                <Text style={s.totalText}>Total Due</Text>
                <Text style={s.totalText}>{symbol}{state.totalAmount.toFixed(2)}</Text>
              </View>
            </View>

            {state.notes ? (
              <View style={s.notesBox}>
                <Text style={s.notesLabel}>Notes &amp; Payment Details</Text>
                <Text style={s.notesText}>{state.notes}</Text>
              </View>
            ) : null}
          </View>
        </Page>
      </Document>
    );
  }

  // ─── NEON template: dark background, vivid accents ──────────────────────
  if (isNeon) {
    const s = StyleSheet.create({
      page: { fontFamily: 'Inter', fontSize: 10, backgroundColor: '#0f0f1a', padding: 40, color: '#e2e8f0' },
      header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#2d2d4a' },
      logo: { width: 70, height: 50, objectFit: 'contain' },
      invoiceTitle: { fontSize: 30, fontWeight: 600, color: brand, letterSpacing: 2 },
      metaText: { fontSize: 9, color: '#94a3b8', marginBottom: 3 },
      infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 36 },
      infoBlock: { width: '45%' },
      infoLabel: { fontSize: 8, color: brand, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 },
      infoName: { fontWeight: 600, color: '#f1f5f9', marginBottom: 3, fontSize: 11 },
      infoSub: { color: '#94a3b8', lineHeight: 1.6 },
      tableHeader: { flexDirection: 'row', backgroundColor: '#1a1a2e', padding: 10, borderBottomWidth: 2, borderBottomColor: brand },
      tableHeaderText: { fontWeight: 600, fontSize: 9, color: brand, textTransform: 'uppercase', letterSpacing: 1 },
      tableRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#1e1e35' },
      col1: { width: '48%' }, col2: { width: '16%', textAlign: 'center' },
      col3: { width: '16%', textAlign: 'right' }, col4: { width: '20%', textAlign: 'right' },
      summaryBlock: { alignSelf: 'flex-end', width: '44%', marginTop: 24 },
      summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, color: '#94a3b8' },
      totalBox: { marginTop: 10, padding: 14, borderWidth: 1, borderColor: brand, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' },
      totalText: { fontSize: 14, fontWeight: 600, color: brand },
      notesBox: { marginTop: 30, padding: 16, borderWidth: 1, borderColor: '#2d2d4a', borderRadius: 6 },
      notesLabel: { fontSize: 8, fontWeight: 600, color: brand, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
      notesText: { fontSize: 9, color: '#94a3b8', lineHeight: 1.7 },
    });
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={s.header}>
            <View>
              {state.logo ? <Image src={state.logo} style={s.logo} /> : <Text style={s.invoiceTitle}>INVOICE</Text>}
              {state.logo && <Text style={[s.invoiceTitle, { marginTop: 8 }]}>INVOICE</Text>}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.metaText}>#{state.invoiceNumber}</Text>
              <Text style={s.metaText}>Date: {state.date}</Text>
              {state.dueDate && <Text style={s.metaText}>Due: {state.dueDate}</Text>}
            </View>
          </View>

          <View style={s.infoRow}>
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>From</Text>
              <Text style={s.infoName}>{state.sender.name || 'Your Company'}</Text>
              <Text style={s.infoSub}>{state.sender.email}</Text>
              <Text style={s.infoSub}>{state.sender.address}</Text>
            </View>
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>Bill To</Text>
              <Text style={s.infoName}>{state.client.name || 'Client Name'}</Text>
              <Text style={s.infoSub}>{state.client.email}</Text>
              <Text style={s.infoSub}>{state.client.address}</Text>
            </View>
          </View>

          <View style={s.tableHeader}>
            <Text style={[s.col1, s.tableHeaderText]}>Description</Text>
            <Text style={[s.col2, s.tableHeaderText]}>Qty</Text>
            <Text style={[s.col3, s.tableHeaderText]}>Rate</Text>
            <Text style={[s.col4, s.tableHeaderText]}>Amount</Text>
          </View>
          {state.items.map(item => (
            <View key={item.id} style={s.tableRow}>
              <Text style={s.col1}>{item.description || 'Item'}</Text>
              <Text style={s.col2}>{item.quantity}</Text>
              <Text style={s.col3}>{symbol}{item.price.toFixed(2)}</Text>
              <Text style={s.col4}>{symbol}{(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}

          <View style={s.summaryBlock}>
            <View style={s.summaryRow}><Text>Subtotal</Text><Text>{symbol}{state.subTotal.toFixed(2)}</Text></View>
            {state.discountRate > 0 && <View style={s.summaryRow}><Text>Discount ({state.discountRate}%)</Text><Text>-{symbol}{state.discountAmount.toFixed(2)}</Text></View>}
            {state.taxRate > 0 && <View style={s.summaryRow}><Text>Tax ({state.taxRate}%)</Text><Text>{symbol}{state.taxAmount.toFixed(2)}</Text></View>}
            <View style={s.totalBox}>
              <Text style={s.totalText}>Total Due</Text>
              <Text style={s.totalText}>{symbol}{state.totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {state.notes ? (
            <View style={s.notesBox}>
              <Text style={s.notesLabel}>Notes &amp; Payment Details</Text>
              <Text style={s.notesText}>{state.notes}</Text>
            </View>
          ) : null}
        </Page>
      </Document>
    );
  }

  // ─── CLASSIC template: ledger/serif style ────────────────────────────────
  if (isClassic) {
    const s = StyleSheet.create({
      page: { fontFamily: 'Helvetica', fontSize: 10, backgroundColor: '#fdfbf7', padding: 50, color: '#1c1c1c' },
      topBorder: { height: 4, backgroundColor: brand, marginBottom: 36 },
      header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
      logo: { width: 80, height: 55, objectFit: 'contain' },
      companyName: { fontSize: 20, fontWeight: 600, color: '#1c1c1c', marginBottom: 4 },
      invoiceLabel: { fontSize: 24, fontWeight: 600, color: brand, letterSpacing: 1, textAlign: 'right' },
      invoiceNum: { fontSize: 11, color: '#555', marginTop: 4, textAlign: 'right' },
      divider: { height: 1, backgroundColor: '#d4c9b0', marginVertical: 20 },
      infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
      infoBlock: { width: '45%' },
      infoLabel: { fontSize: 9, fontWeight: 600, color: brand, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: '#d4c9b0', paddingBottom: 3 },
      infoName: { fontWeight: 600, marginBottom: 3 },
      infoSub: { color: '#555', lineHeight: 1.6 },
      dateRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 28, marginBottom: 24 },
      dateLabel: { fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 },
      dateValue: { fontSize: 10, fontWeight: 600 },
      tableHeader: { flexDirection: 'row', borderTopWidth: 2, borderTopColor: brand, borderBottomWidth: 1, borderBottomColor: brand, paddingVertical: 7, paddingHorizontal: 4 },
      tableHeaderText: { fontWeight: 600, fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5 },
      tableRow: { flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#e8e0d0' },
      tableRowAlt: { backgroundColor: '#f9f4ec' },
      col1: { width: '48%' }, col2: { width: '16%', textAlign: 'center' },
      col3: { width: '16%', textAlign: 'right' }, col4: { width: '20%', textAlign: 'right' },
      summaryBlock: { alignSelf: 'flex-end', width: '40%', marginTop: 20 },
      summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#e8e0d0', color: '#555' },
      totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 2, borderTopColor: brand, marginTop: 4 },
      totalText: { fontSize: 13, fontWeight: 600, color: brand },
      notesBox: { marginTop: 30, padding: 14, borderWidth: 1, borderColor: '#d4c9b0', borderRadius: 3, backgroundColor: '#fdf8ef' },
      notesLabel: { fontSize: 9, fontWeight: 600, color: brand, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
      notesText: { fontSize: 9, color: '#555', lineHeight: 1.7 },
      bottomBorder: { height: 3, backgroundColor: brand, marginTop: 30 },
    });
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={s.topBorder} />

          <View style={s.header}>
            <View>
              {state.logo
                ? <Image src={state.logo} style={s.logo} />
                : <Text style={s.companyName}>{state.sender.name || 'Your Company'}</Text>}
            </View>
            <View>
              <Text style={s.invoiceLabel}>INVOICE</Text>
              <Text style={s.invoiceNum}>#{state.invoiceNumber}</Text>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.infoRow}>
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>From</Text>
              <Text style={s.infoName}>{state.sender.name || 'Your Company'}</Text>
              <Text style={s.infoSub}>{state.sender.email}</Text>
              <Text style={s.infoSub}>{state.sender.address}</Text>
            </View>
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>Bill To</Text>
              <Text style={s.infoName}>{state.client.name || 'Client Name'}</Text>
              <Text style={s.infoSub}>{state.client.email}</Text>
              <Text style={s.infoSub}>{state.client.address}</Text>
            </View>
          </View>

          <View style={s.dateRow}>
            <View>
              <Text style={s.dateLabel}>Invoice Date</Text>
              <Text style={s.dateValue}>{state.date}</Text>
            </View>
            {state.dueDate && (
              <View>
                <Text style={s.dateLabel}>Due Date</Text>
                <Text style={s.dateValue}>{state.dueDate}</Text>
              </View>
            )}
          </View>

          <View style={s.tableHeader}>
            <Text style={[s.col1, s.tableHeaderText]}>Description</Text>
            <Text style={[s.col2, s.tableHeaderText]}>Qty</Text>
            <Text style={[s.col3, s.tableHeaderText]}>Unit Price</Text>
            <Text style={[s.col4, s.tableHeaderText]}>Amount</Text>
          </View>
          {state.items.map((item, i) => (
            <View key={item.id} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
              <Text style={s.col1}>{item.description || 'Item'}</Text>
              <Text style={s.col2}>{item.quantity}</Text>
              <Text style={s.col3}>{symbol}{item.price.toFixed(2)}</Text>
              <Text style={s.col4}>{symbol}{(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}

          <View style={s.summaryBlock}>
            <View style={s.summaryRow}><Text>Subtotal</Text><Text>{symbol}{state.subTotal.toFixed(2)}</Text></View>
            {state.discountRate > 0 && <View style={s.summaryRow}><Text>Discount ({state.discountRate}%)</Text><Text>-{symbol}{state.discountAmount.toFixed(2)}</Text></View>}
            {state.taxRate > 0 && <View style={s.summaryRow}><Text>Tax ({state.taxRate}%)</Text><Text>{symbol}{state.taxAmount.toFixed(2)}</Text></View>}
            <View style={s.totalRow}>
              <Text style={s.totalText}>Balance Due</Text>
              <Text style={s.totalText}>{symbol}{state.totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {state.notes ? (
            <View style={s.notesBox}>
              <Text style={s.notesLabel}>Notes &amp; Payment Details</Text>
              <Text style={s.notesText}>{state.notes}</Text>
            </View>
          ) : null}

          <View style={s.bottomBorder} />
        </Page>
      </Document>
    );
  }

  // ─── ORIGINAL 5 templates (minimal / corporate / modern / elegant / bold) ─
  const styles = StyleSheet.create({
    page: {
      padding: isBold ? 0 : 40,
      fontFamily: isModern || isBold ? 'Inter' : 'Helvetica',
      fontSize: 10,
      color: '#333',
      backgroundColor: '#fff',
    },
    contentContainer: {
      padding: isBold ? 40 : 0,
      paddingTop: isBold ? 30 : 0,
    },
    headerRow: {
      flexDirection: isElegant ? 'column' : 'row',
      justifyContent: isElegant ? 'center' : 'space-between',
      alignItems: isElegant ? 'center' : 'flex-start',
      marginBottom: 40,
      borderBottomWidth: isCorp || isElegant ? 2 : 0,
      borderBottomColor: isElegant ? '#eee' : brand,
      paddingBottom: isCorp || isElegant ? 20 : 0,
      backgroundColor: isBold ? brand : 'transparent',
      padding: isBold ? 40 : 0,
      color: isBold ? '#fff' : '#000',
    },
    logo: {
      width: 80,
      height: 80,
      objectFit: 'contain',
      marginBottom: isElegant ? 15 : 0,
    },
    title: {
      fontSize: isBold ? 32 : 24,
      fontWeight: 'bold',
      color: isModern ? brand : (isBold ? '#fff' : '#000'),
      letterSpacing: isElegant ? 2 : 0,
      textAlign: isElegant ? 'center' : 'left',
    },
    metaBlock: {
      alignItems: isElegant ? 'center' : 'flex-end',
      marginTop: isElegant ? 15 : 0,
    },
    metaText: {
      color: isBold ? '#eee' : '#666',
      marginBottom: 4,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
    },
    infoBlock: {
      width: '45%',
      backgroundColor: isMinimal || isElegant ? 'transparent' : '#f9fafb',
      padding: isMinimal || isElegant ? 0 : 15,
      borderRadius: 4,
      borderLeftWidth: isElegant ? 2 : 0,
      borderLeftColor: brand,
      paddingLeft: isElegant ? 10 : (isMinimal ? 0 : 15),
    },
    infoTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isBold ? '#333' : brand,
      textTransform: isElegant ? 'uppercase' : 'none',
      letterSpacing: isElegant ? 1 : 0,
    },
    table: {
      width: '100%',
      marginBottom: 30,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isCorp || isBold ? brand : (isElegant ? 'transparent' : '#f3f4f6'),
      padding: 8,
      borderBottomWidth: isModern || isElegant ? 2 : 1,
      borderBottomColor: isElegant ? '#000' : brand,
    },
    tableHeaderText: {
      fontWeight: 'bold',
      color: isCorp || isBold ? '#fff' : '#000',
      textTransform: isElegant ? 'uppercase' : 'none',
      fontSize: isElegant ? 9 : 10,
    },
    tableRow: {
      flexDirection: 'row',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    },
    col1: { width: '50%' },
    col2: { width: '15%', textAlign: 'center' },
    col3: { width: '15%', textAlign: 'right' },
    col4: { width: '20%', textAlign: 'right' },
    summaryBlock: {
      width: '40%',
      alignSelf: 'flex-end',
      backgroundColor: isMinimal || isElegant ? 'transparent' : '#f9fafb',
      padding: isMinimal || isElegant ? 0 : 15,
      borderRadius: 4,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 2,
      borderTopColor: brand,
    },
    totalText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isBold ? '#000' : brand,
    },
    notesBox: {
      marginTop: 30,
      padding: 14,
      backgroundColor: '#f9fafb',
      borderRadius: 4,
      borderLeftWidth: 3,
      borderLeftColor: brand,
    },
    notesLabel: {
      fontSize: 9,
      fontWeight: 'bold',
      color: brand,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 5,
    },
    notesText: {
      fontSize: 9,
      color: '#555',
      lineHeight: 1.6,
    },
    footer: {
      position: 'absolute',
      bottom: isBold ? 20 : 40,
      left: 40,
      right: 40,
      textAlign: 'center',
      color: '#888',
      fontSize: 9,
      borderTopWidth: 1,
      borderTopColor: '#eaeaea',
      paddingTop: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ alignItems: isElegant ? 'center' : 'flex-start' }}>
            {state.logo ? (
              <Image src={state.logo} style={styles.logo} />
            ) : (
              <Text style={styles.title}>INVOICE</Text>
            )}
          </View>
          <View style={styles.metaBlock}>
            {state.logo && !isElegant && <Text style={[styles.title, { marginBottom: 10 }]}>INVOICE</Text>}
            {state.logo && isElegant && <Text style={[styles.title, { marginTop: 10, marginBottom: 10 }]}>INVOICE</Text>}
            <Text style={styles.metaText}>Invoice #: {state.invoiceNumber}</Text>
            <Text style={styles.metaText}>Date: {state.date}</Text>
            {state.dueDate && <Text style={styles.metaText}>Due Date: {state.dueDate}</Text>}
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Info Blocks */}
          <View style={styles.section}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>From:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{state.sender.name || 'Your Company'}</Text>
              <Text>{state.sender.email || 'email@company.com'}</Text>
              <Text style={{ marginTop: 4 }}>{state.sender.address}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Bill To:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{state.client.name || 'Client Name'}</Text>
              <Text>{state.client.email || 'client@email.com'}</Text>
              <Text style={{ marginTop: 4 }}>{state.client.address}</Text>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.col1, styles.tableHeaderText]}>Description</Text>
              <Text style={[styles.col2, styles.tableHeaderText]}>Quantity</Text>
              <Text style={[styles.col3, styles.tableHeaderText]}>Price</Text>
              <Text style={[styles.col4, styles.tableHeaderText]}>Amount</Text>
            </View>
            {state.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.col1}>{item.description || 'Item Description'}</Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col3}>{symbol}{item.price.toFixed(2)}</Text>
                <Text style={styles.col4}>{symbol}{(item.quantity * item.price).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Summary */}
          <View style={styles.summaryBlock}>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text>{symbol}{state.subTotal.toFixed(2)}</Text>
            </View>
            {state.discountRate > 0 && (
              <View style={styles.summaryRow}>
                <Text>Discount ({state.discountRate}%):</Text>
                <Text>-{symbol}{state.discountAmount.toFixed(2)}</Text>
              </View>
            )}
            {state.taxRate > 0 && (
              <View style={styles.summaryRow}>
                <Text>Tax ({state.taxRate}%):</Text>
                <Text>{symbol}{state.taxAmount.toFixed(2)}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Due:</Text>
              <Text style={styles.totalText}>{symbol}{state.totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Notes / Bank Details */}
          {state.notes ? (
            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>Notes &amp; Payment Details</Text>
              <Text style={styles.notesText}>{state.notes}</Text>
            </View>
          ) : null}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Thank you for your business.
            {state.dueDate ? ` Please remit payment by ${state.dueDate}.` : ''}
          </Text>
        </View>

      </Page>
    </Document>
  );
};
