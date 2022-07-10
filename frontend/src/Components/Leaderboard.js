import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink, NavNavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
export default function Leaderboard() {
  const [ isSignedIn, setIsSignedIn ] = React.useState(false);
  const navigate = useNavigate();
  const [ responseLeaderBoard, setResponseLeaderBoard ] = React.useState([]);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsSignedIn(false)
      : setIsSignedIn(true);
  }, []);

  const loadLeaderboard = () => {
    axios
      .get("/api/game/highscore", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setResponseLeaderBoard(response.data);
        // return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignout = (event) => {
    console.log("GamePage: handleSignout");
    event.preventDefault();
    localStorage.clear();
    axios
      .get("/auth/signout/")
      .then((response) => {
        console.log(response);
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      { " " }
      { !isSignedIn ? (
        <div>
          <h1>
            <NavLink to="/signin">Sign In To View This Page</NavLink>
          </h1>
        </div>
      ) : (
        <div>
          <h1>LeaderBoard</h1>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                <NavLink
                  style={ { textDecoration: 'none', color: 'inherit' } }
                  to="/gamepage"
                  className={ (isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Game Page
                </NavLink>
              </Typography>
              <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                <NavLink
                  style={ { textDecoration: 'none', color: 'inherit' } }
                  to="/gamehistory"
                  className={ (isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Your Games
                </NavLink>
              </Typography>
              <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                <NavLink
                  style={ { textDecoration: 'none', color: 'inherit' } }
                  to="/leaderboard"
                  className={ (isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Public LeaderBoard
                </NavLink>
              </Typography>
              <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/events">Events</NavLink>
              </Typography>
              <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                <NavLink
                  style={ { textDecoration: 'none', color: 'inherit' } }
                  to="/account"
                  className={ (isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Your Account
                </NavLink>
              </Typography>
              <Button color="inherit" onClick={ handleSignout }>
                Sign Out
              </Button>
            </Toolbar>
          </AppBar>
          <br />
          <br />
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
              <Button
                variant="contained"
                color="primary"
                onClick={ loadLeaderboard }
              >
                Load LeaderBoard
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={ Paper }>
            <Table sx={ { minWidth: 650 } } aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">High Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { responseLeaderBoard.map((row) => (
                  <TableRow
                    key={ row._id }
                    sx={ { "&:last-child td, &:last-child th": { border: 0 } } }
                  >
                    <TableCell component="th" scope="row">
                      { row.name }
                    </TableCell>
                    <TableCell align="right">{ row.highScore }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) }{ " " }
    </div>
  );
}
