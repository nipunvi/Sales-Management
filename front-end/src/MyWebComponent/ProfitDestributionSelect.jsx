import { useEffect, useState } from "react"

const ProfitDestributionSelect = (props) => {
      const {dataArray,setSelectOption} = props
      const [option,setOption] = useState(0)
      console.log(dataArray)

      useEffect(()=>{
        dataArray && setSelectOption(dataArray.toReversed()[option])
      },[dataArray,option])

      const handletheChangeOfSelect = (e) => {
        setOption(e.target.selectedIndex)
      }

    return (<> {dataArray.length > 0 && 
              <select name="" id="" className="form-control-sm" style={{width:"100%"}} onChange={handletheChangeOfSelect}>
               {dataArray.toReversed().map((value,index)=>{
               return(<option value={`${value}`}>{`${value.substring(0,4)}/${value.substring(4,6)}`}</option>)}) }
              </select>}
              </>)
}
export default ProfitDestributionSelect