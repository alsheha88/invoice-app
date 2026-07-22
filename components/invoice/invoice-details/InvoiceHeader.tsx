import { Address } from "@/schemas/schemas";
import InvoiceAddress from "./InvoiceAddress";

type Props = {
	id: string;
	description: string;
	senderAddress: Address;
};
function InvoiceHeader({ id, description, senderAddress }: Props) {
	return (
		<div className="flex justify-between gap-8 flex-wrap">
			<div className="flex flex-col">
				<h3 className="text-foreground font-bold">
					<span className="text-secondary-foreground">#</span>
					{id}
				</h3>
				<p className="text-secondary-foreground">{description}</p>
			</div>
			<InvoiceAddress address={senderAddress} />
		</div>
	);
}

export default InvoiceHeader;
