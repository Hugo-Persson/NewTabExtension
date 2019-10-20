import React from 'react';
import { useParams } from "react-router-dom";
export default function FolderInfo(props) {
    const { index } = useParams();
    const { quickAccessLinks } = props;
    const folder = quickAccessLinks[index];


    return (
        <div className="header">
            <h1>{folder.name}</h1>
        </div>
    )
}
