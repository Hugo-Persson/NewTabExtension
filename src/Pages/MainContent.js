/*global chrome*/
import React, {useState, useEffect} from 'react'
import QuickAccess from "./Components/QuickAccess"
export default function MainContent() {
    const [Links, setLinks] = useState([
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        },
        {
            name: "Reddit",
            url:"https://www.reddit.com",
            image: "https://api.faviconkit.com/reddit.com/64"
        }

        
        
    ])
    useEffect(() =>{
        const fetchData = async () =>{
            //Integrate chrome storage api 
            // chrome.storage.sync.get("links", function(data){
            //     console.log(data);
            //     setLinks(data);
            // })
           
        };
        fetchData();
       
    },[])
    return (
        <div className="main">
            <QuickAccess quickAccessLinks={Links}/>
        </div>
    )
}
