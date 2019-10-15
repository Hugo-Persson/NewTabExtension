import React from 'react'

export default function SelectCollection(props) {

    function toggle(item) {
        item.enabled = !item.enabled;
    }

    return props.collections.map((item) => (
        <div className="select" key={item.id}>

            <input defaultChecked={item.enabled} id={item.id} className="checkBox" type="checkbox" onClick={() => toggle(item)} />
            <label htmlFor={item.id} className="checkLabel"><span > {item.name} </span><div></div></label>

        </div>





    ))
}
