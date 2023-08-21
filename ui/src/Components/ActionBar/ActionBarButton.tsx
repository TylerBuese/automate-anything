const ActionBarButton = (props: React.PropsWithChildren) => {
    return (
        <>
            <div className="h-20 w-20 bg-slate-200 justify-center items-center flex rounded-md hover:cursor-pointer hover:bg-slate-300">
                {props.children}
            </div>
        </>
    )
}

export default ActionBarButton