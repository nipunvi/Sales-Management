const BillTableBodyReadOnly = (props) => {
    
return (<>
          {props.tableRowsReadOnly.length > 0 && props.tableRowsReadOnly.map((val,i)=>{
         return(
           <tr id={i+150}>
             <td>{val.item}</td>
             <td>{val.quantity}</td>
             <td>{val.UOM}</td>
             <td>{val.total}</td>
             <td></td>
            </tr>
                )
             })}
        </>)
}
export default BillTableBodyReadOnly