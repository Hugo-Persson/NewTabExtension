import React from 'react'

export default function GeneralSettings() {
    return (
        <div className="generalSettings">
            Units:
            <select>
                <option value="Metric">Metric</option>
                <option value="Imperial">Imperial</option>
            </select>
        </div>
    )
}
