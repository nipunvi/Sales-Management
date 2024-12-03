import { useState ,useEffect, useRef} from "react"

const StoreTableRow = (props) => {
   
    //const [rowOfData,setRowData] = useState({})
    
    const [id,setId] = useState()
    const [itemName,setItemName] = useState()
    const [buyingPrice,setBuyingPrice] = useState()
    const [selingPrice,setSellingPrice] = useState()
    const [availableStock,setAvaiableStock] = useState()
    const [UOM,setUOM] = useState()
    const [submitedStatus,setStubmitedStatus] = useState()
    const cf = Intl.NumberFormat('en-US',{
      style:"currency",
      currency:"LKR"
  })

    useEffect(()=>{
     // setRowData(props.rowData)
      setItemName(props.rowData['item Name'])
      setBuyingPrice(props.rowData['buying price'])
      setSellingPrice(props.rowData['selling price'])
      setAvaiableStock(props.rowData['available stock'])
      setUOM(props.rowData['UOM'])
      setId(props.rowData['id'])
    },[props.rowData])
    
    const handleEdit = () => {
      props.setCrntlyEditingData(props.rowData)
    }

    const handleDelete = () => {
      props.setCrntDeletingData(props.rowData)
    }

    const handleItemclickOnstore = (id) => {
     props.setClickedItemToRead(id)
     fetch(`http://localhost:5000/profitsAndSales/${id}/${0}/${0}`).then(res=>res.json()).then((resp)=>{
      if(resp){
               props.setClickedItemProfSalesRev(resp)
      }
     }).catch(err=>{
      console.log(err)
     })
    }

return (<><tr>
        <td>{id}</td>
        <td id="tableItemName" onClick={()=>handleItemclickOnstore(id)} data-bs-toggle='modal' data-bs-target='#profileModal'><b>{itemName}</b>
        </td>
       { buyingPrice < selingPrice ? <td style={{color:"green"}}>{cf.format(buyingPrice)}</td>:
       <td style={{color:"red"}}><b>{cf.format(buyingPrice)}</b></td>}
        <td>{cf.format(selingPrice)}</td>
        <td>
          <div className="row" style={{textAlign:"center"}}>
          <div className="col-12">
            {availableStock}
          </div>
          </div>
          <div className="row" style={{textAlign:"center"}}>
          <div className="col-12">
          <div class="progress" style={{height:"6px"}}>
             <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width:`${(Number(availableStock)/Number(props.staticStoreData))*100}%`}}></div>
             <div class="progress-bar  progress-bar-animated bg-danger" style={{width:`${100-((Number(availableStock)/Number(props.staticStoreData))*100)}%`}}></div>
             </div>
          </div>
          </div>
        </td>
        <td>{UOM}</td>
        <td>
          <div className="btn-group">
            <button className={`btn btn-sm btn-primary`} type="button" data-bs-toggle="modal" data-bs-target="#myModals" onClick={handleEdit}>
              Edit
            </button>
            <button className={`btn btn-sm btn-danger`} type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={handleDelete}>
              del
            </button>
            </div>
        </td>
        </tr>
        
        </>)
}
export default StoreTableRow