import { useEffect, useState } from 'react'
import image from '../assets/credit_card_PNG17.png'

const RecentBillCard = (props) => {
    
    const [arrayToUse,setArrayToUse] = useState([])


    useEffect(()=>{ 
        console.log(props.billArray)
            setArrayToUse(props.billArray.toReversed())   
    },[props.billArray])
    

    const cardTotalFunction = (rowArray) => {
        if(rowArray.length > 0){
        let theValue = 0
        rowArray.forEach((value,index)=>{
            theValue += Number((value.total).substring(3,value.total.length))
        })
        return theValue
    }
    }

    const dateTime = (refId) => {
        if(refId){
      return (`${refId.toString().substring(2,4)}/${refId.toString().substring(4,6)}/${refId.toString().substring(7,9)} - ${refId.toString().substring(9,11)}:${refId.toString().substring(12,14)}`)
    }
    }

    const billClickeventHandler = (data) => {
        props.setClickedBill(data)
        console.log(data)
    }
    return(<>
             {arrayToUse.length > 0 && 
                arrayToUse
                .map((val,i)=><div className='card mt-3' style={{ boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.908)",cursor:"pointer"} }
                              id="bill"
                              onClick={()=>billClickeventHandler(val)}
                              >  <div style={{marginTop:"25px"}}>{val.refId}</div> 
                              <div>{`${cardTotalFunction(val.rows)}/=`}</div>
                              <div style={{marginTop:"25px",marginLeft:"40px",backgroundColor:"white",color:"black",opacity:"70%"}} >{dateTime(val.refId)}</div>
                              </div>
                              )
                }
           </>)
}
export default RecentBillCard