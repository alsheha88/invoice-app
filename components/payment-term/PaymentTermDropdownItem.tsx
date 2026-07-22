type Props = {
	innerText: string;
	onClick: () => void;
};

function PaymentTermDropdownItem({ innerText, onClick }: Props) {
	return (
		<button type="button" onClick={onClick} className="w-full px-6 py-4 text-foreground text-base font-bold cursor-pointer focus-visible:outline-primary hover:text-primary">
			{innerText}
		</button>
	);
}

export default PaymentTermDropdownItem;