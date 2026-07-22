import Image from "next/image";
import calender from "@/public/assets/icon-calendar.svg";
import { monthNames } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
type Props = {
	selectedDate: Date | null;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};
function DatePickerTrigger({ selectedDate, setIsOpen, isOpen }: Props) {
	if (selectedDate === null) return null;
	return (
		<button
			type="button"
			onClick={() => setIsOpen(!isOpen)}
			className="min-w-60 flex items-center justify-between px-5 py-3 bg-input border border-border rounded-sm cursor-pointer focus-visible:outline-primary">
			<span className="font-bold text-foreground">
				{selectedDate
					? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
					: "Select a date"}
			</span>
			<Image src={calender} alt="calendar" />
		</button>
	);
}

export default DatePickerTrigger;
