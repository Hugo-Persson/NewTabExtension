import React, { useRef } from 'react'

export default function GeneralSettings(props) {

    function UnitChange(e) {
        console.log(e.currentTarget.value);
        props.settings.units = e.currentTarget.value;
        props.updateApp();
    }
    function DateFormat(e) {
        props.settings.dateFormat = e.currentTarget.value;
    }
    return (
        <div className="generalSettings">

            Units:
            <select defaultValue={props.settings.units} onChange={UnitChange}>
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
            </select>
            <br />
            Dateformat
            <select defaultValue={props.settings.dateFormat} onChange={DateFormat}>
                <option value="automatic">Automatic</option>
                <option value="sv">DMY</option>
                <option value="en-US">MDY</option>

            </select>

        </div>
    )
}
