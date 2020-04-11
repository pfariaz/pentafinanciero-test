import Invoice from '../Invoice';
import { TypeInvoice } from '../../enums';
import DetailInvoice from '../Detail-Invoice';

describe('Promotion', () => {

  test('Create an invoice with minimal info', async () => {
    await Invoice.create({
      type: TypeInvoice.INVOICE,
      folio: 1,
      issueDate: new Date() }).save();
    expect(await Invoice.count()).toEqual(1);
  });

  test('Create an invoice with full info', async () => {
    const invoice = await Invoice.create({
      type: TypeInvoice.INVOICE,
      folio: 1,
      issueDate: new Date(),
      emitter: {
        rut: '1-1',
        businessName: 'Penta Financiero'
      },
      receiver: {
        rut: '2-2',
        businessName: 'Empresas ACME'
      }
    }).save();

    await DetailInvoice.create([{
      invoice,
      description: 'IPHONE X',
      amount: 59990,
      tax: 5
    }]);

    expect(await Invoice.count()).toEqual(1);
  });

  test('Throw error duplicate invoice', async () => {
    await Invoice.create({
      type: TypeInvoice.INVOICE,
      folio: 1,
      issueDate: new Date() }).save();
    const duplicatedInvoice = Invoice.create({
      type: TypeInvoice.INVOICE,
      folio: 1,
      issueDate: new Date() });
    await expect(duplicatedInvoice.save()).rejects.toThrowError(/unique/);
  });
});
