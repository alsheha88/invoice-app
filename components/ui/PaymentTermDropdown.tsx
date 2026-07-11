import DropdownItem from "./PaymentTermDropdownItem";

const dropdownItem = [
	{ title: "Net 1 Day", value: 1 },
	{ title: "Net 7 Day", value: 7 },
	{ title: "Net 14 Day", value: 14 },
	{ title: "Net 30 Day", value: 30 },
];

function PaymentTermDropdown() {
	return (
		<div className="w-full grid py-2 absolute right-0 shadow-[0px_10px_20px_hsla(231,38%,45%,0.25)] bg-dropdown rounded-lg">
			{dropdownItem.map((item) => (
				<div key={item.value} className="not-last-of-type:border-b not-last-of-type:border-b-dropdown-border">
					<DropdownItem innerText={item.title} value={item.value} />
				</div>
			))}
		</div>
	);
}

export default PaymentTermDropdown;
