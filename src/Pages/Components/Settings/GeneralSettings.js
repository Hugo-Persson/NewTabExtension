import React,{useRef} from 'react'

export default function GeneralSettings(props) {

    var metric = true;
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
            <select ref={units}  onChange={UnitChange}>
                <option selected={props.settings.units==="metric"} value="metric">Metric</option>
                <option selected={props.settings.units==="imperial"} value="imperial">Imperial</option>
            </select>
            <br/>
            Dateformat 
            <select ref={date} onChange={DateFormat}>
                
                <option selected={props.settings.dateFormat==="sv"} value="sv">DMY</option>
                <option selected={props.settings.dateFormat==="en-US"} value="en-US">MDY</option>
                <option selected={props.settings.dateFormat==="zh"} value="zh">YMD</option>
            </select>

        </div>
    )
}
