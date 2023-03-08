import React from 'react'
import { Typography,Link } from '@mui/material'
import { useTheme } from '@mui/material'

const Copyright = (props) => {
  const theme = useTheme()
  return <Typography variant="body2" color={theme.palette.secondary[200]} align="center" {...props}>
  {'Copyright © '}
  <Link color="inherit" href="#">
    KULA BETS
  </Link>{' '}
  {new Date().getFullYear()}
  {'.'}
</Typography> 
}

export default Copyright