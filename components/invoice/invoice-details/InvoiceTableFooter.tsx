import React from 'react'

type Props = {
    amount: number;
}

function InvoiceTableFooter({amount}:Props) {
  return (
    <div className='w-full flex items-center justify-between py-6 px-8 bg-[hsla(231,28%,7%,1)] rounded-b-lg'>
        <p className='text-[0.8125rem] font-medium text-white'>Amount Due</p>
        <p className='text-2xl font-bold text-white'>£ {amount}</p>
    </div>
  )
}

export default InvoiceTableFooter;
