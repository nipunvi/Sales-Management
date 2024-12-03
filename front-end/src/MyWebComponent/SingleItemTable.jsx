import { useEffect, useState } from "react"
import SingleItemTableRows from "./SingleItemTableRows"

const SingleItemTable = (props) => {
    
    const {clickedItemFromTheStore,sDate,eDate} = props
    const [objectToGenerateTableRows,setObjectToGenerateTableRows] = useState([])
    const [finalArray,setTheFinalArray] = useState([])
    
    useEffect(()=>{
        let theArray = []
        finalArray.length > 0 && finalArray.forEach((value,index)=>{
            let theObj = {}
            let thisTimeStringMaker = (value['refId']).toString().substring(0,16).split(' ').join('')
            theObj['date'] = `${thisTimeStringMaker.substring(0,4)}/${thisTimeStringMaker.substring(4,6)}/${thisTimeStringMaker.substring(6,8)} - ${thisTimeStringMaker.substring(8,10)}:${thisTimeStringMaker.substring(10,12)}:${thisTimeStringMaker.substring(12,14)}`
            let totalSoldQuantity = 0
            let totalRevenue = 0
            let totalCost = 0
            let totalProfit =0
            value['rows'].forEach((va,inde)=>{
                if(va['id'] == clickedItemFromTheStore['id']){
                    totalSoldQuantity += Number(va['quantity'])
                    totalRevenue += Number(va['total'].substring(3,va['total'].length))
                    totalCost += Number(va['totalCost'])
                    totalProfit += (Number(va['total'].substring(3,va['total'].length))-Number(va['totalCost']))
                }
            })
            theObj['totalSoldQuantity'] = totalSoldQuantity
            theObj['totalRevenue'] = totalRevenue
            theObj['totalCost'] = totalCost
            theObj['totalProfit'] = totalProfit
            theArray.push(theObj)
        })
        console.log(theArray)
        setObjectToGenerateTableRows(theArray)
    },[finalArray])

    
    useEffect(()=>{
 
        fetch('http://localhost:5000/readBillData').then(res=>res.json()).then((res)=>{
console.log(sDate)
console.log(eDate)
            let startDate = Number(sDate.toString().split('-').join(''))
            let endDate =  Number(eDate.toString().split('-').join(''))
            let idToCompare = clickedItemFromTheStore['id']
            let resp = JSON.parse(res)
            if(resp.length > 0){
               let thisItemAvailabilityArray = resp.filter((value,index)=>{
                   let theIndex = value['rows'].findIndex((val,ind)=>val['id'] == idToCompare)
                   if(theIndex != -1){
                    return(value)
                   }
                })
                //.filter((val,i)=>Number(val['refId'].substring(0,9).split(' ').join('')) > 0)
  if(thisItemAvailabilityArray.length > 0){
                if(startDate == 0 && endDate == 0){
                    
                    setTheFinalArray(thisItemAvailabilityArray)
                }else if(startDate == 0 && endDate > 0){
                    setTheFinalArray(thisItemAvailabilityArray.filter((val,i)=>Number(val['refId'].substring(0,9).split(' ').join('')) <= endDate))
                }else if(startDate > 0 && endDate == 0){
                    setTheFinalArray(thisItemAvailabilityArray.filter((val,i)=>Number(val['refId'].substring(0,9).split(' ').join('')) >= startDate))
                }else{
                    setTheFinalArray(thisItemAvailabilityArray.filter((val,i)=>Number(val['refId'].substring(0,9).split(' ').join('')) >= startDate &&
                                                                               Number(val['refId'].substring(0,9).split(' ').join('')) <= endDate))
                }
            }else{
                setTheFinalArray([])
            } 
            }

        })
    
    },[clickedItemFromTheStore,sDate,eDate])
   
    return(<div className="table-responsive">
             <table class="table table-bordered  table-hover mt-3">
                <thead>
                <tr style={{textAlign:"center"}}>
                    <th>Quantity</th>
                    <th>Buying Price</th>
                    <th>Selling Price</th>
                   {/**<th>Cost</th> */} 
                    <th>Revenue</th>
                    <th>Profit</th>
                    <th>Date/time</th>
                </tr>
                </thead>
                <tbody style={{height:"20%",overflowY:"auto"}}>
                {objectToGenerateTableRows.length > 0 && objectToGenerateTableRows.map((value,i)=>{
                   return(<SingleItemTableRows dataToDisplay={value}/>) 
                }) }
                </tbody>
            </table>
           </div>)
}
export default SingleItemTable