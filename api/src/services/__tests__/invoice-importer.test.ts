import { InvoiceImporter } from '../invoice-importer';
const xmlFileInvoicePath = 'src/services/__tests__/factories/test.invoice.xml';
const xmlFileTicketPath = 'src/services/__tests__/factories/test.ticket.xml';
const xmlBadFilePath = 'src/services/__tests__/factories/test.bad.invoice.xml';

test('Should create an Invoice type from xml', async () => {
  const recordsImported = await InvoiceImporter.fromFile(xmlFileInvoicePath);
  expect(recordsImported).toBe(true);
});

test('Should create an Ticket type from xml', async () => {
  const recordsImported = await InvoiceImporter.fromFile(xmlFileTicketPath);
  expect(recordsImported).toBe(true);
});

test('Should not create an Invoice from incorrect xml', async () => {
  const recordsImported = await InvoiceImporter.fromFile(xmlBadFilePath);
  expect(recordsImported).toBe(false);
});
