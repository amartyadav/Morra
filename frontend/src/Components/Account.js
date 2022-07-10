import React, { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

export default function Account() {
    const [ isSignedIn, setIsSignedIn ] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.getItem("token") === null
            ? setIsSignedIn(false)
            : setIsSignedIn(true);
    }, []);

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

    const handleDeleteAccount = (event) => {
        console.log("GamePage: handleDeleteAccount");
        event.preventDefault();
        axios
            .delete(
                "/api/game/delete/" +
                localStorage.getItem("user_id"),
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
                // console.log("Deleted user's game records")
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .delete(
                "/api/users/" + localStorage.getItem("user_id"),
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Account deleted");
                navigate("/");
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
                    <h1>Your Account</h1>
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
                    <br />

                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 }>
                            <Card
                                sx={ {
                                    minWidth: 300,
                                    maxWidth: 500,
                                    margin: "auto",
                                } }
                            >
                                <CardContent>
                                    <Typography variant="h5">Name</Typography>
                                    <br />
                                    <Typography variant="body">
                                        { localStorage.getItem("user_name") }
                                    </Typography>
                                    <br />
                                    <br />
                                    <Divider />
                                    <br />
                                    <Typography variant="h5">Email</Typography>
                                    <br />
                                    <Typography variant="body">
                                        { localStorage.getItem("user_email") }
                                    </Typography>
                                    <br />
                                    <br />
                                    <Divider />
                                    <br />
                                    <Typography variant="h5">Last Updated</Typography>
                                    <br />
                                    <Typography variant="body">
                                        { Date(localStorage.getItem("updated_at")) }
                                    </Typography>
                                    <br />
                                    <br />
                                    <Divider />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={ handleDeleteAccount }
                                    >
                                        Delete Account
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            ) }{ " " }
        </div>
    );
}
