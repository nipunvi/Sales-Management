import { useEffect, useState } from "react"
import AnalysisRevProfChart from "./AnalysisRevProfChart"

const Analysis = (props) => {
 
       const [rev,setRev] = useState()
       const [prof,setProf] =useState()
       const Cf = Intl.NumberFormat('en-US',{
          style:"currency",
          currency:"LKR"
       })
      
    return(<><div className="card mt-3" style={{height:"13vh",marginLeft:"12px",width:"98%", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",textAlign:"center"}}>
       
            <div className="card-body">
                <div className="row" style={{height:"50px"}}>
                    <div className="col-6 " >
                        <button className="btn text-white" style={{width:"100%",height:"100%",backgroundColor:"brown",fontSize:"20px"}}>
                            Revenue : {rev && Cf.format(rev.toFixed(2))}
                        </button>
                    </div>
                    <div className="col-6 ">
                    <button className="btn btn-success text-white" style={{width:"100%",height:"100%",fontSize:"20px"}}>
                            Profit : {prof && Cf.format(prof.toFixed(2))}
                        </button>
                    </div>
                </div>
                
            </div>
    </div>
    <div className="card mt-3" style={{height:"77vh",marginLeft:"12px",width:"98%", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",textAlign:"center"}}>
       
            <div className="card-body">
                <div className="row" style={{height:"100%"}}>
                    <div className="col-12 " >
                      <AnalysisRevProfChart setRev={setRev} setProf={setProf}/>
                    </div>
                </div>  
            </div>
    </div>
    

   
</>)
}
export default Analysis