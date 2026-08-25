import React from 'react'

const Badge = ({children}) => {
  return (
    <span className='text-sm font-semibold px-1 rounded text-white bg-green-500'>{children}</span>
  )
}

export default Badge
