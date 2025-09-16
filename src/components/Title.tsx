import React, { Children } from 'react'

type Props = {
    children: string
}

const Title = (props: Props) => {
    return (
        <h2 className='text-center bg-clip-text text-transparent mb-6 text-6xl font-bold bg-gradient-to-r from-purple-500 to-[hotpink]'>
            {props.children}
        </h2>

    )
}

export default Title