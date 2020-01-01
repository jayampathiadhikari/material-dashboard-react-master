import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import axios from "axios";
import * as constants from "../Flight/constants.js";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: "",
      password: "",
      username: "",
      userRef: null
    };
  }
  handleSubmit = event => {
    console.log(this.state.email, this.state.password);
    var postData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(constants.LOGIN_USER, postData)
      .then(res => {
        console.log(res.data.data);
        sessionStorage.setItem("userID", res.data.data[0].user_id);
        sessionStorage.setItem("userToken", res.headers["x-access-token"]);
        this.props.history.push({
          pathname: "/user",
          state: {
            userToken: res.headers["x-access-token"]
          }
        });
        console.log(res.headers["x-access-token"]);
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  signUp = () => {
    this.props.history.push({
      pathname: "/access/signUp",
      state: {
        name: "sample name"
      }
    });
  };

  //how to get those parameters
  //this.props.location.state.name
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.redirect}
            style={{ marginBottom: "50px" }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={text => {
                this.setState({
                  email: text.target.value
                });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              onChange={text => {
                this.setState({
                  password: text.target.value
                });
              }}
            />
            <Button
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="http://localhost:3000/access/signUp"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}
const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

// const useStyles = makeStyles(theme => ({
//     '@global': {
//       body: {
//         backgroundColor: theme.palette.common.white,
//       },
//     },
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',

//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: '100%',
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   }));

export default withStyles(styles)(Login);
