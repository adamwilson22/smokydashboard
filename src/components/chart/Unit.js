import React from "react";

export const Units = () => {

    const data = [
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' },
        { name: 'Punch In at', time: '10.00 AM.' }
    ]

    return (
        <>
            <div className='chart-wrap'>
                <h3 className='main-third'>Today's New Unit </h3>
                <div className="list-item">
                    <ul>
                        {data.map((x, i) =>
                            <li key={i}>{x.name}<p>{x.time}</p></li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}