import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField, Stack, Typography, Grid, Alert } from '@mui/material'
import { useState } from 'react'
import { Container } from '@mui/system'

function RegisterPage() {
    const [email, setEmail] = useState('dummy@email')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)

    const navigate = useNavigate();

    function handleSubmit() {
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        }).then(res => {return res.json()}).then(data => {
            console.log(data)
            if(data.message === "Registration successful!") {
                setAlert(true);
            }
        })
    }

  return (<>
        <Grid container justifyContent="flex-start">
            <Button component={Link} to="/login" variant="contained" sx={{m:"20px"}}>Back to login</Button>
        </Grid>
        
        <Container maxWidth="sm" sx={{mt:2}}>
            {alert? 
            <Alert severity="success">
                Registration successful!
                Now you can <Link to="/login">login</Link>!
            </Alert>: <></>
            }
            
            <Typography variant="h3">Register Page</Typography>
            <Stack spacing={2}>

                <TextField id="user_email" label="Email" sx={{mt:"20px"}} onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="user_password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{mt:"20px"}} onClick={handleSubmit}>Register</Button>

            </Stack>

        </Container>
        </>
  )
}

export default RegisterPage