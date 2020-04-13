import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';
import { Theme, withStyles } from '@material-ui/core/styles';
import { InvoiceResponse, Invoice, DetailInvoice } from '../../../types';
import { TypeInvoice } from '../../../enums';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import InvoiceService from '../../../service/invoice-service';
import * as R from 'ramda';

type InvoicesProps = {
  classes: any,
  refresh: boolean
}

type InvoicesState = {
  data: InvoiceResponse
}

const types = {
  [TypeInvoice.INVOICE]: 'Factura',
  [TypeInvoice.TICKET]: 'Boleta'
}

const defaultInvoices = {
  invoices: [],
  total_invoices: 0,
  pages: 0,
  current_page: 1
}

class Invoices extends Component<InvoicesProps, InvoicesState> {

  state: Readonly<InvoicesState> = {
    data: defaultInvoices
  };

  getInvoices = async () => {
    try {
      const data = await InvoiceService.getInvoices();
      this.setState({
        data
      })
    } catch (error) {
      this.setState({
        data: defaultInvoices
      })
    }
  }

  componentDidUpdate = async () => {
    if (this.props.refresh) {
      const data = await InvoiceService.getInvoices();
      if (!R.equals(this.state.data, data)){
        console.log(`UPDATE: ${this.props.refresh}`);
        this.setState({
          data
        })
      }
    }
  }

  componentDidMount = async () => { 
    await this.getInvoices();
  }

  handleChange = async (event: any, page: number) => {
    const data = await InvoiceService.getInvoices(page);
    this.setState({
      data
    })
  };
  
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Title>Documentos electrónicos</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Folio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha Emisión</TableCell>
              <TableCell>Emisor</TableCell>
              <TableCell>Receptor</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.invoices.map((invoice: Invoice) => {
              let totalAmount = 0;
              return (
                <TableRow key={invoice.id.toString()}>
                  <TableCell>{invoice.folio}</TableCell>
                  <TableCell>{types[invoice.type]}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>
                    <strong>{`(${invoice.emitter.rut})`}</strong> {invoice.emitter.businessName}
                  </TableCell>
                  <TableCell>
                    <strong>{`(${invoice.receiver.rut})`}</strong> {invoice.receiver.businessName}
                  </TableCell>
                  <TableCell>{
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>I.V.A</TableCell>
                            <TableCell>Monto</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {invoice.details.map((detail: DetailInvoice) => {
                            totalAmount+= detail.amount;
                            return(
                                <TableRow key={detail.id.toString()}>
                                  <TableCell>{detail.description}</TableCell>
                                  <TableCell>{detail.tax}</TableCell>
                                  <TableCell>{detail.amount}</TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                      </Table>
                  }</TableCell>
                  <TableCell>{totalAmount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Typography>Page: {data.current_page}</Typography>
          <Pagination count={data.pages} page={data.current_page} onChange={this.handleChange}  />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles((theme: Theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))(Invoices);
