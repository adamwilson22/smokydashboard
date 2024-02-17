import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function CustomLoader() {
    return (
        <div className='loader-con'>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="white"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader-dots"
            />
        </div>
    )
}
