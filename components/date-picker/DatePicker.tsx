"use client";
import { monthNames } from "@/lib/constants";
import { useState, useRef } from "react";
import DatePickerDropdown from "./DatePickerDropdown";
import DatePickerTrigger from "./DatePickerTrigger";
type Props = {
	value: string; 
	onChange: (value: string) => void;
};
function DatePicker({ value, onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [viewDate, setViewDate] = useState(new Date());
	const selectedDate = value ? new Date(value) : null; 

	const handleSelectDay = (day: number) => {
		const chosen = new Date(currentYear, currentMonth, day);
		onChange(chosen.toISOString().split("T")[0]); 
		setIsOpen(false);
	};
	const currentYear = viewDate.getFullYear();
	const currentMonth = viewDate.getMonth();
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

	const handlePrevMonth = () => {
		setViewDate(new Date(currentYear, currentMonth - 1, 1));
	};
	const handleNextMonth = () => {
		setViewDate(new Date(currentYear, currentMonth + 1, 1));
	};

	
	const isSelected = (day: number) => {
		if (!selectedDate) return false;
		return (
			selectedDate.getDate() === day &&
			selectedDate.getMonth() === currentMonth &&
			selectedDate.getFullYear() === currentYear
		);
	};

	const blanks = Array(firstDayIndex).fill(null);
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	return (
		<div className="relative w-max">
			<DatePickerTrigger
				selectedDate={selectedDate}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<DatePickerDropdown
				currentMonth={monthNames[currentMonth]}
				currentYear={currentYear}
				blanks={blanks}
				days={days}
				handleNextMonth={handleNextMonth}
				handlePrevMonth={handlePrevMonth}
				handleSelectDay={handleSelectDay}
				isSelected={isSelected}
				isOpen={isOpen}
			/>
		</div>
	);
}

export default DatePicker;
