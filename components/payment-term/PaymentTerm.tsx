"use client";
import { useState } from "react";
import PaymentTermDropdownTrigger from "./PaymentTermDropdownTrigger";
import PaymentTermDropdown from "./PaymentTermDropdown";

type Props = {
	value: number;
	onChange: (v: number) => void;
};

function PaymentTerm({value, onChange}:Props) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="relative max-w-max">
			<PaymentTermDropdownTrigger isOpen={isOpen} setIsOpen={setIsOpen} selectedValue={value} />
			<PaymentTermDropdown isOpen={isOpen} setIsOpen={setIsOpen}  onSelect={(v:number) => { onChange(v); setIsOpen(false); }} />
		</div>
	);
}

export default PaymentTerm;
