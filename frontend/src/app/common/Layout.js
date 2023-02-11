
const Layout = ({children}) => {
    
    return  <div className="flex justify-center" data-testid="current-page">
                <div className="layout">
                    <div>
                        {children}
                        <footer className="mt-auto pt-12">
                            <div className="flex justify-center">
                                <p 
                                    className="font-medium pr-2 my-auto"
                                >
                                    Powered By:
                                </p>
                                <a 
                                    href="https://plumter.com" 
                                    target="_blank" 
                                    rel="noreferrer"
                                >
                                    <img src="/assets/media/logos/plumter-logo.png"  className="w-7" alt="P" />
                                </a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
}

export default Layout;