import React from 'react'

export default function SelectCollection(props) {
    
    function Toggle(item){
        
        console.log(item);
        item.enabled=!item.enabled;
        console.log(item);
        
    }
    
    return props.collections.map((item)=>(
        <div className="select">
            <input type="checkbox" onClick={() => Toggle(item)}/><span>{item.name}</span> <br/>
        </div>
            
        
        
        
        
    ))
}
