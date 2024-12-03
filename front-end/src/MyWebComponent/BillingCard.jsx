import { useRef, useState,useEffect } from "react"
import BillTableHeader from "./BillTableHeader"
import BillTableBody from "./BillTableBody"
import BillTableBodyReadOnly from "./BillTableBodyReadOnly"
import BillTableHeaderReadOnly from "./BillTableHeaderReadOnly"
import myModal from "./myModal"

  const BillingCard = (props) => {
   
    const [newlyStock,setNewStock] = useState()
    const [crntStockDataPlace,setCrntStockDataPlace] = useState()
    const [currentlyAddedItemStock,setCurntlyAddedItemStock] =  useState([])
    const [disability,setDesability] = useState("true")
    const [quantity,setQuantity] = useState()
    const [price,setPrice] = useState("Rs 00.00")
    const [deletedRecord,setDeletedRecord] = useState()
    const [clickedRefId,setClickedRefId] = useState("")
    const [tableRows,setTableRows] = useState([])
    const [tableRowsReadOnly,setTableRowsReadOnly] = useState([])
    const [grandTotal,setGrandTotal] = useState("Rs 00.00")
    const [grandTotalReadOnly,setGrandTotalReadOnly] = useState()
    const [balance,setBalance] = useState("Rs 00.00")
    const [balanceReadOnly,setBlanaceReadOnly] = useState(0)
    const [payment,setPayment] = useState()
    const [paymentDisability,setPaymentDisability] = useState(true)
    const [paymentValue,setPaymentValue] = useState()
    const [paymentVlueForReadOnly,setPaymentValueForReadOnly] = useState(0)
    const [bottomCardStyle,setBottomCardStyle] = useState({})
    const [upperCardStyle,setUpperCardStyle] = useState({})
    const [itemName,setItemName] = useState()
    const cf = Intl.NumberFormat('en-US',{
      style:"currency",
      currency:"LKR"
    })


    useEffect(()=>{
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      console.log(newlyStock)
    })
    useEffect(()=>{
      if(props.mode == 'false'){
      document.getElementById('payInput').focus()
    }
    },[paymentDisability])

    useEffect(()=>{
      if(props.mode == 'false'){
      document.getElementById('quan').focus()
      }
    },[disability])
   
    useEffect(()=>{
      if(props.mode == 'true'){
        setBottomCardStyle({height:"28%",display:"none"})
        setUpperCardStyle({height:"100%",marginBottom:"6px"})
        if(props.clickedBillData){
          setClickedRefId(props.clickedBillData.refId)
          setTableRowsReadOnly(props.clickedBillData.rows)
          setPaymentValueForReadOnly(props.clickedBillData.paymentValue)
          let GrandTotal = 0
          props.clickedBillData.rows.forEach((val,ind)=>{
            GrandTotal += Number((val.total).toString().substring(3,val.total.length))
          })
          setGrandTotalReadOnly(GrandTotal)
          setBlanaceReadOnly((props.clickedBillData.paymentValue - GrandTotal).toFixed(2))

        }
      }else if(props.mode == 'false'){
        setTableRows([])
        setBottomCardStyle({height:"28%",display:"block"})
        setUpperCardStyle({height:"70%",marginBottom:"6px"}) 
      }
    },[props.mode,props.clickedBillData])
    
    useEffect(()=>{
      props.setChoosedStock(newlyStock)
    },[newlyStock])

    useEffect(()=>{
      if(currentlyAddedItemStock.length > 0){
        setNewStock(currentlyAddedItemStock[crntStockDataPlace]['stock'])
      }
    },[crntStockDataPlace,currentlyAddedItemStock])

    useEffect(()=>{
      setItemName(props.choosenFromList[0]['item Name'])
      if(props.choosenFromList[0]['id'].length > 0){
        setCurntlyAddedItemStock((prev)=>{
        if(prev.length == 0){
          setCrntStockDataPlace(0)
          return([{id:`${props.choosenFromList[0]['id']}`,stock:props.choosenFromList[0]['available stock']}])
        }else{
          console.log(prev)
          const theEqualedArr = prev.findIndex((val)=>val['id'] == props.choosenFromList[0]['id'])
          console.log(theEqualedArr)
          if(theEqualedArr == -1){
            setCrntStockDataPlace(prev.length)
            return([...prev,{id:`${props.choosenFromList[0]['id']}`,stock:props.choosenFromList[0]['available stock']}])
          }else{
            setCrntStockDataPlace(theEqualedArr)
            return prev
          }
        }
        })
      }
      console.log(props.choosenFromList[0]['id'])
      if(props.choosenFromList[0]['id'].length > 0){
        setQuantity()
        setDesability(false)
       document.getElementById('quan').focus()
      }else{
        setDesability("true")
      }
        
        setPrice("Rs 00.00")
    },[props.choosenFromList])
   

    useEffect(()=>{
      if(deletedRecord){
        console.log(deletedRecord)
        setCurntlyAddedItemStock(prev=>{
         const theRightIndex = prev.findIndex((val)=>(val['id']).toString() == (deletedRecord['id']).toString())
         if(theRightIndex != -1){
          console.log(theRightIndex)
          const previousArray = [...prev];
          console.log(previousArray)
          previousArray[theRightIndex] = {...previousArray[theRightIndex],stock:Number(previousArray[theRightIndex]['stock']) + Number(deletedRecord['quantity'])};
        
          return previousArray
        }else{

          return prev
        }
        })
        
      }
    },[deletedRecord])

    useEffect(()=>{
      setPaymentValue('')
      setBalance("Rs 00.00")
        let theValue = 0
        tableRows.forEach((value,index)=>{
            theValue += Number((value.total).substring(3,value.total.length))
        })
        console.log(theValue)
        setGrandTotal(`Rs ${Number(theValue).toFixed(2).toString()}`)
        if(tableRows.length > 0){
        setPaymentDisability(false)
       
      }else{
        
        setPaymentDisability(true)
      }
    },[tableRows])
   
    const handleInputChange = (e) => {
         props.setTextEnter(e.target.value)
    }

    const handleInputChangeFromQuantity = (e) => {
        //console.log(e.target.value)
       console.log(currentlyAddedItemStock)
       console.log(crntStockDataPlace)
        setQuantity(e.target.value)
        if((currentlyAddedItemStock[crntStockDataPlace]['stock'] - e.target.value) >= 0){
          setNewStock(currentlyAddedItemStock[crntStockDataPlace]['stock'] - e.target.value)
          setPrice(`Rs ${(e.target.value * props.choosenFromList[0]['selling price']).toFixed(2)}`)
        }else{
          alert(`YOU DONT HAVE ENOUGH STOCK TO SELL ${props.choosenFromList[0]['item Name']}. ANYMORE`)
        }
       
    }

    const handleInputChangeInPayment = (e) => {
      
        setPaymentValue(e.target.value)
        let theValue = 0
        tableRows.forEach((value,index)=>{
            theValue += Number((value.total).substring(3,value.total.length))
        })
        if(e.target.value > theValue){
        let balance = e.target.value - theValue
        setBalance(`Rs ${Number(balance).toFixed(2).toString()}`)
    }else{
        setBalance("Rs 00.00")
    }
   
    }

     const handleAddToBillEvent = (e) =>{
      //crntStockDataPlace update kirima sadaha

     let newStock = currentlyAddedItemStock[crntStockDataPlace]['stock'] - Number(document.getElementById('quan').value)
     setNewStock(newStock)
     console.log(newStock)
       if(newStock >= 0){
      setCurntlyAddedItemStock(prev=>{
          const newValue = [...prev]
          newValue[crntStockDataPlace] = {...newValue[crntStockDataPlace],stock:newStock}

          return newValue
        })
        let justAddedObj = {}
        justAddedObj['id'] = props.choosenFromList[0]['id']
        justAddedObj['item'] = document.getElementById('readOnlyInputItem').value
        justAddedObj['quantity'] = document.getElementById('quan').value
        justAddedObj['total'] = document.getElementById('readOnlyInputTotal').value
        justAddedObj['UOM'] = props.choosenFromList[0].UOM
        justAddedObj['totalCost'] = Number(props.choosenFromList[0]['buying price'])*Number(document.getElementById('quan').value)
    
        if(!(justAddedObj.quantity == 0)){
        setTableRows((prevRows)=>{
            return[...prevRows,justAddedObj]
        })

        }else{
            alert('please add a quantity')
        }
        document.getElementById('payInput').focus()
        setItemName("")
        setPrice("Rs 00.00")
        setQuantity('')
        setPaymentValue('')
        setDesability("true")
      }else{
       alert(`YOU DONT HAVE ENOUGH STOCK TO SELL ${props.choosenFromList[0]['item Name']}. ANYMORE`)
      }
       
     }

     
     const handlePaidEvent = () => {
      
     }

     const handleConfirmEvent = () => {

        if(tableRows.length > 0){
        let arrayWithRefID = {}
        let totlProfit = 0
        tableRows.forEach((val,ind)=>{
          totlProfit += (Number(val['total'].substring(3,val['total'].length)) - Number(val['totalCost']))
        })
        let today = new Date()
        arrayWithRefID['refId'] = `${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2,'0')} ${(today.getDate()).toString().padStart(2,'0')}${(today.getHours()).toString().padStart(2,'0')} ${(today.getMinutes()).toString().padStart(2,'0')}${(today.getSeconds()).toString().padStart(2,'0')} ${today.getMilliseconds().toString().padEnd(3,'0')}`
        arrayWithRefID['paymentValue'] = paymentValue
        arrayWithRefID['totalProfit'] = totlProfit
        arrayWithRefID['rows'] = tableRows
        console.log( arrayWithRefID['refId'])
   
        setTableRows([])
        
        fetch('http://localhost:5000/writeBillData',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(arrayWithRefID)
        }).then(res=>res.json()).then(response=>{
          if(response.message == 'success'){
            props.setPostConfirmation(prev=>!prev)
            
          }
        })
        const myPromise = new Promise((resolve,reject)=>{
          fetch('http://localhost:5000/updateStocks',{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(arrayWithRefID)
          }).then(res=>res.json()).then(resp=>{
            if(resp){
             resolve(resp)
            }
          })
        })
        myPromise.then((res)=>{
          props.setStoreUpdateSignal(res)
        })  
        fetch('http://localhost:5000/writeStableBillData',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(arrayWithRefID)
        }).then(res=>res.json()).then(response=>{
          if(response.message == 'success'){
            props.setPostConfirmation(prev=>!prev)
            
          }
        })
        /*fetch('http://localhost:5000/updateSalesRevProf',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(tableRows)
        }).then(res=>res.json()).then((resp)=>{
          if(resp.message == 'success'){
            console.log('succeed')
          }
        })*/
     
    }  
    }
    return (<>
     
            <div className="billingCardContainer">
             
                <div className="row" style={upperCardStyle}>
                    <div className="col-12">
                      <div className="card " id="Bill-Card" style={{height:"100%", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",textAlign:"center"}}>
                          <div className="card-body pt-0" id="Cbody" style={{height:"200px",overflowY:"auto",position:"relative"}}>
                            {props.mode == 'true'&& <div className="row mt-3"><div className="col-2"></div><div className="col-8">{clickedRefId &&<div className="spinner-grow spinner-grow-sm me-2 text-success"></div>}<b>{`Date & Time : `}</b>
      {clickedRefId && `${(clickedRefId).toString()
        .substring(0,4)}/${(clickedRefId).toString()
        .substring(4,6)}/${(clickedRefId).toString()
        .substring(7,9)} - ${(clickedRefId).toString()
        .substring(9,11)}:${(clickedRefId).toString()
        .substring(12,14)}:${(clickedRefId).toString()
        .substring(14,16)}`} </div><div className="col-2"></div></div>}
                            <table className="table table-striped table-hover mt-2" id="Tbody">
                              <thead style={{position:"sticky",top:"0",zIndex:"1",backgroundColor:"rgba(255, 255, 255, 0.651)",paddingTop:"10px"}}>
                                {props.mode =='true'? <BillTableHeaderReadOnly clickedRefId={clickedRefId}/>:
                                <BillTableHeader/>}
                              </thead>
                              <tbody  style={{paddingTop:"40px"}}>
                               {props.mode == 'true'? <BillTableBodyReadOnly tableRowsReadOnly={tableRowsReadOnly}/>  :
                              <BillTableBody mode={props.mode} setTableRows={setTableRows} tableRows={tableRows} setDeletedRecord={setDeletedRecord}/>}
                              </tbody>
                            </table>
                          </div>
                        
                        <div className="card-footer" sty>
                           {props.mode == 'true'?<div className="row ">
                                <div className="col-4">
                                   <b>{`Paid : `}</b>{paymentVlueForReadOnly}
                                </div>
                                <div className="col-4">
                                   <b>{`Total : `}</b>{grandTotalReadOnly}
                                </div>
                                <div className="col-4">
                                   <b>{`Bal : `}</b>{balanceReadOnly}
                                </div>
                            </div>:
                            <div className="row ">
                                <div className="col-4">
                                   <input  className="form-control-sm"  
                                   type="number" 
                                   value={paymentValue}
                                   
                                   style={{width:"100%",border:"1px solid black",borderRadius:"10px",marginBottom:"0px"}} 
                                   placeholder="Payment" id="payInput"
                                   onChange={handleInputChangeInPayment} disabled={paymentDisability}/>
                                </div>
                                <div className="col-4">
                                   <b>{`Total : `}</b>{grandTotal}
                                </div>
                                <div className="col-4">
                                   <b>{`Bal : `}</b>{balance}
                                </div>
                            </div>}
                        </div>
                      </div>
                    </div>
                </div>
                <div className="row" style={bottomCardStyle}>
                    <div className="col-12" id="testing">
                      <div className="card"style={{height:"100%",marginTop:"2px", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",}}>
                        <div className="row mt-3" style={{margin:"5px", marginInline:"8px"}} >
                          <div className="col-4" style={{textAlign:"center"}}>
                            <b>
                             <input type="text" 
                             class="form-control-sm" 
                             id="readOnlyInputItem" 
                             value={itemName} 
                             style={{width:"100%",border:"1px solid black",borderRadius:"10px"}} 
                             placeholder="Selected Item" 
                             disabled="true"/>
                            </b>
                          </div>
                          <div className="col-4">
                             <input className="form-control-sm" 
                             type="number" 
                             id="quan" 
                             style={{width:"60%",border:"1px solid black",borderRadius:"10px"}} 
                             value={quantity}
                             onChange={handleInputChangeFromQuantity}
                             onKeyDown={(e)=>{e.key === 'Enter'&& handleAddToBillEvent()}}
                             disabled={disability}/>
                            <b style={{width:"10%",paddingLeft:"5px"}}>
                                {props.choosenFromList[0].UOM}
                            </b></div>
                            <div className="col-4"  
                             style={{textAlign:"center"}}>
                              <input type="text" 
                              class="form-control-sm" 
                              id="readOnlyInputTotal" 
                              value={price} 
                              style={{width:"100%",border:"1px solid black",borderRadius:"10px"}} 
                              readonly/>
                            </div>
                          </div>
                        <div className="row" style={{margin:"5px", marginInline:"8px"}} > 
                          <div className="col-12">
                            <input 
                              className="form-control-sm mt-1" 
                              type="text" 
                              placeholder="Search for an item" 
                              style={{width:"100%",border:"1px solid black",borderRadius:"10px"}} 
                              onChange={handleInputChange}/>    
                            </div>    
                          </div>
                        <div className="row" style={{margin:"5px",marginInline:"8px"}}>
                          <div className="col-sm-6">
                            {paymentValue > 0 && paymentValue >= Number(grandTotal.substring(3,grandTotal.length)) ?
                            <button className="btn btn-success" 
                            style={{borderRadius:"12px",width:"100%",marginInline:"0"}}
                            data-bs-toggle="modal" 
                            data-bs-target="#myModal"
                           
                            onClick={handlePaidEvent}>
                                PAID
                            </button> :
                            <button className="btn btn-success" 
                            style={{borderRadius:"12px",width:"100%",marginInline:"0"}}
                            data-bs-toggle="modal" 
                            data-bs-target="#myModal"
                          
                            onClick={handlePaidEvent}
                            disabled>
                                PAID
                            </button>}
                            
<div className="modal fade modal-lg" id="myModal" style={{height:"900px"}}>
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Modal Heading</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>


      <div className="modal-body">
      <div className="card " style={{height:"100%", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",textAlign:"center"}}>
                          <div className="card-body pt-0" id="Cbody" style={{height:"200px",overflowY:"auto",position:"relative"}}>
                            <table className="table table-striped table-hover mt-2" id="Tbody">
                              <thead style={{position:"sticky",top:"0",zIndex:"1",backgroundColor:"white",paddingTop:"10px"}}>
                                <BillTableHeader/>
                              </thead>
                              <tbody  style={{paddingTop:"40px"}}>
                                <BillTableBody setTableRows={setTableRows} tableRows={tableRows} />
                              </tbody>
                            </table>
                          </div>
                        
                        <div className="card-footer" >
                            <div className="row ">
                                <div className="col-4">
                                   <b>{`Payment : `}</b>{cf.format(paymentValue)}
                                </div>
                                <div className="col-4">
                                   <b>{`Total : `}</b>{cf.format(grandTotal)}
                                </div>
                                <div className="col-4">
                                   <b>{`Bal : `}</b>{cf.format(balance)}
                                </div>
                            </div>
                        </div>
                      </div>
      </div>

    
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
       onKeyDown={(e)=>e.key === 'Enter' && handleConfirmEvent()}
      onClick={handleConfirmEvent}>Confirm</button>
      </div>

    </div>
  </div>
</div>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btn-warning" 
                            style={{borderRadius:"12px",width:"100%"}} 
                            onClick={handleAddToBillEvent}>
                                ADD TO BILL
                            </button>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
             </>)
}
export default BillingCard
// <div className="card mt-3 billCardAtBilling" style={{height:"100%"}}>
/*<div className="mt-3"><b>{`Date & Time : `}</b>
      {clickedRefId && `${(clickedRefId).toString()
        .substring(0,3)}/${(clickedRefId).toString()
        .substring(4,6)}/${(clickedRefId).toString()
        .substring(7,9)} - ${(clickedRefId).toString()
        .substring(9,11)}:${(clickedRefId).toString()
        .substring(12,14)}:${(clickedRefId).toString()
        .substring(14,16)}`}</div>*/