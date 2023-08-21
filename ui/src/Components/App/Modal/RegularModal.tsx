interface ModalParams {
    Hide: boolean,
    Content: JSX.Element | null,
    Title?: string,
    showX: boolean,
    setShow: Function
}

interface Props {
    props: ModalParams
}

const RegularModal = ({props}: Props) => {
    return (
        <>
            <div id="active-modal" className={`${props.Hide ? 'hidden' : ''} z-50 absolute shadow-md h-[100%] md:h-3/4 w-[100%] md:w-2/3 md:max-w-[500px] top-[50%] left-[50%] max-h-full max-w-full rounded-md p-10 translate -translate-x-1/2 -translate-y-1/2 bg-white`}>
                <div className="w-full">
                    <i onClick={() => {props.setShow({hide: true, content: null})}} className={`fa-solid fa-x ${props.showX ? 'block' : 'hidden'} -mt-5  md:mt- ml-6 p-3 md:ml-0 md:pb-3 float-right rounded-full hover:bg-slate-400`}></i>
                </div>
                <span className="font-bold text-2xl">{props.Title ? props.Title : null}</span>
                {props.Content}
            </div>
        </>
    )
}

export default RegularModal;