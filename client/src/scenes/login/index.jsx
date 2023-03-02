import React from 'react'
import { Avatar,Button,TextField,FormControlLabel,
Checkbox,Link,Paper,Box,Grid,Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import Copyright from 'components/Copyright'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"



const Login = () => { 
    const theme = useTheme()
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email('Email is invalid'),
        password: Yup.string().required('Password is required'),
    })   
    const { register,handleSubmit,formState:{ errors } } = useForm({resolver:yupResolver(validationSchema)})
    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('username',data['email'])
        formData.append('password',data['password'])
        axios({
            method: "post",
            url: 'http://localhost:8000/auth/login',
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
        })
        .then((res) =>{
            if(res.status === 200){
                localStorage.setItem("user",JSON.stringify(res.data))
                navigate('/dashboard')
            }        

        })
        .catch((err)=>{
            if(err.response.status === 403){
                alert('Invalid credentials')
            }
            else{
                alert("Please try again later!!")
            }
            console.log(err)
        })
    };
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=600)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: theme.palette.primary[300],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5" color={theme.palette.secondary[200]}>
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('email')}
                error={errors.email ? true : false}
                />
                <Typography variant='inherit' color="textSecondary">
                    {errors.email?.message}
                </Typography>
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={errors.password ? true : false }
                />
                <Typography variant='inherit' color="textSecondary">
                    {errors.password?.message}
                </Typography>          
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2" color={theme.palette.secondary[200]}>
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/register" variant="body2" color={theme.palette.secondary[200]}>
                    {"No account? Sign Up and enjoy the first week for FREE!!!"}
                    </Link>
                </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Box>
            </Box>
        </Grid>
        </Grid>
);
}

export default Login