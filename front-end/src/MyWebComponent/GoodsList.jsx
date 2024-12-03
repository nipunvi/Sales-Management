import { useEffect, useRef, useState } from "react"


const GoodsList = (props) => {

const [goods,setGoods] = useState()
const [filteredGoods,setFilteredGoods] = useState([])
const [nonFilteredGoods,setNonFilteredGoods] = useState([])
const [readonly,setReadOnly] = useState(false)
const [staticStore,setStaticStore] = useState()


useEffect(()=>{
   
 let myPro = new Promise((resolve,reject)=>{
    
    fetch('http://localhost:5000/items').then(res=>res.json()).then((response)=>{
        resolve(response)
    })
 })

 let myPro2 = new Promise((resolve,reject)=>{
    fetch('http://localhost:5000/readStaticStore').then(res=>res.json()).then((response)=>{
        resolve(response)
    })
 })
 myPro.then((res)=>{
    console.log(res)
    setGoods(res)
    let defaultPrecentage = []
   
   defaultPrecentage.push(res[0])
   //props.setChoosenFromList(defaultPrecentage)
 })

 myPro2.then((resp)=>{
    console.log(resp)
    props.setStaticStore(resp)
 })

},[props.storeUpdatedSignal,props.itemDeletedSignal])



useEffect(()=>{

    const selectedOnes = goods && goods.filter((val)=>{
        return(val['item Name'].toString().toLowerCase().includes((props.textEnter).toString().toLowerCase()))
    })
    const nonSelctedOnes = goods && goods.filter((val)=>{
        return(!(val['item Name'].toString().toLowerCase().includes((props.textEnter).toString().toLowerCase())))
    })
    
    setFilteredGoods(selectedOnes)
    setNonFilteredGoods(nonSelctedOnes)
        console.log(props.textEnter)
  },[props.textEnter,goods])

const handleClickEvent = (e) => {
    
    props.setChoosenFromList(goods && goods.filter((value)=>value['item Name'] == e.target.innerText)) 
    
    console.log(goods && goods.filter((value)=>value['item Name'] == e.target.innerText))
}
    return (<>{props.mode == 'false'&&
            <div className="billingCardContainer">
              
              <div className="card mt-3 billCard" style={{height:"100%"}}>
              
                <div className="card-title mt-3 mb-0" ><h4>ITEMS</h4></div>
                   <div  style={{height:"100%",overflowY: "auto",padding:"15px"}}>
                   
                    {filteredGoods && filteredGoods.map((val,i)=>{
                        return(<button className="btn btn-success mt-2" 
                        style={{
                            width:"100%",
                            boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",        
                            fontFamily:"Arial"
                        }} 
                        key={val.id} id={val.id} onClick={handleClickEvent} ><b>{val['item Name']}</b></button> )
                        
                    })}
                    {nonFilteredGoods && nonFilteredGoods.map((val,i)=>{
                        return(<button className="btn btn-primary mt-2" 
                        style={{
                            width:"100%",
                            boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",        
                            fontFamily:"Arial"
                        }} 
                        key={val.id} id={val.id} onClick={handleClickEvent} ><b>{val['item Name']}</b></button>)
                    })}
                    </div>
                   
              </div>
              </div>}
            </>)
}
export default GoodsList


/***/