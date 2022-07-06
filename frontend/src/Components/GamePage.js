import React from 'react'
import TextField from '@mui/material/TextField'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

export default function GamePage() {
    const navigate = useNavigate()
    const [yourPlay, setYourPlay] = React.useState('')
    const [yourGuess, setYourGuess] = React.useState('')
    const [yourScore, setYourScore] = React.useState(0)
    const [botScore, setBotScore] = React.useState(0)

    const handleClick = (event) => {
        console.log("GamePage: handleClick");
        event.preventDefault();
    }
    
    return (
        <div>
            <h1>GamePage</h1>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Your Play" variant="outlined"/
                    >
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Your Guess" variant="outlined"/
                    >
                        </Grid>
                <Grid item
                    xs={12}>
                    <Button variant="contained" color="primary"
                        onClick={handleClick}>
                        Submit
                    </Button>
                    </Grid>
                </Grid>
        </div>
    )
}
