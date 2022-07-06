import React from 'react'
import TextField from '@mui/material/TextField'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleClick = (event) => {
        console.log("Signup: handleClick");
        //event.preventDefault();
        navigate('/signin');
        // fetch('/api/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name,
        //         email,
        //         password
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     Navigate('/signin')
        // })
    }

    return (
        <div>
            <h1>
                Sign Up to Morra
            </h1>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                        value={name}
                        onChange={handleNameChange}/>
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                        value={email}
                        onChange={handleEmailChange}/>
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Password" variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}/>
                </Grid>
                <Grid item
                    xs={12}>
                    <Button variant="contained" color="primary"
                        onClick={handleClick}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
