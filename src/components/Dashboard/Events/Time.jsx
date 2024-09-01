import React from 'react'

const Time = ({time}) => {
    const start = new Date(time.start).toLocaleString()
    const end = new Date(time.end).toLocaleString()
  return (
    <div>{start} - {end}</div>
  )
}

export default Time