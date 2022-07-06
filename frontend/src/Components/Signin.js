import React from 'react'
import TextField from '@mui/material/TextField'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'

export default function Signin() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
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
                    <Button variant="contained" color="primary">
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
