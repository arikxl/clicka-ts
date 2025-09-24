import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Title = ({ children }: Props) => {
    return (
        <h2 className='text-center bg-clip-text text-transparent mb-6 text-6xl font-bold bg-gradient-to-r from-purple-500 to-[hotpink]'>
            {children}
        </h2>

    )
}

export default Title