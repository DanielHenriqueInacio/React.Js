import React from 'react'

const Input = ({ label, type, name }) => {
  return (
    <div>
      <label htmlFor={name} className='block text-xl text-center font-josefin text-gray-700 mb-1'>{label}</label>
      <input id={name} name={name} type={type} className='w-80 border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:bg-gray-100'/>
    </div>
  )
}

export default Input
