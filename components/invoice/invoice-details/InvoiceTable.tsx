import { Invoice } from "@/schemas/schemas";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableHeaders = [
	{ id: 1, title: "Item Name", style: "text-left" },
	{ id: 2, title: "QTY.", style: "text-right" },
	{ id: 3, title: "Price", style: "text-right" },
	{ id: 4, title: "Total", style: "text-right" },
];

type Props = {
	invoiceData: Invoice;
};

function InvoiceTable({ invoiceData }: Props) {
	return (
		<div className="flex flex-col">
			<div className="p-6 sm:p-8 bg-table rounded-t-lg">
				<table className="w-full invoice-table">
					<thead className="hidden sm:table-header-group">
						<tr className="text-[0.8125rem] text-tertiary-foreground font-medium">
							{tableHeaders.map((item) => (
								<th key={item.id} scope="col" className={item.style}>
									{item.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{invoiceData.items.map((item, i) => (
							<tr key={i}>
								<td className="text-foreground font-bold text-left align-top">
									<span className="block">{item.name}</span>
									<span className="block sm:hidden text-tertiary-foreground font-bold mt-2">
										{item.quantity} x £{item.price}
									</span>
								</td>
								<td className="hidden sm:table-cell text-tertiary-foreground font-bold text-right">
									{item.quantity}
								</td>
								<td className="hidden sm:table-cell text-tertiary-foreground font-bold text-right">
									£{item.price}
								</td>
								<td className="text-foreground font-bold text-right align-top">
									£{item.total}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<InvoiceTableFooter amount={invoiceData.total} />
		</div>
	);
}

export default InvoiceTable;