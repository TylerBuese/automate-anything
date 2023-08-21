import Draggable from "react-draggable";
import StartBlock from "./Blocks/StartBlock";
import { useCallback, useEffect, useRef, useState } from "react";
import BlockController from "./Blocks/BlockController";
import Block from "./Blocks/Block";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import toast, { Toaster } from "react-hot-toast";
import RegularModal from "./Modal/RegularModal";
import ActionBarButton from "../ActionBar/ActionBarButton";

interface ModalContent {
    Title: string,
    hide: boolean,
    content: JSX.Element | null
}

const BuildApp = () => {
    interface Dimensions {
        width: number,
        height: number
    }

    const [modalContent, setModalContent] = useState<ModalContent>({
        hide: true,
        content: null,
        Title: ""
    })

    const [blocks, setBlocks] = useState<JSX.Element[]>([])
    const [arrows, setArrows] = useState<JSX.Element[]>([])
    const [blockToRemove, setBlockToRemove] = useState<string>("")
    function removeBlock(e: string) {
        console.log(e)
        setBlockToRemove(e)
    }

    function rBlock(e: string) {
        let a = [...arrows];
        a.forEach((arrow, i) => {
            if (arrow.props.end == parseInt(e) || arrow.props.start == parseInt(e))
                a[i] = <></>
            i++
        });
        //a = a.filter(x => x.props.end != parseInt(e) && x.props.start != parseInt(e))
        //a[parseInt(e)] = <></>
        setArrows(a);

        let b = [...blocks];
        b[parseInt(e)] = <></>

        setBlocks(b);

        setMessage("Code block removed.");

        console.log(blocks);
    }

    const [dimensions, setDimensions] = useState<Dimensions>({ width: 900, height: 900 })

    // const [arrows, setArrows] = useState([<Xarrow  start={""} end={""}/>, <Xarrow start={""} end={""}/>])
    const [message, setMessage] = useState("");

    const notify = () => toast(message);

    function addBlock(e: any) {
        let b = [...blocks]
        b.push(e[0])
        setBlocks(b)
        setMessage("Code block added.")
    }



    function setModalClosed() {
        setModalContent({ content: null, hide: true, Title: "" })
    }

    function addArrow(e: any) {
        let a = [...arrows]
        a.push(e[0])
        setArrows(a)
    }

    useEffect(() => {
        if (message != "")
            notify()
    }, [message])

    useEffect(() => {
        setModalClosed()
    }, [blocks])

    useEffect(() => {
        console.log(blocks.length)
        if (blocks.length !== 0)
            rBlock(blockToRemove)
    }, [blockToRemove])

    useEffect(() => {
        setBlocks([<Block key={crypto.randomUUID()} data={{ Id: "0", OpenCodeModal: setModalContent({ Title: "New Action", hide: false, content: <NewAction/>}), StartPos: { x: 900, y: 10 }, Text: "Start here", Description: "The start of your automation" }} />])
    }, [])




    return (
        <>
            <RegularModal props={{ Content: modalContent.content, Hide: modalContent.hide, showX: true, Title: modalContent.Title, setShow: setModalContent }} />
            <div className="w-screen h-screen bg-slate-400">
                <div className={`min-w-[${dimensions.width}px] min-h-[${dimensions.height}px] h-[900px] w-full bg-slate-700`}>
                    <BlockController>
                        <Xwrapper>
                            {arrows}
                            {blocks}
                        </Xwrapper>
                    </BlockController>

                </div>
                <div className="p-2 flex gap-3">
                    <ActionBarButton>
                        <div onClick={() => { setModalContent({ hide: false, content: <NewBlock AvailableConnections={blocks} NewBlock={addBlock} NewConnection={addArrow} CloseModal={setModalClosed()} RemoveBlock={removeBlock} />, Title: "New code block" }) }}>
                            New Block
                        </div>
                    </ActionBarButton>
                    <ActionBarButton>
                        <div>
                            Get Data
                        </div>
                    </ActionBarButton>

                </div>
            </div>
            <Toaster position="bottom-right" />

        </>
    )
}

interface NewBlockProps {
    AvailableConnections: JSX.Element[],
    NewBlock: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    NewConnection: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    CloseModal: void
    RemoveBlock: (e: string) => void
}



const NewBlock = (props: NewBlockProps) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [connection, setConnection] = useState<number>()

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        let thisConnection = props.AvailableConnections.length
        props.NewBlock([<Block key={crypto.randomUUID()} data={{ Id: thisConnection.toString(), StartPos: { x: 0, y: 0 }, Text: title, Description: description, RemoveBlock: props.RemoveBlock }} />])
        if (connection != undefined)
            props.NewConnection([<Xarrow end={thisConnection.toString()} start={connection.toString()} />])

    }

    useEffect(() => {

    }, [])
    return (
        <>
            <div>
                <div className="pt-5">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="font-bold text-xl w-full">Title</label>
                            <br></br>
                            <input onInput={(event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value) }} id="title" className="border-2 rounded-md w-full p-2 active:border-slate-800 bg-slate-200 hover:bg-slate-300 focus::bg-slate-300 text-lg" />
                        </div>
                        <div className="pt-5">
                            <label htmlFor="description" className="font-bold text-xl w-full">Description</label>
                            <br></br>
                            <textarea onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value) }} id="description" className="border-2 rounded-md w-full p-2 active:border-slate-800 bg-slate-200 hover:bg-slate-300 focus::bg-slate-300  h-[200px] min-h-[100px] max-h-[200px] text-lg" />
                        </div>
                        <div className="x">
                            <label htmlFor="description" className="font-bold text-xl w-full">Connected to...</label>
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setConnection(parseInt(e.target.value)) }} className="w-full border-2 rounded-md bg-slate-200 p-4 hover:bg-slate-300 focus::bg-slate-300 ">
                                <option className="text-center text-xl">None</option>
                                {props.AvailableConnections.filter(x => x.props.data != undefined).map((x) => <option value={x.props.data.Id} className="text-center text-xl">{x.props.data.Text}</option>)}
                            </select>
                        </div>
                        <div className="w-4/5 bottom-0 absolute pb-5">
                            {/* <button className="border-2 p-2 rounded-md bg-red-300 hover:bg-red-500 w-28">Cancel</button> */}
                            <button type="submit" className="border-2 p-2 rounded-md bg-green-300 w-28 hover:bg-green-500 float-right">Create block</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const NewAction = () => {
    return (
        <>

        </>
    )
}

export default BuildApp;