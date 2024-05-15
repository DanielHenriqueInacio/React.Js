import React from 'react'

const Textarea = ({ label, name, value, onChange }) => {
  return (
    <div className='mt-5'>
      <label htmlFor={name} className='block text-xl font-josefin text-center text-gray-700 mb-1'>{label}</label>
      <textarea name={name} id={name} rows="3" defaultValue={value} onChange={onChange} className='w-80 border border-slate-400 rounded-md py-2 px-2 focus:outline-none focus:bg-gray-100'></textarea>
    </div>
  )
}

export default Textarea
