import React from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { COLOURS } from "@/constant/color";
import { DateSelectorProps } from "@/utils/type";

export const DateSelector = ({
  mode = "single",
  date,
  startDate,
  endDate,
  onChange,
}: DateSelectorProps) => {
  // Ensure we have valid dates
  const validDate = date ? dayjs(date).toDate() : new Date();
  const validStartDate = startDate ? dayjs(startDate).toDate() : null;
  const validEndDate = endDate ? dayjs(endDate).toDate() : null;

  // Ensure the onChange handler safely processes dates
  const handleDateChange = (value: any) => {
    console.log("Selected date:", value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <DateTimePicker
      mode={mode}
      date={validDate}
      startDate={validStartDate}
      endDate={validEndDate}
      onChange={handleDateChange}
      selectedItemColor={COLOURS.primary}
      calendarTextStyle={{ fontSize: 16 }}
      // Add min/max dates to prevent potential array length issues
      minDate={dayjs().subtract(10, "year").toDate()}
      maxDate={dayjs().add(10, "year").toDate()}
    />
  );
};
