const BillTableBody = (props) => {
    console.log(props.tableRows)
    const handleDeleteRowEvent = (e) => {
        
        props.setDeletedRecord(props.tableRows[Number(e.target.id)])
        props.setTableRows((prevRows)=>prevRows.filter((_,i)=>e.target.id != i))
    }
return (<>
          {props.tableRows.length > 0 && props.tableRows.map((val,i)=>{
         return(
           <tr id={i+150}>
             <td>{val.item}</td>
             <td>{val.quantity}</td>
             <td>{val.UOM}</td>
             <td>{val.total}</td>
             {props.mode == 'false' && <td><span className="badge rounded-pill bg-danger" 
             id={i} style={{cursor:"pointer"}} onClick={handleDeleteRowEvent}>X</span></td>}
            </tr>
                )
             })}
        </>)
}
export default BillTableBody