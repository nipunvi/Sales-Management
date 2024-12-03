import { useEffect, useRef, useState } from "react"
import RecentBillCard from "./RecentBillCard"
import CardLoad from "./CardLoad"

const RecentBillsList = (props) =>{
   
  //  thisSessionBills
    const [oldArray,setOldArray] = useState([])
    const [newArray,setNewArray] = useState([])
    const [condition,setCondition] = useState('==')
    const [filterdate,setFilterDate] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const theBillData = useRef([])

    useEffect(()=>{
   
        fetch('http://localhost:5000/readBillData1')
        .then(res=>res.json())
        .then((response)=>{
          console.log(JSON.parse(response))
          setOldArray(JSON.parse(response))
          theBillData.current = JSON.parse(response)
          setIsLoading(true)
        })
      

    },[props.postConfirmation])
    
    const changingEvent= (e) => {
        setCondition(e.target.value)
    }

    const handleDateChangeEvent = (e) =>{
        setFilterDate(e.target.value)
      }

    useEffect(()=>{
      if(theBillData.current.length > 0){
        if(condition == '=='){
            if(filterdate.toString().length > 0 ){
              console.log('equal sign')
              console.log(condition)
              console.log(filterdate)
            setOldArray(theBillData.current.filter((value,i)=>{
             return(value['refId']).toString().substring(0,9).split(" ").join("") == (filterdate).toString().split("-").join("")
            }))
     
           
           }else{
             setOldArray(theBillData.current)
            
           }
         }else if(condition == '>'){
             if(filterdate.length > 0 ){
                 setOldArray(theBillData.current.filter((value,i)=>{
                  return(value['refId']).toString().substring(0,9).split(" ").join("") > (filterdate).toString().split("-").join("")
                 }))
          
                 
                }else{
                  setOldArray(theBillData.current)
                 
                }
         }else if(condition == '>='){
             if(filterdate.length > 0 ){
                 setOldArray(theBillData.current.filter((value,i)=>{
                  return(value['refId']).toString().substring(0,9).split(" ").join("") >= (filterdate).toString().split("-").join("")
                 }))
          
                
                }else{
                  setOldArray(theBillData.current)
                 
                }
         }else if(condition == '<='){
             if(filterdate.length > 0 ){
                 setOldArray(theBillData.current.filter((value,i)=>{
                  return(value['refId']).toString().substring(0,9).split(" ").join("") <= (filterdate).toString().split("-").join("")
                 }))
          
               
                }else{
                  setOldArray(theBillData.current)
               
                }
         }else if(condition == '<'){
            if(filterdate.length > 0 ){
                setOldArray(theBillData.current.filter((value,i)=>{
                 return(value['refId']).toString().substring(0,9).split(" ").join("") < (filterdate).toString().split("-").join("")
                }))
         
                
               }else{
                 setOldArray(theBillData.current)
                 
               }
         }
        }
    },[condition,filterdate])

   
    
  
 return (<>
         <div className="billingCardContainer">
              <div className="card mt-3 billCard" style={{height:"100%"}}>
                <div className=" mt-3 pb-2" style={{width:"100%",textAlign:"center"}}>
                <select className="form-control-sm me-2 " style={{border:"1px solid black",width:"24%"}} name="condition" id="conditionSelect" onChange={changingEvent}>
                    <option value="==">on</option>
                    <option value="<">before</option>
                    <option value=">">after</option>
                    <option value=">=">on or after</option>
                    <option value="<=">on or before</option>
                  </select>
                  <input type="date" className="form-control-sm " style={{border:"1px solid black",width:"44%"}} onChange={handleDateChangeEvent}/> 
                </div>

                <div className="card-body " style={{width:"100%",overflowY: "auto"}}>
                   
                   {oldArray.length > 0 && isLoading ? <RecentBillCard billArray={oldArray} setClickedBill={props.setClickedBillData} mode={props.mode}/>:<div><CardLoad/></div>}
                  </div>
                </div>
              </div></>)
}
export default RecentBillsList