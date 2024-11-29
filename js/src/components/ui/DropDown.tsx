import * as React from "react";
import { Tooltip } from './Tooltip';

interface DropDownProps {
    selected_key: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (selected_key: string) => void;
}

export function DropDown({ 
    selected_key, 
    options, 
    uiLabel, 
    uiTooltip, 
    onChange 
}: DropDownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLDivElement>(null);


    const handleOptionClick = (option: string) => {

        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {

        setIsOpen(!isOpen);
    };

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
                    onClick={toggleDropdown}
                >
                    <div className="selected-value">{selected_key}</div>
                    <div className="dropdown-arrow"></div>
                </div>
                <div 
                    ref={optionsRef}
                    className="options-container"
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    {options.map(option => {

return (
                            <div
                                key={option}
                                className={`option ${option === selected_key ? 'selected' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick(option);
                                }}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
