
const Layout = ({children}) => {
    
    return  <div className="flex justify-center" data-testid="current-page">
                <div className="layout">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
}

export default Layout;