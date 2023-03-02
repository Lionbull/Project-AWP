import React from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Container } from '@mui/system'

function LoginPage() {

    const [email, setEmail] = useState('dummy@email')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
    }).then(res => {return res.json()}).then(data => {console.log(data.token);localStorage.setItem('token', data.token)})
    }

    return (
        <Container maxWidth="sm" sx={{mt:2}}>
            <Typography variant="h3">Login Page</Typography>
            <Stack spacing={2}>

                <TextField id="user_email" label="Email" sx={{mt:"20px"}} onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="user_password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{mt:"20px"}} onClick={handleSubmit}>Login</Button>

            </Stack>
            <Button component={Link} to="/register" variant="contained" sx={{mt:"20px"}}>Don't have an account?</Button>

        </Container>
        )
    }

export default LoginPage