import React from "react";

export const Lists = () => {

    const data = [
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.'},
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' }
    ]

    return (
        <>
            <ul>
                {data.map((x, i) =>
                    <li key={i}>{x.name}<p>{x.time}</p></li>
                )}
            </ul>
        </>
    )
}