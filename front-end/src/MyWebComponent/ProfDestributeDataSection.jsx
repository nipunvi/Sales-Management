import { useEffect, useState } from "react"

const ProfDestributeDataSection = (props) => {

    const {dataToPresent,setRevForOthers} = props
    const [cost,setCost] = useState(0)
    const [profit,setProfit] = useState(0)
    const [revenue,setRevenue] = useState(0)
    const cf = Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"LKR"
    })

    useEffect(()=>{
        if(dataToPresent){
            let theCostOfTheMonth = 0
            let theRevenueofTheMonth = 0
            dataToPresent.forEach((value,_)=>{
                theCostOfTheMonth += Number(value['cost'])
                theRevenueofTheMonth += Number(value['revenue'])
            })
            setCost(theCostOfTheMonth)
            setRevenue(theRevenueofTheMonth)
            setRevForOthers(theRevenueofTheMonth)
            setProfit(theRevenueofTheMonth - theCostOfTheMonth)
        }
       
    },[dataToPresent])

    return(<div className="row">
        <div className="col-12">
           <div className="card card-body" style={{border:"0"}}>
            <div className="row">
                <div className="col-12">
                    <div className="progress" style={{height:"20px"}}>
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width:`${(cost/revenue)*100}%`,color:"black"}}>{`${((cost/revenue)*100).toFixed(2)}%`}</div>
                    <div class="progress-bar  progress-bar-striped progress-bar-animated bg-success" style={{width:`${(profit/revenue)*100}%`}}>{`${((profit/revenue)*100).toFixed(2)}%`}</div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                   <button className="btn btn-warning" style={{width:"100%"}}>Cost : {cf.format(cost.toFixed(2))}</button> 
                </div>
                <div className="col-4">
                <button className="btn btn-success" style={{width:"100%"}}>Profit : {cf.format(profit.toFixed(2))}</button> 
                </div>
                <div className="col-4">
                <button className="btn text-white" style={{backgroundColor:"brown",width:"100%"}}>Revenue : {cf.format(revenue.toFixed(2))}</button>
                </div>
                
            </div>
            
           </div>
        </div>
    </div>)
}
export default ProfDestributeDataSection