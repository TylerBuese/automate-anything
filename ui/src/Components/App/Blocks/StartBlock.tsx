import Draggable, { DraggableBounds } from "react-draggable";

const StartBlock = () => { 

    
    return (
        <>
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                grid={[1,1]}
                scale={1}
                bounds={"parent"}
                
                >
                <div className="bg-slate-400 w-24 h-36 border-2 rounded-md p-2 handle">
                    <div className="">Start here</div>
                </div>
                
            </Draggable>
        </>
    )
}

export default StartBlock;