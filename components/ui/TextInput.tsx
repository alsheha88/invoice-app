import React from 'react'

type Props= {
    label: string;
}

function TextInput({label}:Props) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="" className='text-[0.8125rem] font-medium text-secondary-foreground tracking-[-0.0063rem]'>{label}</label>
        <input type="text" name="" id="" className='bg-input px-5 py-3 text-base font-bold tracking-[-0.0156rem] text-foreground border border-border rounded-sm focus:outline-primary' />
    </div>
  )
}

export default TextInput;
