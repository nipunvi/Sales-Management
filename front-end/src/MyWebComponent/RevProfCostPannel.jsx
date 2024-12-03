import { useState,useEffect } from "react"

const RevProfCostPannel = (props) => {
    const {postConfirmation} = props
    const [revForMain,setRevForMain] = useState(0)
    const [profForMain,setProfForMain] = useState(0)
    const [billsData,setBillsData] = useState()
    const [updatedTime,setUpdatedTime] = useState('')
    const Crncy = Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"LKR"
    })
    useEffect(()=>{
        const now = new Date()
        
        fetch('http://localhost:5000/readBillData').then(res=>res.json()).then((res)=>{
            let billData = JSON.parse(res) 
            if(billData.length > 0){
            setBillsData(billData)
            let refId = billData[billData.length-1]['refId']
            let timeString = `${(refId).toString()
                .substring(0,4)}/${(refId).toString()
                .substring(4,6)}/${(refId).toString()
                .substring(7,9)} - ${(refId).toString()
                .substring(9,11)}:${(refId).toString()
                .substring(12,14)}:${(refId).toString()
                .substring(14,16)}`
            setUpdatedTime(timeString)
            }
        })
    
    },[postConfirmation])

    useEffect(()=>{
        if(billsData){
            let revenue = 0
            let profit = 0
            billsData.forEach((value,index)=>{
                profit += Number(value['totalProfit'])
                value.rows.forEach((val,i)=>{
                    revenue += Number(val['total'].substring(3,val['total'].length))
                })
            })
            setRevForMain(revenue)
            setProfForMain(profit)
        }
    },[billsData])

return (<>
        <div className="billingCardContainer">
            <div className="card mt-3 billCard" style={{height:"31.5%"}}>
                <div className="card-body " style={{width:"100%"}}> 
                <b>REVENUE  </b><small> - on {updatedTime}</small>
                <button className="btn text-white" style={{width:"100%",height:"80%",backgroundColor:"brown"}}><h4>{Crncy.format(Number(revForMain).toFixed(2))}</h4></button> 
                </div>
            </div>
            <div className="card  billCard" style={{height:"31.5%",marginTop:"13px"}}>
                <div className="card-body " style={{width:"100%"}}> 
                <b>COST</b> <small> - on {updatedTime}</small>
                <button className="btn btn-warning " style={{width:"100%",height:"80%"}}><h4>{Crncy.format((Number(revForMain) - Number(profForMain)).toFixed(2))}</h4></button> 
                </div>
            </div>
            <div className="card billCard" style={{height:"31.5%",marginTop:"13px"}}>
                <div className="card-body " style={{width:"100%"}}> 
                <b>NET PROFIT</b> <small> - on {updatedTime}</small>
                <button className="btn btn-success text-white" style={{width:"100%",height:"80%"}}><h4>{Crncy.format( Number(profForMain).toFixed(2))}</h4></button> 
                </div>
            </div>
        </div>
        </>)
}
export default RevProfCostPannel