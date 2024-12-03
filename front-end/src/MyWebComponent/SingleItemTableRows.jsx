const SingleItemTableRows = (props) => {
    const {dataToDisplay} = props
    return (<>{dataToDisplay && <tr style={{textAlign:"center"}}>
         <td>{dataToDisplay['totalSoldQuantity']}</td>
         <td>{(Number(dataToDisplay['totalCost'])/Number(dataToDisplay['totalSoldQuantity'])).toFixed(2)}</td>
         <td>{(Number(dataToDisplay['totalRevenue'])/Number(dataToDisplay['totalSoldQuantity'])).toFixed(2)}</td>
         {/*<td>{Number(dataToDisplay['totalCost']).toFixed(2)}</td>*/}
         <td>{Number(dataToDisplay['totalRevenue']).toFixed(2)}</td>
         <td style={{backgroundColor:"lightgreen"}}>{Number(dataToDisplay['totalProfit']).toFixed(2)}</td>
         <td>{dataToDisplay['date']}</td>
           </tr>}</>)
}
export default SingleItemTableRows