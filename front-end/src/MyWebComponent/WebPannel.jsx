import { useState } from "react"
import MainPannel from "./MainPannel"
import SidePannel from "./SidePannel"

const WebPannel = () => {
    const [sidePanelindex,setSidePanelIndex] = useState(0)
 return (<div className="whole">
             <div className="row">
             <div className="col-lg-2 col-3">
                <SidePannel setSidePanelIndex={setSidePanelIndex}/>
                </div>   
             <div className="col-lg-10 col-9">
                <MainPannel sidePanelindex={sidePanelindex}/>
                </div>  
         </div>
         </div>)
}

export default WebPannel