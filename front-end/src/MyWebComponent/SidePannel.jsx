import { useEffect, useState } from "react"
import SideNavButtons from "./SideNavButtons"
import image from '../assets/pp.png'

const SidePannel = (props) => {
    const [selectedId,setSelectedID] = useState(0)

    const sideNavButtons = ['Home','Stores','Profit Destribution','Bar Chart']
    const icons = []

    useEffect(()=>{
        props.setSidePanelIndex(selectedId)
    },[selectedId])
 return (<>
          
          <div 
          className="card" 
          style={{margin:"0",borderRadius:"0",height:"97vh",padding:"7px",backgroundColor:"grey",boxShadow:"none"}}>
            <div className="BrandIcon"><img src={image} alt="" className="myImg" /></div>
            
             {sideNavButtons.map((val,i)=>{
                return(selectedId == i ? 
             <SideNavButtons 
             id={i} 
             color="btn btn-primary text-white mt-2" 
             setSelectedID={setSelectedID}>
                {val}
             </SideNavButtons> : 
            <SideNavButtons 
             id={i} 
             color="btn btn-outline-primary text-white mt-2" 
             setSelectedID={setSelectedID}>
                {val}
             </SideNavButtons>)})}
             </div>
         
          </>)


}
export default SidePannel