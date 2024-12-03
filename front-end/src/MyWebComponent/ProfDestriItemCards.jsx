import { useEffect } from "react"

const ProfDestriItemCards = (props) => {
    const {thisValueData,items,revForOthers} = props
    const cf = Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"LKR"
    })
   
return (<>
        
              {thisValueData && <div className="col mt-3">
                <div className="card card-body" style={{textAlign:"left", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)"}}>
                    <p><b>{items && items[Number(thisValueData['itemKey'])-1]['item Name']} - {Number(thisValueData['quantity'])} {items && items[Number(thisValueData['itemKey'])-1]['UOM']}</b></p>
                <div className="progress" style={{height:"15px"}}>
                    {revForOthers && <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width:`${(Number(thisValueData['cost'])/revForOthers*100)}%`,color:"black"}}>{``}</div> }
                    {revForOthers && <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width:`${((Number(thisValueData['revenue']) - Number(thisValueData['cost']))/revForOthers)*100}%`,color:"black"}}>{``}</div> }
                </div>
                <div className="row row-cols-2 mt-2">
                    <div className="col"><button className="btn btn-warning" style={{width:"100%"}}>{cf.format(Number(thisValueData['cost']).toFixed(2))}</button></div>
                    <div className="col"><button className="btn btn-success" style={{width:"100%"}}>{cf.format((Number(thisValueData['revenue']) - Number(thisValueData['cost'])).toFixed(2))}</button></div>
                </div>
                </div>
               </div>}
          
        </>)
}
export default ProfDestriItemCards 