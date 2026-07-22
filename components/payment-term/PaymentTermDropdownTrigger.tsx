"use client";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { paymentTerms } from "@/lib/constants";

type Props = {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	selectedValue: number;
};

function PaymentTermDropdownTrigger({ isOpen, setIsOpen, selectedValue }: Props) {
	const label = paymentTerms.find((i) => i.value === selectedValue)?.title ?? "Select";
	return (
		<button type="button" onClick={() => setIsOpen(!isOpen)} className="min-w-60 flex items-center justify-between px-5 py-3 bg-input border border-border rounded-sm cursor-pointer focus-visible:outline-primary">
			<span className="font-bold text-foreground">{label}</span>
			<ChevronDown className="text-primary" />
		</button>
	);
}

export default PaymentTermDropdownTrigger;