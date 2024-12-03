const BillTableHeader = () => {

    const headerItems = ["Item Name","Amount","UMO","Price(Rs)","*"]

return (
      <>
     <tr>
        {headerItems.map(val=><td ><b>{val}</b></td>)}
     </tr>
     </>)
}
export default BillTableHeader