import { useEffect, useState } from "react"
import ProfitDestributionSelect from "./ProfitDestributionSelect"
import ProfDestributeDataSection from "./ProfDestributeDataSection"
import ProfDestriItemCards from "./ProfDestriItemCards"

const ProfitDestribution = () => {
    const [month,setMonth] = useState()
    const [theBillDat,setBillData] = useState([])
    const [thDataArray,setTheDataArray] = useState()
    const [selectOption,setSelectOption] = useState()
    const [dataToPresent,setDataToPresent] = useState()
    const [items,setItems] = useState()
    const [revForOthers,setRevForOthers] = useState()

    useEffect(()=>{
        fetch('http://localhost:5000/readBillData').then(res=>res.json()).then((res)=>{
            setBillData(JSON.parse(res))
        })
      
        fetch('http://localhost:5000/items').then(res=>res.json()).then((resp)=>{
            setItems(resp)
            console.log(resp)
        })
         
    },[])

    useEffect(()=>{
        if(selectOption){
            let months =['','january','February','March','April','May','June','July','August','September','Octomber','November','December']
            setMonth(`${months[Number(selectOption.toString().substring(4,6))]} - ${selectOption.toString().substring(0,4)}` )      
        }
    },[selectOption])

    useEffect(()=>{
        if(theBillDat.length > 0){
            let uniqueObj = {}
            theBillDat.forEach((value,index)=>{
                uniqueObj[`${value['refId'].substring(0,6)}`] = {}  
            })
            setTheDataArray(uniqueObj)
            let dynamicObject = {}
            theBillDat.forEach((val,ind)=>{
                if(selectOption == val['refId'].substring(0,6)){
                      val['rows'].forEach((v,i)=>{
                        dynamicObject[v.id] = {itemKey:v.id,cost:0,revenue:0,quantity:0}
                      })
                } 
            })
           
            theBillDat.forEach((val,ind)=>{
                if(selectOption == val['refId'].substring(0,6)){
                    for(let key in dynamicObject){
                        let keyArray = val['rows'].filter((v,i)=>key == v['id'])
                        keyArray.forEach((valueHere,_)=>{
                            dynamicObject[key]['cost'] += Number(valueHere['totalCost'])
                            dynamicObject[key]['revenue'] += Number(valueHere['total'].substring(3,valueHere['total'].length))
                            dynamicObject[key]['quantity'] += Number(valueHere['quantity'])
                        })
                       
                    }
                } 
            })
            
            console.log(dynamicObject)
            let showingDataArray = []
            for(let value in dynamicObject){
                showingDataArray.push(dynamicObject[value])
            }
            console.log(showingDataArray)
            setDataToPresent(showingDataArray)
        }
    },[theBillDat,selectOption])

    useEffect(()=>{
        console.log(dataToPresent)
    },[dataToPresent])
    return (<>
             
             <div className="card mt-3" style={{height:"30vh",marginLeft:"12px",width:"98%", boxShadow:"1px 0px 20px rgba(0, 0, 0, 0.308)",textAlign:"left"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8" > 
                          <h4>{month} </h4>
                        </div>
                        <div className="col-4">
                          {thDataArray && <ProfitDestributionSelect setSelectOption={setSelectOption} dataArray={Object.keys(thDataArray)} />}
                        </div>
                    </div>  
                    {dataToPresent && <ProfDestributeDataSection setRevForOthers={setRevForOthers} dataToPresent={dataToPresent}/>}
                  
                </div>
            </div>
            <div className="row row-cols-3 p-0" style={{marginLeft:"1px"}}  >
                        
                   {dataToPresent && dataToPresent.map((value,index)=>{
                    return(<ProfDestriItemCards items={items} thisValueData={value} revForOthers={revForOthers}/>)
                   })}
                    </div>
            
            </>)
}
export default ProfitDestribution