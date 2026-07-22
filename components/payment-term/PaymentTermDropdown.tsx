"use client";
import { Dispatch, SetStateAction } from "react";
import DropdownItem from "./PaymentTermDropdownItem";
import { paymentTerms } from "@/lib/constants";

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onSelect: (value: number) => void;
};

function PaymentTermDropdown({ isOpen, setIsOpen, onSelect }: Props) {
	if (!isOpen) return null;
	return (
		<div className="w-full grid absolute right-0 shadow-row bg-dropdown rounded-lg z-50">
			{paymentTerms.map((item) => (
				<div
					key={item.value}
					className="not-last-of-type:border-b not-last-of-type:border-b-dropdown-border">
					<DropdownItem
						innerText={item.title}
						onClick={() => {
							onSelect(item.value);
							setIsOpen(false);
						}}
					/>
				</div>
			))}
		</div>
	);
}

export default PaymentTermDropdown;
