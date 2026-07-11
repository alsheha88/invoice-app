type Props = {
    innerText: string;
    value: number;
}

function PaymentTermDropdownItem({value, innerText}:Props) {
  return (
    <button className="w-full px-6 py-4 text-foreground text-base font-bold cursor-pointer focus-visible:outline-primary hover:text-primary" value={value}>
      {innerText}
    </button>
  )
}

export default PaymentTermDropdownItem
