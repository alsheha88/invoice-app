import { Status } from "@/schemas/schemas";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const allStatuses = ["draft", "pending", "paid"] as const;

type Props = {
	isOpen: boolean;
	selected: Status[];
	setSelected: Dispatch<SetStateAction<Status[]>>;
};

function InvoiceFilterDropdown({ isOpen, selected, setSelected }: Props) {
	if (!isOpen) return null;

	const toggle = (s: Status) =>
		setSelected((prev) =>
			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
		);

	return (
		<div className="w-full min-w-max flex flex-col gap-4 p-6 rounded-lg shadow-row bg-secondary absolute top-full translate-y-4 right-0 z-50">
			{allStatuses.map((status) => {
				const isChecked = selected.includes(status);

				return (
					<label
						key={status}
						className="flex items-center gap-3.5 cursor-pointer capitalize font-bold">
						<input
							type="checkbox"
							checked={selected.includes(status)}
							onChange={() => toggle(status)}
							className="sr-only peer"
						/>
						<span className="flex items-center justify-center w-4 h-4 rounded-xs border-border bg-card peer-checked:bg-primary peer-checked:[&_svg]:opacity-100">
							{isChecked && <Check
								className="w-3 h-3 font-extrabold text-white"
								strokeWidth={4}
							/>}
						</span>
						{status}
					</label>
				);
			})}
		</div>
	);
}

export default InvoiceFilterDropdown;
