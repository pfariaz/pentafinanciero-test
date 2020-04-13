import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Theme, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../../config'
import { TOKEN_NAME } from '../../constants';
import { URLS } from '../../enums';

type LoginProps = {
  history: any,
  classes: any
}

type LoginState = {
  user: string,
  pass: string
}

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

class Login extends Component<LoginProps, LoginState> {

  componentWillMount() {
    this.setState({
      user: '',
      pass: ''
    })
  }
  handleChange = (field: string) => (event: any) =>
    field === 'user' ? this.setState({
      user: (event.target.value as string)
    }) : this.setState({
      pass: (event.target.value as string)
    })


  onsubmit = async (event: any) => {
    try {
      const { history } = this.props;

      const expectedUser = config['superuser']['user'] as string;
      const expectedPass = config['superuser']['pass'] as string;

      if (this.state.user !== expectedUser || this.state.pass !== expectedPass) {
        throw new Error("Not the right app!");
      }
      localStorage.setItem(TOKEN_NAME, btoa(expectedUser));
      history.push(URLS.DASHBOARD_URL);
      event.preventDefault();
    } catch (error) {
      alert('Password o email incorrectos');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onsubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.user ? this.state.user : ''}
              onChange={this.handleChange('user')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.pass ? this.state.pass : ''}
              onChange={this.handleChange('pass')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))(Login);
