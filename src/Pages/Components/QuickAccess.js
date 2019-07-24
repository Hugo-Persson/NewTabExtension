
import React from 'react'


export default function QuickAccess(props) {
    
    
    return props.quickAccessLinks.map((link) => (
        <a href={link.url}>
            <img src={link.image} alt="Image failed to load"/>
            <span>{link.name}</span>
        </a>

    ));
        
    
    
}
