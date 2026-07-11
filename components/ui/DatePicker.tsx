"use client";
import { monthNames } from "@/lib/datePickerConfig";
import { useState, useRef } from "react";
import DatePickerDropdown from "./DatePickerDropdown";
import DatePickerTrigger from "./DatePickerTrigger";

function DatePicker() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [viewDate, setViewDate] = useState(new Date());

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

	const handleSelectDay = (day: number) => {
		const chosen = new Date(currentYear, currentMonth, day);
		setSelectedDate(chosen);
		setIsOpen(false);
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
		<div className="relative">
      <DatePickerTrigger selectedDate={selectedDate} isOpen={isOpen} setIsOpen={setIsOpen} />
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
