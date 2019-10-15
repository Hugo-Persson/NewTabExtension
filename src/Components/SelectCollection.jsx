import React from 'react'
import Checkbox from './Checkbox';

export default function SelectCollection(props) {

    function toggle(item) {
        item.enabled = !item.enabled;
    }
    {/* <input defaultChecked={item.enabled} id={item.id} className="checkBox" type="checkbox" onClick={() => toggle(item)} />
            <label htmlFor={item.id} className="checkLabel"></label> */}
    return props.collections.map((item) => (
        <div className="select" key={item.id}>

            <Checkbox defaultChecked={item.enabled} onCheck={(enabled) => item.enabled = enabled} /> <span > {item.name} </span>

        </div>





    ))
}
