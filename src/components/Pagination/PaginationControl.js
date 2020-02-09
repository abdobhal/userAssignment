import React from 'react'; 


const PaginationControl = (props) => {
	return (
		<button type="button" onClick={props.onClick}>{props.value}</button>
	)
}

export default PaginationControl;