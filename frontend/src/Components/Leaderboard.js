import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Grid} from '@mui/material';
import Divider from '@mui/material/Divider';
export default function Leaderboard() {
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.getItem("token") === null ? setIsSignedIn(false) : setIsSignedIn(true)
    }, [])

    const loadLeaderboard = () => {
        
    }

  return (
    <div>Leaderboard</div>
  )
}
