import { Address } from "@/schemas/schemas";

type Props = {
    address: Address
}

function InvoiceAddress({address}:Props) {
  const lines = [address.street, address.city, address.postCode, address.country];

	return (
		<address className="flex flex-col gap-0.5">
            {lines.map((item, i) => (<p key={i} className="text-tertiary-foreground">{item}</p>))}
		</address>
	);
}

export default InvoiceAddress;
