import { ChevronDown } from 'lucide-react'
import React from 'react'

function PaymentTermDropdownTrigger() {
  return (
    <button className='min-w-60 flex items-center justify-between px-5 py-3 bg-input border border-border rounded-sm cursor-pointer focus-visible:outline-primary'>
        <span className='font-bold text-foreground'>Net 30 days</span>

        <ChevronDown color='hsl(252, 94%, 67%)' />
    </button>
  )
}

export default PaymentTermDropdownTrigger;
