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
    if (!onChange) return;

    try {
      if (mode === "single") {
        // Handle single date selection
        const newDate = dayjs(value).isValid()
          ? dayjs(value).toDate()
          : new Date();
        onChange(newDate);
      } else {
        // Handle range selection
        const newStartDate = value.startDate
          ? dayjs(value.startDate).toDate()
          : null;
        const newEndDate = value.endDate ? dayjs(value.endDate).toDate() : null;
        onChange({ startDate: newStartDate, endDate: newEndDate });
      }
    } catch (error) {
      console.warn("Error processing date change:", error);
      // Fallback to current date if there's an error
      onChange(
        mode === "single" ? new Date() : { startDate: null, endDate: null }
      );
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
