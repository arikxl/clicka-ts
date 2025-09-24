import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Title = ({ children }: Props) => {
    return (
        <h2 className='text-center bg-clip-text text-transparent mb-4 text-5xl md:tex-6xl font-bold leading-snug bg-gradient-to-r from-purple-500 to-[hotpink]'>
            {children}
        </h2>

    )
}

export default Title