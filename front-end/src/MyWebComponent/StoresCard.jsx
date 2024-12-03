import { useEffect, useState } from "react"
import StoreTable from "./StoreTable"
import SingleItemTable from "./SingleItemTable"

const StoresCard = (props) => {

   const [successSubmit,setSuccessSubmit] = useState(false)
   const [displaySubmit,setDisplaySubmit] =  useState("block")
   const [newItemName,setNewItemName] = useState("")
   const [newBuyingPrice,setNewBuyingPrice] = useState("")
   const [newSellingPrice,setNewSellingPrice] = useState("")
   const [newAvailableStock,setNewAvailableStock] = useState("")
   const [newUOM,setNewUOM] = useState("")
   const [itemNameClr,setitemNameClr] = useState("white")
   const [buyingPriceClr,setBuyingPriceClr] = useState("white")
   const [sellingPriceClr,setSellingPriceClr] = useState("white")
   const [availableStockClr,setAvailableStockClr] = useState("white")
   const [UOMClr,setUOMClr] = useState("white")
   const [successFullSubmit,setSuccessfullSubmit] = useState(false)
   const [storeSearchText,setStoreChangeText] = useState('')
   const [clickedItemFromTheStore,setClickedItemFromTheStore] = useState()
   const [clickedItemProfSalesRev,setClickedItemProfSalesRev] = useState()
   const [datePickerAtStore,setDatePickerAtStore] = useState()
   const [sDate,setSDate] = useState(0)
   const [eDate,setEDate] = useState(0)

   useEffect(()=>{
      console.log(clickedItemFromTheStore)
   },[clickedItemFromTheStore])


   useEffect(()=>{
    if(eDate == ''){
      setEDate(0)
    }
    if(sDate == ''){
      setSDate(0)

    }
    if(clickedItemFromTheStore){
      
    fetch(`http://localhost:5000/profitsAndSales/${clickedItemFromTheStore['id']}/${sDate}/${eDate}`).then(res=>res.json()).then((resp)=>{
      if(resp){
               setClickedItemProfSalesRev(resp)
      }
     }).catch(err=>{
      console.log(err)
     })
    
  }
   },[sDate,eDate,clickedItemFromTheStore])

  

   useEffect(()=>{
      if(newItemName.length > 0){
        setitemNameClr("white")
      }
      if(newBuyingPrice.length > 0){
        setBuyingPriceClr("white")
      }
      if(newSellingPrice.length > 0){
        setSellingPriceClr("white")
      }
      if(newAvailableStock.length > 0){
        setAvailableStockClr("white")
      }
      if(newUOM.length > 0){
        setUOMClr("white")
      }
   },[newItemName,newBuyingPrice,newSellingPrice,newAvailableStock,newUOM])
   
   const handleCloseModal = () => {
    setNewUOM("")
    setNewAvailableStock("")
    setNewSellingPrice("")
    setNewBuyingPrice("")
    setNewItemName("")
    setitemNameClr("white")
    setBuyingPriceClr("white")
    setSellingPriceClr("white")
    setAvailableStockClr("white")
    setUOMClr("white")
   }

   const handleItemnameChange = (e) => {
    setNewItemName(e.target.value)

   }

   const handleBuyingPriceChange = (e) => {
    setNewBuyingPrice(e.target.value)
   }

   const handleSllingPriceChange = (e) => {
    setNewSellingPrice(e.target.value)
   }

   const handleAvilableStockChange = (e) => {
    setNewAvailableStock(e.target.value)
   }

   const handleUOMchange = (e) => {
    setNewUOM(e.target.value)
   }

   const handleSubmitEvent = () => {
     if(newItemName && newBuyingPrice && newSellingPrice && newAvailableStock && newUOM){
        setSuccessfullSubmit(true)
        setTimeout(()=>{
            setSuccessfullSubmit(false)
        },2000)
        fetch('http://localhost:5000/submitNewItemData',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            "item Name": newItemName,
            "available stock": newAvailableStock,
            "UOM": newUOM,
            "buying price": newBuyingPrice,
            "selling price": newSellingPrice})
        }).then(res=>res.json()).then(response=>{
            if(response.message == 'success'){
                setSuccessSubmit(prev=>!prev)
                setNewUOM("")
                setNewAvailableStock("")
                setNewSellingPrice("")
                setNewBuyingPrice("")
                setNewItemName("")
                props.setStoreUpdatedSignal(prev=>!prev)
            }
        })
     }else{
        if(!newItemName){
            setitemNameClr("rgb(241, 195, 195)")
        }
        if(!newBuyingPrice){
            setBuyingPriceClr("rgb(241, 195, 195)")
        }
        if(!newSellingPrice){
            setSellingPriceClr("rgb(241, 195, 195)")
        }
        if(!newAvailableStock){
            setAvailableStockClr("rgb(241, 195, 195)")
        }
        if(!newUOM){
            setUOMClr("rgb(241, 195, 195)")
        }
     }
   }
const handleStoreSearchChange = (e) => {
  setStoreChangeText(e.target.value)
}

const handleDateInputInStock = (e) => {

  setSDate(e.target.value)
 
}

const handleendDateInputInStock = (e) => {

  setEDate(e.target.value)
}

const storeItemDetailsClose = () => {
  setEDate(0)
  setSDate(0)
  document.getElementById('dateAtStore').value = 0
  document.getElementById('dateAtStoreEnd').value = 0
}
return(<div className="col-12">
    
         <div className="card mt-3" style={{width:"100%",height:"93vh",boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)"}}>
            {<div className="card-body" style={{overflowY:"auto"}}>  
            <div className="row">
                <div className="col-3" style={{display:"flex",justifyContent:"start"}} ><input 
                              className="form-control-sm mb-2" 
                              type="text" 
                              placeholder="Search for an item" 
                              style={{width:"100%",border:"1px solid black",borderRadius:"10px"}} 
                              value={storeSearchText}
                              onChange={handleStoreSearchChange}/>    
                          </div>
                <div className="col-7" style={{display:"flex",justifyContent:"center"}}><h4></h4></div>
                <div className="col-2" style={{display:"flex",justifyContent:"end"}}><button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target='#myModale'>Add Item</button></div>
              </div>
                <StoreTable storeSearchText={storeSearchText} 
                successSubmit={successSubmit} 
                setStoreUpdatedSignal={props.setStoreUpdatedSignal} 
                storeUpdateSignal={props.storeUpdateSignal} 
                setItemDeletedSignal={props.setItemDeletedSignal} 
                setClickedItemFromTheStore={setClickedItemFromTheStore}
                setClickedItemProfSalesRev={setClickedItemProfSalesRev}/>
              </div>}
            </div>  
            <div className="modal fade draggable-modal" id="myModale">
     <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title" >ADD A NEW ITEM</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal}></button>
      </div>

      <div className="modal-body">
       {!successFullSubmit ? <><label for="ItemName" className="form-label mt-2">Item Name : </label>
       <input type="text" id="ItemName" className="form-control" value={newItemName} style={{backgroundColor:`${itemNameClr}`}}  onChange={handleItemnameChange}/>
      
       <label for="BuyingPrice" className="form-label mt-2">Buying Price : </label>
       <input type="number" id="BuyingPrice" className="form-control" value={newBuyingPrice} style={{backgroundColor:`${buyingPriceClr}`}}  onChange={handleBuyingPriceChange}/>
      
       <label for="SellingPrice" className="form-label mt-2">Selling Price : </label>
       <input type="number" id="SellingPrice" className="form-control" value={newSellingPrice} style={{backgroundColor:`${sellingPriceClr}`}}  onChange={handleSllingPriceChange}/>
       
       <label for="AvailableStock" className="form-label mt-2">Available Stock : </label>
       <input type="number" id="AvailableStock" className="form-control" value={newAvailableStock} style={{backgroundColor:`${availableStockClr}`}}  onChange={handleAvilableStockChange}/>
       
       <label for="UOM" className="form-label mt-2">UOM : </label>
       <select name="" id="UOM" className="form-select" value={newUOM} style={{backgroundColor:`${UOMClr}`}}  onChange={handleUOMchange}>
       <option value=""></option>
        <option value="Kg">Kg - Killograms</option>
        <option value="L">L - Leters</option>
        <option value="Pks">Pks - Packets</option>
       </select></>:<div class="spinner-border text-primary"></div>}
      </div>

      <div className="modal-footer">
      <button type="button" className="btn btn-success" style={{display:`${displaySubmit}`}}  onClick={handleSubmitEvent}>Submit</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
      </div>

    </div>
  </div>
</div>  
 <div className="modal  fade modal-lg" id="profileModal">
  <div className="modal-dialog">
    <div className="modal-content"> 
      <div className="" >
        <div className="row">
          <div className="col-4">
          <h4 className="modal-title mt-3" style={{paddingLeft:"15%",marginRight:"auto"}} > {clickedItemFromTheStore && clickedItemFromTheStore['item Name'].toUpperCase()}</h4>
          </div>
          <div className="col-4">
          <input type="date" className="form-control-sm mt-3" id="dateAtStore" value={sDate} style={{border:"1px black solid",borderRadius:"5px",marginLeft:"10%"}} onChange={handleDateInputInStock}/>
          </div>
          <div className="col-4">
          <input type="date" className="form-control-sm mt-3" id="dateAtStoreEnd" value={eDate} style={{border:"1px black solid",borderRadius:"5px",marginLeft:"10%"}} onChange={handleendDateInputInStock}/>
          </div>
        </div>
        
      </div>
      <div className="modal-body" style={{height:"65vh",overflowY:"auto"}}> 
      <div className="row sticky-top" style={{height:"100px",marginTop:"0px"}}>
        <div className="col-12" style={{display:"flex",justifyContent:"center"}}>
        <button className="btn text-white" style={{width:"23.5%",height:"100px",marginRight:"5px",boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.408)",        
                            fontFamily:"Arial",backgroundColor:"brown"}}>
            <h4> {clickedItemFromTheStore && clickedItemFromTheStore['available stock']} {clickedItemFromTheStore && clickedItemFromTheStore['UOM']} </h4>
           Current Stock
          </button>
          <button className="btn btn-primary" style={{width:"23.5%",height:"100px",marginRight:"5px",boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.408)",        
                            fontFamily:"Arial"}}>
            <h4 style={{marginTop:"0px"}}>{/*clickedItemFromTheStore && clickedItemFromTheStore['available stock']*/}{clickedItemProfSalesRev && clickedItemProfSalesRev['totalSalseForthisId']} {clickedItemFromTheStore && clickedItemFromTheStore['UOM']}</h4>
            Sold count
          </button>
         
          <button className="btn btn-warning" style={{width:"23.5%",height:"100px",marginRight:"5px",boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.408)",        
                            fontFamily:"Arial"}}>
            <h4>Rs {clickedItemProfSalesRev && clickedItemProfSalesRev['totalRevenueForThisId']} </h4>
            Revenue
          </button>
          <button className="btn btn-success" style={{width:"23.5%",height:"100px",marginRight:"5px",boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.408)",        
                            fontFamily:"Arial"}}>
            <h4>Rs {clickedItemProfSalesRev && clickedItemProfSalesRev['totalProfitForthisId']}</h4>
            Net Profit
          </button>
        </div>
      </div>
      <div className="row" >
        <div className="col-12 table-responsive" >
         {clickedItemFromTheStore && <SingleItemTable sDate={sDate} eDate={eDate} clickedItemFromTheStore={clickedItemFromTheStore}/>}
        </div>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={storeItemDetailsClose}>Close</button>
      </div>
    </div>
  </div>
</div>
        </div>)
}
export default StoresCard