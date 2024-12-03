import PropTypes from 'prop-types'
const SideNavButtons = (props) => {

    const handleTheClickEvent = (e) => {
        console.log('cliclk')
        props.setSelectedID(e.target.id)
    }

return (<>
          <button 
          className={props.color} 
          id={props.id} 
          style={{borderRadius:"20px",border:"0px",textAlign:"left"}} 
          onClick={handleTheClickEvent}>
            {props.children}
          </button>
        </>)


}
SideNavButtons.prototype = {
    className:PropTypes.string,
    id:PropTypes.number,
    setSelectedID:PropTypes.func
}
export default SideNavButtons