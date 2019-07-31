import React,{useRef} from 'react'

export default function GeneralSettings(props) {
    const units = useRef(null)
    const date = useRef(null);
    function UnitChange(){
        console.log(units.current.value);
        props.settings.units=units.current.value;
    }
    function DateFormat(){
        props.settings.dateFormat = date.current.value;
    }
    return (
        <div className="generalSettings">
            Units:
            <select ref={units} value={props.settings.units} onChange={UnitChange}>
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
            </select>
            <br/>
            Dateformat 
            <select ref={date} value={props.settings.dateFormat} onChange={DateFormat}>
                
                <option value="sv">DMY</option>
                <option value="en-US">DMY</option>
            </select>

        </div>
    )
}
