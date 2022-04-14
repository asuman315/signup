import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App';


const Alert = () => {
 const { alert, setAlert } = useContext(AppContext)
 const {type, show, msg} = alert

 useEffect(() => {
  const alertTimeOut = setTimeout(() => {
     setAlert({ show: false })
  }, 3500)

  return () => clearTimeout(alertTimeOut)
 }, [])

  return (
   <h3 className={`alert alert-${type}`}>{msg}</h3>
  )
}

export default Alert