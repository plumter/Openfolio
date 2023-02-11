const ResponsiveCol = ({className, reverse, children}) => {

    return  <div
                className={`flex sm:flex-row flex-wrap -mx-3 ${reverse && "flex-col-reverse"} ${className}`}
            >
                {
                    children?.map?.((child, i) =>   <div className={`p-3 w-full sm:w-1/2 ${child.props?.colclass}`} key={i}> 
                                                        {child}   
                                                    </div>)
                }
                {!Array.isArray(children) && children}
            </div>
}

export default ResponsiveCol;