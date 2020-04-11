import * as xml from 'xml2js';
import { readFileSync } from 'fs';
import Invoice from '../entities/Invoice';
import { TypeInvoice } from '../enums';
import DetailInvoice from '../entities/Detail-Invoice';
import { getConnection } from 'typeorm';
import * as moment from 'moment';
import Company from '../entities/Company';
import { logger } from '../initialization/winston';

export  class InvoiceImporter {

  public static async fromFile(filePath: string): Promise<boolean> {
    try{
      let processSuccessful = false;
      const doc = await this.parseXML(filePath);
      await getConnection().transaction(async (transactionalEntityManager) => {
        const emitterToCreate =  transactionalEntityManager.create(
        Company,
          {
            rut: doc.dte.emisor[0].$.rut,
            businessName: doc.dte.emisor[0].$.razonSocial
          }
      );
        const emitterCreated = await transactionalEntityManager.save(emitterToCreate);

        const receiverToCreate =  transactionalEntityManager.create(
        Company,
          {
            rut: doc.dte.receptor[0].$.rut,
            businessName: doc.dte.receptor[0].$.razonSocial
          }
      );
        const receiverCreated = await transactionalEntityManager.save(receiverToCreate);

        const invoiceToCreate =  transactionalEntityManager.create(
        Invoice,
          {
            type: (doc.dte.$.tipo === 'factura' ? TypeInvoice.INVOICE : TypeInvoice.TICKET),
            folio: doc.dte.$.folio,
            issueDate: moment.unix(doc.dte.$.emision),
            emitter: emitterCreated,
            receiver: receiverCreated
          }
      );
        const invoiceCreated = await transactionalEntityManager.save(invoiceToCreate);

        const details = transactionalEntityManager.create(
        DetailInvoice,
        doc.dte.items[0].detalle.map((item: any) => ({
          invoice: invoiceCreated,
          description: item._,
          amount: item.$.monto,
          tax: item.$.iva
        }))
      );
        await transactionalEntityManager.save(details);

        processSuccessful = true;
      });
      return processSuccessful;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  public static async parseXML(filePath: string): Promise<any> {
    const file = readFileSync(filePath, 'utf8');
    return await xml.parseStringPromise(file);
  }

}
