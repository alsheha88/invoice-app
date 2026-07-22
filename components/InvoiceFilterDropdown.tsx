import React from 'react'

function InvoiceFilterDropdown() {
  return (
    <div className='flex flex-col gap-4 p-6 shadow-row '>
        <label htmlFor='status' className='flex items-center gap-3.5'>
            <input type="checkbox" name="status" id="status" className='sr-only peer' />
            <span className='w-4 h-4 rounded-xs border-border'></span>
        </label>
      
    </div>
  )
}

export default InvoiceFilterDropdown
