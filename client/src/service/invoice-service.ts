import axios from 'axios';
import config from '../config';
import { InvoiceResponse } from '../types';

export default class pageservice {
  public static async getInvoices(page: number = 1, itemsPerPage: number = 10): Promise<InvoiceResponse> {
    try {
      const params = {
        page,
        itemsPerPage
      }
      
      const apiInvoiceResponse = await axios.get(`${config.apiurl}/invoices`, { params })
        .catch(() => ({
          data: {
            invoices: [],
            total_invoices: 0,
            pages: 0,
            current_page: page
          }
        }))
  
      return apiInvoiceResponse.data;
    } catch(error) {
      return {
        invoices: [],
        total_invoices: 0,
        pages: 0,
        current_page: page
      };
    }
  }

  public static async uploadXMLDocument(files: any): Promise<boolean> {
    try {
      const payload = new FormData();
      payload.append('file', files[0]);

      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      
      const apiInvoiceResponse = await axios.post(`${config.apiurl}/invoices/file`, payload, { headers })
        .catch(() => ({
          data: {
            recordsImported: false
          }
        }))
  
      return apiInvoiceResponse.data.recordsImported;
    } catch(error) {
      return false;
    }
  }
}
