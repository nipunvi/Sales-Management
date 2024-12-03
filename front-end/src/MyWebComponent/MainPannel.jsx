import { useState ,useEffect, useRef} from "react"
import BillingCard from "./BillingCard"
import GoodsList from "./GoodsList"
import RecentBillsList from "./RecentBillsList"
import StoresCard from "./StoresCard"
import Analysis from "./Analysis"
import ProfitDestribution from "./ProfitDestribution"
import RevProfCostPannel from "./RevProfCostPannel"


const MainPannel = (props) => {
    
    const [choosedItemId,setChoosedItemId] = useState()
    const [textEnter,setTextEnter] = useState("")
    const [choosenFromList,setChoosenFromList] = useState([{id:"",item:"","available stock":"",UOM:""}])
    const [postConfirmation,setPostConfirmation] = useState(false)
    const [thisSessionBills,setThisSessionBills] = useState([])
    const [arrayToSetRecetBllsCard,setArrayToSetRecentBillsCard] = useState([])
    const [confirmedTime,setConfirmedTime] = useState()
    const [mode,setMode] = useState('false')
    const [clickedBillData,setClickedBillData] = useState()
   
    const [choosedItem,setChoosedItem] = useState()
    const [choosedStock,setChoosedStock] = useState()
    const [choosedUOM,setChoosedUOM] = useState()

    const [storeUpdateSignal,setStoreUpdateSignal] = useState()

    const [choosedItemStock,setChoosedItemStock] = useState()

    const [staticStore,setStaticStore] = useState()
    const [crntItemStaticStock,setCrntItemStaticStock] = useState()
    //from the store edit an new save
    const [storeUpdatedSignal,setStoreUpdatedSignal] = useState(false)
    
    const [itemDeletedSignal,setItemDeletedSignal] = useState(false)
   
    
    useEffect(()=>{
        if(choosenFromList.length > 0){
            setChoosedItemId(choosenFromList[0]['id'])
        setChoosedItem(choosenFromList[0]['item Name']) 
        setChoosedItemStock(choosenFromList[0]['available stock'])
        setChoosedUOM(choosenFromList[0]['UOM'])
    }
    },[choosenFromList])
useEffect(()=>{
if(choosedItemId){
    console.log(choosedItemId)
    console.log(staticStore)
    let crntStaticStoreItme = staticStore.filter((value,index)=>value['id'] == choosedItemId)
    console.log(crntStaticStoreItme[0]['available stock'])
    setCrntItemStaticStock(Number(crntStaticStoreItme[0]['available stock']))
}
},[choosedItemId])
    useEffect(()=>{
        let empty = {}
        empty['id'] = ''
        empty['item'] = ''
        empty['available stock'] = ''
        empty['UOF'] = ''
        setChoosenFromList([empty])
    },[storeUpdatedSignal])

    const handleModeChange = (e) => {
        console.log(e.target.value)
       setMode(e.target.value)
    }
useEffect(()=>{
    setChoosenFromList([{id:"",item:"","available stock":"",UOM:""}])
    setMode('false')
},[props.sidePanelindex])


return (
<>{props.sidePanelindex == 0 &&<div className="row">
    <div className="col-12 topSearchBarCol">
    <div className="card mt-3 serch-card" style={{marginRight:"12px",padding:"15px"}}>
        
        
        
            <div className="row">
            <div className="col-4" style={{paddingTop:"0px"}}>
             {choosedItemStock && <div class="progress" style={{height:"30px"}}>
             <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{width:`${crntItemStaticStock != 0 ? ((choosedStock/crntItemStaticStock)*100).toFixed(2): 0}%`}}>{`${Number(choosedStock).toFixed(3)}`}</div>
             <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width:`${100-((choosedStock/crntItemStaticStock)*100).toFixed(2)}%`}}></div>
             </div>}        
            
             </div>
             <div className="col-3" style={{paddingTop:"4px"}}>
                {choosedItem && <div style={{marginLeft:"20px",display:"flex",justifyContent:"start"}}>
                 <b>{`${choosedItem} `}  {` ${Number(choosedStock).toFixed(3)} `}   {choosedUOM} </b>
                </div>}
             </div>
             
             <div className="col-5" style={{display:"flex",justifyContent:"end"}}>
        
        <select className="form-control-sm me-2" style={{border:"1px solid black"}} name="mode" id="modeSelect" onChange={handleModeChange}>
                    <option value={false}>Billing Mode</option>
                    <option value={true}>Read Only Mode</option>
                </select>
                </div>
              </div>
          
        </div>
    </div>
</div>}
<div className="row" id="homePageRow" style={{marginRight:"5px"}}>

    {props.sidePanelindex == 0 && mode == 'false'?
    (<><div className={`col-6`}><BillingCard setTextEnter={setTextEnter} mode={mode} setPostConfirmation={setPostConfirmation} choosenFromList={choosenFromList} clickedBillData={clickedBillData} setChoosedStock={setChoosedStock} setStoreUpdateSignal={setStoreUpdateSignal}/></div>
    <div className={`col-2`}><GoodsList textEnter={textEnter} setChoosenFromList={setChoosenFromList} mode={mode} storeUpdatedSignal={storeUpdatedSignal} setStaticStore={setStaticStore} itemDeletedSignal={itemDeletedSignal}/></div>
    <div className="col-4">{<RevProfCostPannel postConfirmation={postConfirmation}/>/*<RecentBillsList setClickedBillData={setClickedBillData} postConfirmation={postConfirmation}  mode={mode}/>*/}</div></>):
    <></>}
    {props.sidePanelindex == 0 && mode == 'true'?
    (<><div className={`col-8`}><BillingCard setTextEnter={setTextEnter} mode={mode} setPostConfirmation={setPostConfirmation} choosenFromList={choosenFromList} clickedBillData={clickedBillData} setChoosedStock={setChoosedStock} setStoreUpdateSignal={setStoreUpdateSignal}/></div>
    <div className="col-4"><RecentBillsList setClickedBillData={setClickedBillData} postConfirmation={postConfirmation}  mode={mode}/></div></>):
    <></>}
   {<>
   { props.sidePanelindex == 1 && <StoresCard storeUpdateSignal={storeUpdateSignal} setItemDeletedSignal={setItemDeletedSignal} setStoreUpdatedSignal={setStoreUpdatedSignal}/>}
   </>} 
   {
    props.sidePanelindex == 2 && <ProfitDestribution/>
   }
   {
    props.sidePanelindex == 3 && <Analysis/>
   }
</div></>)
}
export default MainPannel

// {/*choosedItemStock*/}