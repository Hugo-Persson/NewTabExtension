import React, { useState } from 'react'

export default function Checkbox(props) {

    const { defaultChecked, onCheck } = props;

    const [checked, setChecked] = useState(defaultChecked)
    if (checked === undefined) {
        setChecked(false);
    }
    return (
        <div className="checkbox" onClick={() => {
            onCheck(!checked);
            setChecked(!checked);
        }}>
            <span>
                {checked ? "✓" : ""}

            </span>
        </div>
    )
}
