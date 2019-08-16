import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import DatePicker from 'react-datepicker';

const DatetimeField = ({
    className,
    popperProps = {
        positionFixed: true
    },
    showYearDropdown = true,
    showMonthDropdown = true,
    dropdownMode = 'select',
    useShortMonthInDropdown = false,
    ...rest
}) => {
    return (
        <div className={ className }>
            <DatePicker
                className={ className }
                showYearDropdown={ showYearDropdown }
                showMonthDropdown={ showMonthDropdown }
                dropdownMode={ dropdownMode }
                popperProps={ popperProps }
                useShortMonthInDropdown={ useShortMonthInDropdown }
                { ...rest }
            />
        </div>
    );
};

const backgroundColor = '#f0f0f0';
const borderColor = '#aeaeae';
const highlightedColor = '#3dcc4a';
const darkHighlightedColor = '#31bc3e';
const mutedColor = '#ccc';
const selectedColor = '#216ba5';
const darkSelectedColor = '#1f659c';
const textColor = '#000';
const headerColor = '#000';
const navigationDisabledColor = '#ccc';

const borderRadius = '0.3rem';
const dayMargin = '0.166rem';
const fontSize = '0.8rem';
const itemSize = '1.7rem';
const margin = '0.4rem';
const navigationSize = '0.45rem';
const triangleSize = '8px';

const triangleArrow = () => (`
    margin-left: -${triangleSize};
    position: absolute;

    &,
    &::before {
        box-sizing: content-box;
        position: absolute;
        border: ${triangleSize} solid transparent;

        height: 0;
        width: 1px;
    }

    &::before {
        content: "";
        z-index: -1;
        border-width: ${triangleSize};

        left: -${triangleSize};
        border-bottom-color: ${borderColor};
    }
`);

const triangleArrowUp = () => (`
    ${triangleArrow()}

    top: 0;
    margin-top: -${triangleSize};

    &,
    &::before {
        border-top: none;
        border-bottom-color: ${backgroundColor};
    }

    &::before {
        top: -1px;
        border-bottom-color: ${borderColor};
    }
`);

const triangleArrowDown = () => (`
    ${triangleArrow()}

    bottom: -8px;
    margin-top: -${triangleSize};

    &,
    &::before {
        border-bottom: none;
        border-top-color: #fff;
    }

    &::before {
        bottom: -1px;
        border-top-color: ${borderColor};
    }
`);


const StyledDatetimeField = styled(DatetimeField)`
    & > .react-datepicker-wrapper {
        display: inline-block;
    }

    .react-datepicker {
        font-size: ${fontSize};
        background-color: #fff;
        color: ${textColor};
        border: 1px solid ${borderColor};
        border-radius: ${borderRadius};
        display: inline-block;
        position: relative;
    }

    .react-datepicker--time-only {
        .react-datepicker__triangle {
            left: 35px;
        }

        .react-datepicker__time-container {
            border-left: 0;
        }

        .react-datepicker__time {
            border-radius: 0.3rem;
        }

        .react-datepicker__time-box {
            border-radius: 0.3rem;
        }
    }

    .react-datepicker__triangle {
        position: absolute;
        left: 50px;
    }

    & > .react-datepicker-popper {
        z-index: 1;

        &[data-placement^="bottom"] {
            margin-top:  10px;

            .react-datepicker__triangle {
                ${triangleArrowUp()}
            }
        }

        &[data-placement^="top"] {
            margin-bottom: 10px;

            .react-datepicker__triangle {
                ${triangleArrowDown()}
            }
        }

        &[data-placement^="right"] {
            margin-left: 10px;

            .react-datepicker__triangle {
                left: auto;
                right: 42px;
            }
        }

        &[data-placement^="left"] {
            margin-right: 10px;

            .react-datepicker__triangle {
                left: 42px;
                right: auto;
            }
        }
    }

    .react-datepicker__header {
        text-align: center;
        background-color: ${backgroundColor};
        border-bottom: 1px solid ${borderColor};
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
        padding-top: 8px;
        position: relative;

        &--time {
            padding-bottom: 8px;
            padding-left: 5px;
            padding-right: 5px;
        }
    }

    .react-datepicker__year-dropdown-container--select,
    .react-datepicker__month-dropdown-container--select,
    .react-datepicker__month-year-dropdown-container--select,
    .react-datepicker__year-dropdown-container--scroll,
    .react-datepicker__month-dropdown-container--scroll,
    .react-datepicker__month-year-dropdown-container--scroll {
        display: inline-block;
        margin: 0 2px;
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
        margin-top: 0;
        color: ${headerColor};
        font-weight: bold;
        font-size: calc(${fontSize} * 1.18);
    }

    .react-datepicker-time__header {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .react-datepicker__navigation {
        background: none;
        line-height: ${itemSize};
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 10px;
        width: 0;
        padding: 0;
        border: ${navigationSize} solid transparent;
        z-index: 1;
        height: 10px;
        width: 10px;
        text-indent: -999em;
        overflow: hidden;

        &--previous {
            left: 10px;
            border-right-color: ${mutedColor};

            &:hover {
                border-right-color: ${headerColor};
            }

            &--disabled,
            &--disabled:hover {
                border-right-color: ${navigationDisabledColor};
                cursor: default;
            }
        }

        &--next {
            right: 10px;
            border-left-color: ${mutedColor};
            &--with-time:not(&--with-today-button) {
              right: 80px;
            }

            &:hover {
                border-left-color: ${headerColor};
            }

            &--disabled,
            &--disabled:hover {
                border-left-color: ${navigationDisabledColor};
                cursor: default;
            }
        }

        &--years {
            position: relative;
            top: 0;
            display: block;
            margin-left: auto;
            margin-right: auto;

            &-previous {
                top: 4px;
                border-top-color: ${mutedColor};

                &:hover {
                    border-top-color: ${headerColor};
                }
            }

            &-upcoming {
                top: -4px;
                border-bottom-color: ${mutedColor};

                &:hover {
                    border-bottom-color: ${headerColor};
                }
            }
        }
    }

    .react-datepicker__month-container {
        float: left;
    }

    .react-datepicker__month {
        margin: ${margin};
        text-align: center;
        .react-datepicker__month-text {
            display: inline-block;
            width: 4rem;
            margin: 2px;
        }
    }

    .react-datepicker__input-time-container {
        clear: both;
        width: 100%;
        float: left;
        margin: 5px 0 10px 15px;
        text-align: left;

        .react-datepicker-time__caption {
            display: inline-block;
        }

        .react-datepicker-time__input-container {
            display: inline-block;
            .react-datepicker-time__input {
                display: inline-block;
                margin-left: 10px;

                input {
                    width: 85px;
                }

                input[type="time"]::-webkit-inner-spin-button,
                input[type="time"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input[type="time"] {
                    -moz-appearance: textfield;
                }
            }
            .react-datepicker-time__delimiter {
                margin-left: 5px;
                display: inline-block;
            }
        }
    }

    .react-datepicker__time-container {
        float: right;
        border-left: 1px solid ${borderColor};
        width: 70px;

        &--with-today-button {
            display: inline;
            border: 1px solid #aeaeae;
            border-radius: 0.3rem;
            position: absolute;
            right: -72px;
            top: 0;
        }

        .react-datepicker__time {
            position: relative;
            background: white;

            .react-datepicker__time-box {
                width: 70px;
                overflow-x: hidden;
                margin: 0 auto;
                text-align: center;

                ul.react-datepicker__time-list {
                    list-style: none;
                    margin: 0;
                    height: calc(195px + (#{${itemSize}} / 2));
                    overflow-y: scroll;
                    padding-right: 0px;
                    padding-left: 0px;
                    width: 100%;
                    box-sizing: content-box;

                    li.react-datepicker__time-list-item {
                        height: 30px;
                        padding: 5px 10px;
                        &:hover {
                            cursor: pointer;
                            background-color: ${backgroundColor};
                        }
                        &--selected {
                            background-color: ${selectedColor};
                            color: white;
                            font-weight: bold;
                            &:hover {
                                background-color: ${selectedColor};
                            }
                        }
                        &--disabled {
                            color: ${mutedColor};

                            &:hover {
                                cursor: default;
                                background-color: transparent;
                            }
                        }
                    }
                }
            }
        }
    }


    .react-datepicker__week-number {
        color: ${mutedColor};
        display: inline-block;
        width: ${itemSize};
        line-height: ${itemSize};
        text-align: center;
        margin: ${margin};
        &.react-datepicker__week-number--clickable {
            cursor: pointer;
            &:hover {
                border-radius: ${borderRadius};
                background-color: ${backgroundColor};
            }
        }
    }

    .react-datepicker__day-names,
    .react-datepicker__week {
        white-space: nowrap;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
        color: ${textColor};
        display: inline-block;
        width: ${itemSize};
        line-height: ${itemSize};
        text-align: center;
        margin: ${dayMargin};
    }


    .react-datepicker__month {
        &--selected,
        &--in-selecting-range,
        &--in-range {
            border-radius: ${borderRadius};
            background-color: ${selectedColor};
            color: #fff;

            &:hover {
                background-color: ${darkSelectedColor};
            }
        }
        &--disabled {
            color: ${mutedColor};
            pointer-events: none;
                &:hover {
                    cursor: default;
                    background-color: transparent;
                }
            }
        }
    }

    .react-datepicker__day,
    .react-datepicker__month-text {
        cursor: pointer;

        &:hover {
            border-radius: ${borderRadius};
            background-color: ${backgroundColor};
        }

        &--today {
            font-weight: bold;
        }

        &--highlighted {
            border-radius: ${borderRadius};
            background-color: ${highlightedColor};
            color: #fff;

            &:hover {
                background-color: ${darkHighlightedColor};
            }

            &-custom-1 {
                color: magenta;
            }

            &-custom-2 {
                color: green;
            }
        }

        &--selected,
        &--in-selecting-range,
        &--in-range {
            border-radius: ${borderRadius};
            background-color: ${selectedColor};
            color: #fff;

            &:hover {
                background-color: ${darkSelectedColor};
            }
        }

        &--keyboard-selected {
            border-radius: ${borderRadius};
            background-color: #267bbf;
            color: #fff;

            &:hover {
                background-color: ${darkSelectedColor};
            }
        }

        &--in-selecting-range:not(&--in-range) {
            background-color: rgba(${selectedColor}, 0.5);
        }

        &--in-range:not(&--in-selecting-range) {
            .react-datepicker__month--selecting-range & {
                background-color: ${backgroundColor};
                color: ${textColor};
            }
        }

        &--disabled {
            cursor: default;
            color: ${mutedColor};

            &:hover {
                background-color: transparent;
            }
        }
    }

    .react-datepicker__month-text {
        &.react-datepicker__month--selected,
        &.react-datepicker__month--in-range {
            &:hover {
            background-color: ${selectedColor};
            }
        }
        &:hover {
            background-color: ${backgroundColor};
        }
    }

    .react-datepicker__input-container {
        position: relative;
        display: inline-block;
    }

    .react-datepicker__year-read-view,
    .react-datepicker__month-read-view,
    .react-datepicker__month-year-read-view {
        border: 1px solid transparent;
        border-radius: ${borderRadius};
        vertical-align: baseline;

        &:hover {
            cursor: pointer;

            .react-datepicker__year-read-view--down-arrow,
            .react-datepicker__month-read-view--down-arrow {
                border-top-color: ${headerColor};
            }
        }

        &--down-arrow {
            ${triangleArrowDown()}
            border-top-color: ${mutedColor};
            float: right;
            margin-left: 20px;
            top: 8px;
            position: relative;
            border-width: ${navigationSize};
        }
    }

    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown,
    .react-datepicker__month-year-dropdown {
        background-color: ${backgroundColor};
        position: absolute;
        width: 50%;
        left: 25%;
        top: 30px;
        z-index: 1;
        text-align: center;
        border-radius: ${borderRadius};
        border: 1px solid ${borderColor};

        &:hover {
            cursor: pointer;
        }

        &--scrollable {
            height: 150px;
            overflow-y: scroll;
        }
    }

    .react-datepicker__year-option,
    .react-datepicker__month-option,
    .react-datepicker__month-year-option {
        line-height: 20px;
        width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;

        &:first-of-type {
            border-top-left-radius: ${borderRadius};
            border-top-right-radius: ${borderRadius};
        }

        &:last-of-type {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border-bottom-left-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
        }

        &:hover {
            background-color: ${mutedColor};

            .react-datepicker__navigation--years-upcoming {
                border-bottom-color: ${headerColor};
            }

            .react-datepicker__navigation--years-previous {
                border-top-color: ${headerColor};
            }
        }

        &--selected {
            position: absolute;
            left: 15px;
        }
    }

    .react-datepicker__close-icon {
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: 0;
        padding: 0;
        position: absolute;
        top: 50%;
        right: 7px;
        height: 16px;
        width: 16px;
        margin: -8px auto 0;

        &::after {
            cursor: pointer;
            background-color: ${selectedColor};
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            height: 16px;
            width: 16px;
            padding: 2px;
            font-size: 12px;
            line-height: 1;
            text-align: center;
            content: "\00d7";
        }
    }

    .react-datepicker__today-button {
        background: ${backgroundColor};
        border-top: 1px solid ${borderColor};
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        padding: 5px 0;
        clear: left;
    }

    .react-datepicker__portal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 2147483647;

        .react-datepicker__day-name,
        .react-datepicker__day,
        .react-datepicker__time-name {
            width: 3rem;
            line-height: 3rem;
        }

        // Resize for small screens
        @media (max-width: 400px), (max-height: 550px) {
            .react-datepicker__day-name,
            .react-datepicker__day,
            .react-datepicker__time-name {
                width: 2rem;
                line-height: 2rem;
            }
        }

        .react-datepicker__current-month,
        .react-datepicker-time__header {
            font-size: calc(${fontSize} * 1.8);
        }

        .react-datepicker__navigation {
            border: calc(1.8 * ${navigationSize}) solid transparent;
        }

        .react-datepicker__navigation--previous {
            border-right-color: ${mutedColor};

            &:hover {
                border-right-color: ${headerColor};
            }

            &--disabled,
            &--disabled:hover {
                border-right-color: ${navigationDisabledColor};
                cursor: default;
            }
        }

        .react-datepicker__navigation--next {
            border-left-color: ${mutedColor};

            &:hover {
                border-left-color: ${headerColor};
            }

            &--disabled,
            &--disabled:hover {
                border-left-color: ${navigationDisabledColor};
                cursor: default;
            }
        }
    }

`;

const ExtendedStyledDatetimeField = styled(StyledDatetimeField)(getExtendedStyles());
export default ExtendedStyledDatetimeField;
