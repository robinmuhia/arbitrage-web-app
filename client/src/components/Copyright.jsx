import React from 'react'
import { Typography,Link } from '@mui/material'

const Copyright = (props) => {
  return <Typography variant="body2" color="text.secondary" align="center" {...props}>
  {'Copyright © '}
  <Link color="inherit" href="http://127.0.0.1:8000">
    KULA BETS
  </Link>{' '}
  {new Date().getFullYear()}
  {'.'}
</Typography> 
}

export default Copyright