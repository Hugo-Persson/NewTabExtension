import React from 'react'

export default function SelectCollection(props) {
    
    function Toggle(item){
        
        console.log(item);
        item.enabled=!item.enabled;
        console.log(item);
        
    }
    
    return props.collections.map((item)=>(
        <div className="select">
            
            <input defaultChecked={item.enabled} id="checkbox" className="checkBox" type="checkbox" onClick={() => Toggle(item)}/>
            <label htmlFor="checkbox" className="checkLabel"><span > {item.name} </span><div></div></label>

        </div>
            
        
        
        
        
    ))
}
