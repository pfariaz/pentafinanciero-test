
import React, { Component } from 'react';
import clsx from 'clsx';
import { Theme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './components/menu';
import Invoices from './components/invoices';
import { DropzoneDialog } from 'material-ui-dropzone';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import InvoiceService from '../../service/invoice-service';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Portal de documentos electronicos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const drawerWidth = 240;

type DashboardProps = {
  classes: any
}

type DashboardState = {
  open: boolean,
  openModal: boolean
  alert: {
    open: boolean,
    severity: 'success' | 'info' | 'warning' | 'error' | undefined,
    message: string
  },
  refreshInvoices: boolean
}

class Dashboard extends Component<DashboardProps, DashboardState> {

  state: Readonly<DashboardState> = {
      open: true,
      openModal: false,
      alert: {
        open: false,
        severity: 'info',
        message: ''
      },
      refreshInvoices: false
  };

  toggleModal = (openModal: boolean) => () => {
    this.setState({
      openModal
    });
  }

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      open
    });
  }

  toggleAlert = (open: boolean) => () => {
    this.setState({
      alert: {
        open,
        severity: this.state.alert.severity,
        message: this.state.alert.message
      }
    });
  }

  uploadXMLDocuments = async (files: any) => {
    const uploaded = await InvoiceService.uploadXMLDocument(files);
     if (uploaded) {
      this.setState({
        alert: {
          open: true,
          severity: 'success',
          message: 'Se ha cargado exitosamente el XML'
        },
        refreshInvoices: true
      });
     } else {
      this.setState({
        alert: {
          open: true,
          severity: 'error',
          message: 'Hubo un problema al cargar el XML, intente mas tarde.'
        }
      });
     }
  }

  render() {
    const { open, openModal, alert, refreshInvoices } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, (open !== null ? open: false) && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(false)}
              className={clsx(classes.menuButton, (open !== null ? open: false) && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !(open !== null ? open: false) && classes.drawerPaperClose),
          }}
          open={(open !== null ? open: false)}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.toggleDrawer(true)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
            <Collapse in={alert.open}>
                <Alert
                  severity={alert.severity}
                  action={
                    <IconButton
                      aria-label="close"
                      color="default"
                      size="small"
                      onClick={this.toggleAlert(false)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }>
                  {alert.message}
                </Alert>
              </Collapse>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Invoices refresh={refreshInvoices} />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
            <Fab color="primary" variant="extended" className={classes.fab} onClick={this.toggleModal(true)}>
              <SaveIcon/>
              Subir XML
            </Fab>
          </Container>
        </main>

        <DropzoneDialog
          open={openModal} 
          onClose={this.toggleModal(false)}
          acceptedFiles={['text/xml', 'application/xml']}
          filesLimit={1}
          showPreviews={false}
          showPreviewsInDropzone={true}
          dropzoneText={'Arrastre el archivo XML o haga click'}
          showAlerts={false}
          onSave={this.uploadXMLDocuments}
        />

      </div>
    );
  }
}

export default withStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))(Dashboard);
