
import React from 'react'


export default function QuickAccess(props) {
    
    
    return props.quickAccessLinks.map((link) => (
        <a className="quickAccessItem" href={link.url}>
            <ul>
                <li><img src={link.image} alt="Image failed to load"/></li>
                <li><span>{link.name}</span></li>
            </ul>
            
            
            
        </a>

    ));
        
    
    
}
