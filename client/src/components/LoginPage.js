import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, TextField, Stack, Typography, Alert } from '@mui/material'
import { useState } from 'react'
import { Container } from '@mui/system'
import { useTranslation } from 'react-i18next';

function LoginPage() {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('dummy@email')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)

    const navigate = useNavigate();

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
        if (data.token) {navigate('/')}
    else {setAlert(true)}})
    }

    return (
        <Container maxWidth="sm" sx={{mt:2}}>
            <Typography variant="h3">{t ('Login Page')}</Typography>
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
            <Button component={Link} to="/register" variant="contained" sx={{mt:"20px"}}>{t ("Don't have an account?")}</Button>

        </Container>
        )
    }

export default LoginPage