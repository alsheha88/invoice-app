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
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<Input label={"Item Name"} name={`items.${index}.name`} type={"text"} />
			<div className="grid grid-cols-4 gap-4 mx-w-full">
				<Input label={"Qty."} name={`items.${index}.quantity`} type={"number"} />
				<Input label={"Price"} name={`items.${index}.price`} type={"number"} />
				<div className="grid gap-2">
					<span className="text-[0.8125rem] font-medium text-secondary-foreground tracking-[-0.0063rem]">
						Total
					</span>
					<span className="text-tertiary-foreground text-sm">{total}</span>
				</div>
				<button
					type="button"
					className="flex items-center cursor-pointer"
					onClick={onDelete}>
					<Trash className="fill-[#888eaf] stroke-[#888eaf]" />{" "}
				</button>
			</div>
		</div>
	);
}

export default ItemRow;
