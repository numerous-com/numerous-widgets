import * as React from "react";
import { Tooltip } from './Tooltip';

interface DropDownProps {
    value: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: string) => void;
}

export function DropDown({ 
    value, 
    options, 
    uiLabel, 
    uiTooltip, 
    onChange 
}: DropDownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLDivElement>(null);

    const positionDropdown = React.useCallback(() => {
        if (!dropdownRef.current || !optionsRef.current) return;

        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = optionsRef.current.offsetHeight;

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            optionsRef.current.style.bottom = '100%';
            optionsRef.current.style.top = 'auto';
        } else {
            optionsRef.current.style.top = '100%';
            optionsRef.current.style.bottom = 'auto';
        }
    }, []);

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Position dropdown when opened
    React.useEffect(() => {
        if (isOpen) {
            positionDropdown();
        }
    }, [isOpen, positionDropdown]);

    return (
        <div className="dropdown-container">
            <label className="dropdown-label">
                <span>{uiLabel}</span>
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </label>
            <div className="select-wrapper">
                <div 
                    ref={dropdownRef}
                    className="custom-select" 
                    tabIndex={0}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="selected-value">{value}</div>
                    <div className="dropdown-arrow"></div>
                </div>
                <div 
                    ref={optionsRef}
                    className="options-container"
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    {options.map(option => (
                        <div
                            key={option}
                            className={`option ${option === value ? 'selected' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOptionClick(option);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
