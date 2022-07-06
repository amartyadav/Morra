import React from 'react'
import TextField from '@mui/material/TextField'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

export default function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleClick = (event) => {
        console.log("Signin: handleClick");
        event.preventDefault();
        navigate('/gamepage');
        // fetch('/api/users/signin', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     navigate('/game')
        // })
      }


    return (
        <div>
            <h1>
                Sign In to Morra
            </h1>

            <Grid container
                spacing={3}>
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
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
