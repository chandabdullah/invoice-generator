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

  const isModern = state.template === 'modern';
  const isCorp = state.template === 'corporate';
  const isMinimal = state.template === 'minimal';
  const isElegant = state.template === 'elegant';
  const isBold = state.template === 'bold';

  const styles = StyleSheet.create({
    page: {
      padding: isBold ? 0 : 40,
      fontFamily: isModern || isBold ? 'Inter' : 'Helvetica',
      fontSize: 10,
      color: '#333',
      backgroundColor: '#fff',
    },
    // For bold template, we wrap content in a padded container
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
      borderBottomColor: isElegant ? '#eee' : state.brandColor,
      paddingBottom: isCorp || isElegant ? 20 : 0,
      backgroundColor: isBold ? state.brandColor : 'transparent',
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
      color: isModern ? state.brandColor : (isBold ? '#fff' : '#000'),
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
      borderLeftColor: state.brandColor,
      paddingLeft: isElegant ? 10 : (isMinimal ? 0 : 15),
    },
    infoTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isBold ? '#333' : state.brandColor,
      textTransform: isElegant ? 'uppercase' : 'none',
      letterSpacing: isElegant ? 1 : 0,
    },
    table: {
      width: '100%',
      marginBottom: 30,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isCorp || isBold ? state.brandColor : (isElegant ? 'transparent' : '#f3f4f6'),
      padding: 8,
      borderBottomWidth: isModern || isElegant ? 2 : 1,
      borderBottomColor: isElegant ? '#000' : state.brandColor,
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
      borderTopColor: state.brandColor,
    },
    totalText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isBold ? '#000' : state.brandColor,
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
    }
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

          {/* Outline Items Table */}
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
