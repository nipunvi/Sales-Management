import { useEffect, useState, useSyncExternalStore } from "react"
import StoreTableRow from "./StoreTableRow"

const StoreTable = (props) => {
    const theads = ["Id","Item Name","Buying Price","Selling Price","Available Stock","UOM","#"]
    const [storesData,setStoresData] = useState([])
    const [staticStoreData,setStaticStoresData] =useState()
    const [itemName,setItemName] = useState()
    const [buyingPrice,setBuyingPrice] = useState()
    const [sellingPrice,setSellingPrice] = useState()
    const [availableStock,setAvailableStock] = useState()
    const [crntlyEditingData,setCrntlyEditingData] = useState({"item Name":"","buying price":"","selling price":"","available stock":""})
    const [UOM,setUOM] = useState()
    const [displaySubmit,setDisplaySubmit]  = useState("none")
    const [submitted,setSubmitted] = useState(false)
    const [modalBody,setModalBody] = useState(true)
    const [filteredTableRows,setFilteredTablRows] = useState([])
    const [restOfTheDataRows,setRestOfTheData] = useState([])
    const [displayConfirm,setDisplayConfirm] = useState("none")
    const [crntDeletingData,setCrntDeletingData] = useState({"id":"","item Name":"","buying price":"","selling price":"","available stock":""})
    const [deleted,setDeleted] = useState(false)
    const [cickedItemToRead,setClickedItemToRead] = useState()
    
    useEffect(()=>{
        if(storesData.length > 0){   
      setFilteredTablRows(storesData.filter((value,i)=>value['item Name'].toLowerCase().includes(props.storeSearchText.toLowerCase())))
      setRestOfTheData(storesData.filter((value,i)=>!value['item Name'].toLowerCase().includes(props.storeSearchText.toLowerCase())))
    }
    },[props.storeSearchText,storesData])

    useEffect(()=>{
        if(cickedItemToRead){
           props.setClickedItemFromTheStore(storesData.filter((value,i)=>value['id'] == cickedItemToRead)[0]) 
        }
    },[cickedItemToRead])
    useEffect(()=>{
      console.log(filteredTableRows)
      console.log(restOfTheDataRows)
    },[filteredTableRows,restOfTheDataRows])

    useEffect(()=>{
        fetch('http://localhost:5000/stores').then(res=>res.json()).then((resp)=>{
            setStoresData(JSON.parse(resp))
           
        })
        fetch('http://localhost:5000/readStaticStore').then(res=>res.json()).then((resp)=>{
           
            setStaticStoresData(resp)
        })
    },[submitted,deleted,props.successSubmit,props.storeUpdateSignal])

    useEffect(()=>{
        setItemName(crntlyEditingData['item Name'])
        setBuyingPrice(crntlyEditingData['buying price'])
        setSellingPrice(crntlyEditingData['selling price'])
        setAvailableStock(crntlyEditingData['available stock'])
        setUOM(crntlyEditingData['UOM'])

    },[crntlyEditingData])

    useEffect(()=>{
        console.log(staticStoreData)
    },[staticStoreData])

    const handleItemnameChange = (e)=> {
        setItemName(e.target.value)
        if(e.target.value != crntlyEditingData['item Name'] || 
           buyingPrice != crntlyEditingData['buying price'] ||
           sellingPrice != crntlyEditingData['selling price'] ||
           availableStock != crntlyEditingData['available stock'] ||
           UOM != crntlyEditingData['UOM']){
            setDisplaySubmit("block")
        }else{
            setDisplaySubmit("none")
        }
    }

    const handleBuyingPriceChange = (e)=> {
        setBuyingPrice(e.target.value)
        if(e.target.value != crntlyEditingData['buying price'] ||
        itemName != crntlyEditingData['item Name'] ||
        sellingPrice != crntlyEditingData['selling price'] ||
        availableStock != crntlyEditingData['available stock'] ||
        UOM != crntlyEditingData['UOM']){
            setDisplaySubmit("block")
        }else{
            setDisplaySubmit("none")
        }
    }

    const handleSllingPriceChange = (e)=> {
        setSellingPrice(e.target.value)
        if(e.target.value != crntlyEditingData['selling price'] ||
        buyingPrice != crntlyEditingData['buying price'] ||
        itemName != crntlyEditingData['item Name'] ||
        availableStock != crntlyEditingData['available stock'] ||
        UOM != crntlyEditingData['UOM']){
            setDisplaySubmit("block")
        }else{
            setDisplaySubmit("none")
        }
    }

    const handleAvilableStockChange = (e)=> {
        setAvailableStock(e.target.value)
        if(e.target.value != crntlyEditingData['available stock'] ||
        buyingPrice != crntlyEditingData['buying price'] ||
        sellingPrice != crntlyEditingData['selling price'] ||
        itemName != crntlyEditingData['item Name'] ||
        UOM != crntlyEditingData['UOM']){
            setDisplaySubmit("block")
        }else{
            setDisplaySubmit("none")
        }
    }

    const handleUOMchange = (e) => {
        setUOM(e.target.value)
        if(e.target.value != crntlyEditingData['UOM'] ||
        buyingPrice != crntlyEditingData['buying price'] ||
           sellingPrice != crntlyEditingData['selling price'] ||
           availableStock != crntlyEditingData['available stock'] ||
           itemName != crntlyEditingData['item Name']){
            setDisplaySubmit("block")
        }else{
            setDisplaySubmit("none")
        }
    }

    const handleCloseModal = () => {
        setItemName(crntlyEditingData['item Name'])
        setBuyingPrice(crntlyEditingData['buying price'])
        setSellingPrice(crntlyEditingData['selling price'])
        setAvailableStock(crntlyEditingData['available stock'])
        setUOM(crntlyEditingData['UOM'])
        setDisplaySubmit("none")
    }

    const handleSubmitEvent = () => {
        fetch('http://localhost:5000/submitEditedItemData',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:crntlyEditingData.id,
                itemName:itemName,
                buyingPrice:buyingPrice,
                sellingPrice:sellingPrice,
                availableStock:availableStock,
                UOM:UOM
            })
        }).then(res=>res.json()).then((response)=>{
            console.log(response.message)
            if(response.message == 'success'){
                //setStoresData([])
                setDisplaySubmit("none") 
                setSubmitted(prev=>!prev)
                props.setStoreUpdatedSignal(prev=>!prev)
                
            }
        })
        
    }
    const staticStoreDataFilder = (value) => {
            return staticStoreData.filter((valu,i)=>valu['id'] == value['id'])[0]['available stock']
    }

    const handleDeleteConfirmationInput = (e) => {
        console.log(e.target.value)
        let theDataIsBeingDeleting = crntDeletingData['id']
        let theEnteredData = storesData.filter((value,i)=>value['item Name'] == e.target.value)

        if(theEnteredData.length > 0){
            if(theDataIsBeingDeleting == theEnteredData[0]['id']){
                setDisplayConfirm("block")
            }else{
                setDisplayConfirm("none")
            }
        }else{
            setDisplayConfirm("none")
        }     
    }

    const handleConfirmEvent = () => {
        fetch('http://localhost:5000/deleteItem',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:crntDeletingData['id']
            })
        }).then(res=>res.json()).then((resp)=>{
            console.log(resp.message)
            if(resp.message == 'success'){
                setDeleted(prev=>!prev)
                props.setItemDeletedSignal(prev=>!prev)
            }
        })
    }

return (<>{staticStoreData &&  <div className="table-responsive">
    <table className="table table-striped mt-1" style={{width:"100%"}}>
    <thead style={{position:"sticky",top:"0",zIndex:"1",textAlign:"center"}}> 
        <tr>
            {theads.map((val,i)=><td><b>{val}</b></td>)}
        </tr>
    </thead>
    <tbody style={{textAlign:"center"}}>
        {filteredTableRows.length > 0 && filteredTableRows.map((val,i)=><StoreTableRow 
        rowData={val} 
        setCrntlyEditingData={setCrntlyEditingData} 
        setCrntDeletingData={setCrntDeletingData} 
        staticStoreData={staticStoreDataFilder(val)} 
        setClickedItemToRead={setClickedItemToRead}
        setClickedItemProfSalesRev={props.setClickedItemProfSalesRev}/>)}
        {restOfTheDataRows.length > 0 && restOfTheDataRows.map((val,i)=><StoreTableRow 
        rowData={val} 
        setCrntlyEditingData={setCrntlyEditingData} 
        setCrntDeletingData={setCrntDeletingData} 
        staticStoreData={staticStoreDataFilder(val)} 
        setClickedItemToRead={setClickedItemToRead}
        setClickedItemProfSalesRev={props.setClickedItemProfSalesRev}/>)}
    </tbody>
  </table>
  
</div>}
<div className="modal fade draggable-modal" id="myModals">
     <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Edit Data</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal}></button>
      </div>

      <div className="modal-body">
       {modalBody ? <><label for="ItemName" className="form-label mt-2">Item Name : </label>
       <input type="text" id="ItemName" className="form-control" value={itemName} onChange={handleItemnameChange}/>
      
       <label for="BuyingPrice" className="form-label mt-2">Buying Price : </label>
       <input type="number" id="BuyingPrice" className="form-control" value={buyingPrice} onChange={handleBuyingPriceChange}/>
      
       <label for="SellingPrice" className="form-label mt-2">Selling Price : </label>
       <input type="number" id="SellingPrice" className="form-control" value={sellingPrice} onChange={handleSllingPriceChange}/>
       
       <label for="AvailableStock" className="form-label mt-2">Available Stock : </label>
       <input type="number" id="AvailableStock" className="form-control" value={availableStock} onChange={handleAvilableStockChange}/>
       
       <label for="UOM" className="form-label mt-2">UOM : </label>
       <select name="" id="UOM" className="form-select" value={UOM} onChange={handleUOMchange}>
        <option value="Kg">Kg - Killograms</option>
        <option value="L">L - Leters</option>
        <option value="Pks">Pks - Packets</option>
       </select></>:<> <div className="spinner-border text-primary"></div></>}
      </div>

      <div className="modal-footer">
      <button type="button" className="btn btn-success" style={{display:`${displaySubmit}`}} data-bs-dismiss="modal"  onClick={handleSubmitEvent}>Submit</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
      </div>

    </div>
  </div>
</div> 
<div className="modal fade draggable-modal" id="deleteModal">
     <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Deleting '{crntDeletingData['item Name']}'</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
      </div>

      <div className="modal-body">
        <label htmlFor="itemName" className="mb-1">Write the name of the Item you are deleting : </label>
      <input type="text" id="itemName" className="form-control" onChange={handleDeleteConfirmationInput}/>
      </div>

      <div className="modal-footer">
      <button type="button" className="btn btn-success" style={{display:`${displayConfirm}`}} data-bs-dismiss="modal"  onClick={handleConfirmEvent}>Confirm</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>  
</>)
}
export default StoreTable