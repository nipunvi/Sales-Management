const CardLoad = () => {
    const array = [1,2,3,4]
return (<>
         {array.map((val,i)=>{
            return(<div className='card mt-3' style={{brder:"0",textAlign:"center",padding:"60px"}} >
            <div class="spinner-border text-primary" style={{marginLeft:"43%"}}></div>
            Loading.. 
       </div>)
         })
         }
        </>)
}
export default CardLoad