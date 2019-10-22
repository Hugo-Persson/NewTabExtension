import React from 'react'
import { useParams, Link } from "react-router-dom";
import QuickAccessGrid from '../../Components/QuickAccessGrid';
import AddOptions from '../../Components/AddOptions';


export default function InsideFolder(props) {
    const { index } = useParams()
    const { quickAccessLinks } = props;
    const folder = quickAccessLinks[index];
    console.log(props);
    return (
        <div className="main">
            <Link to="/" className="goBack">←</Link>
            <QuickAccessGrid linkArray={folder.items} />
            <AddOptions inFolder={true} />
        </div>

    )
}
