const myModal = () => {
return (<>
 <button className="btn btn-sm btn-primary" type="button" data-bs-toggle="modal" bata-bs-target="#myModal">
              Edit
            </button>
            <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content"> 
                        <div className="modal-header">
                            <h4 className="modal-title">Modal Heading</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Modal body..
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                    </div> </>)
}
export default myModal