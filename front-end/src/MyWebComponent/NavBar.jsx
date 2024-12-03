import WebPannel from "./WebPannel"

const NavBar = () => {
    
 return(<>
        <nav className="navbar navbar-expand-sm " style={{backgroundColor:"black"}}>
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="javascript:void(0)">AB</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <div className="me-auto"></div>
                    <form className="d-flex">
                        <input className="form-control-sm me-2" type="text" placeholder="Searchs" style={{border:"0px"}}/>
                        <button className="btn btn-sm btn-primary" type="button">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        
        </>)
}

export default NavBar