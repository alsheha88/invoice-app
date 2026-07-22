

type Props = {
    label: string;
    content: string;
    children?: React.ReactNode;
    className?: string;
}

function InvoiceInfo({label, content, children, className}:Props) {
  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
        <dt className="text-[0.8125rem] font-medium text-tertiary-foreground">{label}</dt>
        <dd className="text-foreground font-bold">{content}</dd>
        {children}      
    </div>
  )
}

export default InvoiceInfo;
