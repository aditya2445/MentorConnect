import React from 'react'
import * as Icons from "react-icons/vsc"
import { Link } from 'react-router-dom'

const DashBarLink = ({item}) => {
    const Icon = Icons[item.icon]
  return (
    <Link className='flex items-center gap-x-1' to={item.linkto}><span><Icon/> </span>{item.name}</Link>
  )
}

export default DashBarLink