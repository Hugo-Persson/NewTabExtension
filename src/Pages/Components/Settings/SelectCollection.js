import React from 'react'

export default function SelectCollection(props) {
    
    function Toggle(item){
        
        console.log(item);
        item.enabled=!item.enabled;
        console.log(item);
        
    }
    
    return props.collections.map((item)=>(
        <React.Fragment>
            <input type="checkbox" onClick={() => Toggle(item)}/><span>{item.id}</span> <br/>
        </React.Fragment>
        
        
        
    ))
}
