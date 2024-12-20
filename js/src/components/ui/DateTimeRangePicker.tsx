import * as React from "react";
import { Tooltip } from './Tooltip';

interface DateTimeRangePickerProps {
    startValue: string;
    endValue: string;
    minDate: string;
    maxDate: string;
    uiLabel: string;
    uiTooltip: string;
    onChange: (start: string, end: string) => void;
}

export function DateTimeRangePicker({ 
    startValue, 
    endValue,
    minDate,
    maxDate,
    uiLabel, 
    uiTooltip, 
    onChange 
}: DateTimeRangePickerProps) {
    const startDate = startValue.split('T')[0];
    const startTime = startValue.split('T')[1].slice(0, 5); // HH:mm format
    const endDate = endValue.split('T')[0];
    const endTime = endValue.split('T')[1].slice(0, 5); // HH:mm format

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const newValue = `${newDate}T${startTime}:00`;
        onChange(newValue, endValue);
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        const newValue = `${startDate}T${newTime}:00`;
        onChange(newValue, endValue);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const newValue = `${newDate}T${endTime}:00`;
        onChange(startValue, newValue);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        const newValue = `${endDate}T${newTime}:00`;
        onChange(startValue, newValue);
    };

    return (
        <div className="datetime-range-picker-container">
            <div className="datetime-range-picker-label">
                {uiLabel}
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </div>
            <div className="datetime-range-picker-inputs">
                <div className="datetime-range-picker-group">
                    <span className="datetime-range-picker-sublabel">Start</span>
                    <div className="datetime-picker-inputs">
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            min={minDate ? minDate.split('T')[0] : undefined}
                            max={maxDate ? maxDate.split('T')[0] : undefined}
                            className="datetime-picker-input date"
                        />
                        <input
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            className="datetime-picker-input time"
                        />
                    </div>
                </div>
                <div className="datetime-range-picker-group">
                    <span className="datetime-range-picker-sublabel">End</span>
                    <div className="datetime-picker-inputs">
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            min={startDate}
                            max={maxDate ? maxDate.split('T')[0] : undefined}
                            className="datetime-picker-input date"
                        />
                        <input
                            type="time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            className="datetime-picker-input time"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 