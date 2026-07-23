"use client";
import { Trash } from "lucide-react";
import Input from "../ui/Input";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
	index: number;
	onDelete: () => void;
};

function ItemRow({ index, onDelete }: Props) {
	const { control } = useFormContext();
	const quantity = useWatch({ control, name: `items.${index}.quantity` });
	const price = useWatch({ control, name: `items.${index}.price` });
	const total = (quantity || 0) * (price || 0);

	return (
		<div className="grid grid-cols-1 md:grid-cols-[4fr_2fr_3fr_3fr_1fr] gap-4 md:gap-4 md:items-center">
			<Input
				label="Item Name"
				name={`items.${index}.name`}
				type="text"
				hideLabelOnDesktop
			/>

			<div className="grid grid-cols-[1fr_1.5fr_1.5fr_0.5fr] gap-4 items-center md:grid-cols-subgrid md:col-span-4">
				<Input
					label="Qty."
					name={`items.${index}.quantity`}
					type="number"
					hideLabelOnDesktop
				/>
				<Input
					label="Price"
					name={`items.${index}.price`}
					type="number"
					hideLabelOnDesktop
				/>
				<div className="flex flex-col gap-2">
					<span className="text-[0.8125rem] font-medium text-secondary-foreground md:hidden">
						Total
					</span>
					<span className="text-tertiary-foreground font-bold py-3">
						{total}
					</span>
				</div>
				<button
					type="button"
					className="flex items-center justify-center cursor-pointer self-end md:self-center pb-3 md:pb-0"
					onClick={onDelete}>
					<Trash className="fill-[#888eaf] stroke-[#888eaf]" />
				</button>
			</div>
		</div>
	);
}

export default ItemRow;
