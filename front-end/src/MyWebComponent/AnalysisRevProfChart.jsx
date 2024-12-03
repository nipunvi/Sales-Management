import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  
const AnalysisRevProfChart= (props) => {
    const {setRev,setProf} = props
    const [data,setData] =  useState([])
    const [uniqueObj,setUniquObj] = useState()
    const [dataPicker,setDataPicker] = useState()
    const [billsData,setBillsData] = useState()
    
    useEffect(()=>{
        fetch('http://localhost:5000/readBillData').then(res=>res.json()).then((res)=>{
            let billData = JSON.parse(res) 
            if(billData.length > 0){
            setBillsData(billData)
             console.log(billData)
             let theUniqueObj = {}
             billData.forEach((value,index)=>{
                theUniqueObj[`${value.refId.substring(0,6)}`] = []
             })

             Object.keys(theUniqueObj).forEach((val,ind)=>{
                billData.forEach((va,i)=>{
                    if(val == va.refId.substring(0,6)){
                        theUniqueObj[val].push(va)
                    }
                })
             })
             setUniquObj(theUniqueObj)
             let uniqueObjKeyArray = Object.keys(theUniqueObj)
             setDataPicker(uniqueObjKeyArray[Number(uniqueObjKeyArray.length-1)])
            }
        })
    
    },[])

    useEffect(()=>{
        if(billsData){
            let revenue = 0
            let profit = 0
            billsData.forEach((value,index)=>{
                profit += Number(value['totalProfit'])
                value.rows.forEach((val,i)=>{
                    revenue += Number(val['total'].substring(3,val['total'].length))
                })
            })
            setRev(revenue)
            setProf(profit)
        }
    },[billsData])

    //    { name: "1", uv: 300, pv: 456 },
    useEffect(()=>{
        if(uniqueObj){
        let arrayToPush = []
       
        uniqueObj &&  uniqueObj[dataPicker].forEach((value,index)=>{
            let dataArraySetter = {}
            dataArraySetter['name'] = `${value['refId'].substring(7,9)}`
            let totalRev = 0
            value.rows.forEach((val,ind)=>{
                totalRev += Number(val['total'].substring(3,val['total'].length))
            })
            dataArraySetter['Revenue'] = Number(totalRev)
            dataArraySetter['Profit'] =Number(value['totalProfit'])
            arrayToPush.push(dataArraySetter)
        })

        let uniqueOne = {}
        arrayToPush.forEach((value,index)=>{
            uniqueOne[`${value['name']}`] = {name:"",Revenue:0,Profit:0}
        })
        console.log(uniqueOne)
        let theData = []
        Object.keys(uniqueOne).forEach((val,ind)=>{
            let thisValRev = 0
            let thisValProf = 0
            arrayToPush.forEach((va,i)=>{
                if(va['name'] == val){
                    thisValRev += Number(va['Revenue'])
                    thisValProf += Number(va['Profit'])
                }
            })
            uniqueOne[val]['name'] = val.padStart(0,2)
            uniqueOne[val]['Revenue'] = thisValRev
            uniqueOne[val]['Profit'] = thisValProf
            theData.push(uniqueOne[val])
        })
        
        console.log(theData)
      setData(theData.sort((a,b)=>Number(a.name) - Number(b.name)))
    }
    },[dataPicker])

    const handleMonthSelectChange = (e) => {
         setDataPicker(e.target.value)
    }
      return (<>
        <div className="row">
            <div className="col-12" style={{display:"flex",justifyContent:"end"}}>
                <select name="months" id="months" className="form-control-sm" style={{width:"200px"}} onChange={handleMonthSelectChange}>
                    {uniqueObj && Object.keys(uniqueObj).toReversed().map((value,i)=>{
                        return(<option value={`${value}`}>{`${value.toString().substring(0,4)}/${value.toString().substring(4,6)}`}</option>)
                    })}
                </select>
            </div>
        </div>
         <div className="row">
         <div className="col-12">
        {data.length > 0 && <BarChart
          width={1000}
          height={420}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="Profit" fill="green" />
          <Bar dataKey="Revenue" fill="brown" />
        </BarChart>} 
         </div>
     </div>
     </>
      );
}

export default AnalysisRevProfChart




 



