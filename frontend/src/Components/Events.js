import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function Events() {
    const [ responseEvents, setResponseEvents ] = React.useState([]);
    const navigate = useNavigate();
    const [ isSignedIn, setIsSignedIn ] = React.useState(false);
    const [ isAdmin, setIsAdmin ] = React.useState(false);

    useEffect(() => {
        localStorage.getItem("token") === null
            ? setIsSignedIn(false)
            : setIsSignedIn(true);
        localStorage.getItem("user_type") === "admin"
            ? setIsAdmin(true)
            : setIsAdmin(false);
    }, []);

    const loadEvents = () => {
        const user_id = localStorage.getItem("user_id");
        axios.get("http://127.0.0.1:3001/api/events/")
            .then((response) => {
                setResponseEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addEvent = (event) => {

    }

    const handleSignout = (event) => {
        console.log("GamePage: handleSignout");
        event.preventDefault();
        localStorage.clear();
        axios
            .get("http://localhost:3001/auth/signout/")
            .then((response) => {
                console.log(response);
                navigate("/signin");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function formatDate(d) {
        var date = new Date(d);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            "  " +
            strTime
        );
    }

    return (
        <div>
            { !isSignedIn ? (
                <div>
                    <h1>
                        <NavLink to="/signin">Sign In To View This Page</NavLink>
                    </h1>
                </div>
            ) : (
                <div>
                    <h1>Events</h1>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/gamepage">Game Page</NavLink>
                            </Typography>
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/gamehistory">Your Games</NavLink>
                            </Typography>
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/leaderboard">Public LeaderBoard</NavLink>
                            </Typography>
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/events">Events</NavLink>
                            </Typography>
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/account">Your Account</NavLink>
                            </Typography>
                            <Button color="inherit" onClick={ handleSignout }>
                                Sign Out
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <br />
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 }>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ loadEvents }
                            >
                                Load Events
                            </Button>
                        </Grid>
                        </Grid>
                        { isAdmin ? (<div>
                            <br/>
                            <Grid container spacing={ 3 }>
                                <Grid item xs={ 12 }>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addEvent}
                                    >Create Event</Button>
                            </Grid>
                            </Grid>
                        </div>): (<></>)}
                    <br /> <br />
                    <TableContainer component={ Paper }>
                        <Table sx={ { minWidth: 650 } } aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Event Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Venue</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { responseEvents.map((row) => (
                                    <TableRow
                                        key={ row._id }
                                        sx={ { "&:last-child td, &:last-child th": { border: 0 } } }
                                    >
                                        <TableCell component="th" scope="row">
                                            { row.eventName }
                                        </TableCell>
                                        <TableCell align="right">{ row.description }</TableCell>
                                        <TableCell align="right">{ row.venue }</TableCell>
                                        <TableCell align="right">{ row.time }</TableCell>
                                        <TableCell align="right">{ formatDate(row.date) }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) }
        </div>
    )
}
