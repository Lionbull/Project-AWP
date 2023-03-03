import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField, Stack, Typography, Alert } from '@mui/material'
import { useState } from 'react'
import { Container } from '@mui/system'
import { useTranslation } from 'react-i18next';

/**
 * This function is used to create the login page
 * 
 * @returns Login page
 */
function LoginPage() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('dummy@email')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)

    const navigate = useNavigate();

    // When "Login" button is clicked, this function is called and it sends the login credentials to the backend
    function handleSubmit() {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
    }).then(res => {return res.json()})
    .then(data => {console.log(data.token);
        localStorage.setItem('token', data.token)

        // Navigating to the posts page after login
        if (data.token) {navigate('/')}
    else {setAlert(true)}})
    }

    return (
        <Container maxWidth="sm" sx={{mt:2}}>
            <Typography variant="h3">{t ('Login Page')}</Typography>

            {/* If logging credentials are wrong. Alert pops up*/ }
            {alert? 
            <Alert severity="error">
                {t ('Login failed!')}
            </Alert>: <></>
            }
            <Stack spacing={2}>

                <TextField id="user_email" label="Email" sx={{mt:"20px"}} onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="user_password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{mt:"20px"}} onClick={handleSubmit}>{t ('Login')}</Button>

            </Stack>
            
            {/* Navigating to the "Register page" if button is clicked */}
            <Button component={Link} to="/register" variant="contained" sx={{mt:"20px"}}>{t ("Don't have an account?")}</Button>

        </Container>
        )
    }

export default LoginPage