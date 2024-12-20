import * as React from "react";
import { Tooltip } from './Tooltip';

interface DateTimePickerProps {
    value: string;
    minDate: string;
    maxDate: string;
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: string) => void;
}

export function DateTimePicker({ 
    value, 
    minDate,
    maxDate,
    uiLabel, 
    uiTooltip, 
    onChange 
}: DateTimePickerProps) {
    const dateValue = value.split('T')[0];
    const timeValue = value.split('T')[1].slice(0, 5); // HH:mm format

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const newValue = `${newDate}T${timeValue}:00`;
        onChange(newValue);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        const newValue = `${dateValue}T${newTime}:00`;
        onChange(newValue);
    };

    return (
        <div className="datetime-picker-container">
            <div className="datetime-picker-label">
                {uiLabel}
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </div>
            <div className="datetime-picker-inputs">
                <input
                    type="date"
                    value={dateValue}
                    onChange={handleDateChange}
                    min={minDate ? minDate.split('T')[0] : undefined}
                    max={maxDate ? maxDate.split('T')[0] : undefined}
                    className="datetime-picker-input date"
                />
                <input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    className="datetime-picker-input time"
                />
            </div>
        </div>
    );
} 