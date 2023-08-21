import { useState } from "react"

const BlockController = (props: React.PropsWithChildren) => {
    console.log(props)
    
    
    return (
        <>
           {props.children}
        </>
    )
}

export default BlockController