import React from 'react'
import { Avatar,Button,TextField,FormControlLabel,Container,
Checkbox,Link,Box,Grid,Typography} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import Copyright from 'components/Copyright'
import Countries from 'components/Countries'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm,Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useGetRegisterQuery } from 'state/api'
import { useTheme } from '@mui/material'


const Register = () => {
    useGetRegisterQuery()
    const theme = useTheme()
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('A name which will be your username is required'),
        email: Yup.string().required("Email is required").email('Email is invalid'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'),null],'Passwords do not match'),
        acceptTerms:Yup.bool().oneOf([true],"Please accept our terms to register"),
        country:Yup.string().required("Please select the country you live in")
    })
    const { register,control,handleSubmit,formState:{ errors } } = useForm({resolver:yupResolver(validationSchema)})    
    const onSubmit = (data) => {
        const url = `${process.env.REACT_APP_BASE_URL}/auth/register`
        const name = data['name']
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
        axios.post(url,{
            name: capitalized,
            email: data['email'],
            password: data['password'],
            country:data['country'],
            acceptTerms:data['acceptTerms']
        })
        .then((res) =>{
            if(res.status === 201){
                alert('User successfully created')
                navigate('/')
            }            
        })
        .catch((err)=>{
            if(err.response.status === 409){
                alert("Email is already in use")
            }
            else{
                alert("Please try again later!!")
            }
        })
    }; 

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <Box component="form"  onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="Name"
                    label=" Name"
                    autoFocus
                    margin='dense'
                    {...register('name')}
                    error={errors.name ? true : false}
                />
                <Typography variant='inherit' color="textSecondary">
                    {errors.name?.message}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Countries register={register}
                errors ={errors}/>
                <Typography variant='inherit' color="textSecondary">
                    {errors.country?.message}
                </Typography>                
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    margin='dense'
                    {...register('email')}
                    error={errors.email ? true : false}
                />
                <Typography variant='inherit' color="textSecondary">
                    {errors.email?.message}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    autoComplete="password"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    margin='dense'
                    {...register('password')}
                    error={errors.password ? true : false }
                />  
                <Typography variant='inherit' color="textSecondary">
                    {errors.password?.message}
                </Typography>            
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    autoComplete="confirm-password"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    margin="dense"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword ? true : false}
                />
                <Typography variant='inherit' color="textSecondary">
                    {errors.confirmPassword?.message}
                </Typography>              
                </Grid>                                   
                <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Controller
                    control={control}
                    name="acceptTerms"
                    defaultValue="false"
                    inputRef={register()}
                    render={({ field: { onChange } }) => (
                        <Checkbox
                        color="secondary"
                        onChange={e => onChange(e.target.checked)}
                        />
                    )}
                    />
                }
                label={
                    <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                    I have read and agree to the Terms and Conditions
                    </Typography>
                }
                />
                <br />
                <Typography variant="inherit" color="textSecondary">
                {errors.acceptTerms
                    ? '(' + errors.acceptTerms.message + ')'
                    : ''}
                </Typography>
                </Grid>
            </Grid>
            <Button
                type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="/" variant="body2" color={theme.palette.secondary[200]}>
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default Register