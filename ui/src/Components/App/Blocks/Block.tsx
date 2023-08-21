import { useEffect } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

interface Block {
    StartPos: {x: number, y: number},
    Id: string,
    Text: string,
    Description?: string,
    RemoveBlock: (e: string) => void
    action?: {
        code: string,
        actionName: string,
    }
    OpenCodeModal: void
}

interface Props {
    data: Block,
}

const Block = (props: Props) => {
    const arrow = useXarrow();
    

    useEffect(() => {
        arrow()
    }, [])

    return (
        <>
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={props.data.StartPos}
                grid={[1,1]}
                scale={1}
                bounds={"parent"}
                onDrag={arrow}
                onStop={arrow}
                >
                <div id={props.data.Id} className="bg-slate-400 w-24 h-36 border-2 rounded-md p-2 handle hover:cursor-move relative">
                    <div className="border-b-2">{props.data.Text}</div>
                    <div className="text-xs">{props.data.Description}</div>
                    <div className="bottom-0 absolute">
                        {props.data.Id != "0" ? <i onClick={() => {props.data.RemoveBlock(props.data.Id)}} className="fa-solid fa-trash hover:cursor-default pr-2"></i> : null}
                        <i className="fa-solid fa-turn-up pr-2  hover:cursor-default"></i>
                        <i onClick={() => {props.data.OpenCodeModal(props.data.Id)}} className="fa-solid fa-code  pr-2  hover:cursor-default"></i>
                    </div>
                </div>
                
            </Draggable>
        </>
    )
}

export default Block;