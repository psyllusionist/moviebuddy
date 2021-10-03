import React from 'react';

const Scroll = (props) => {
	return (
		<div style={{overflowY: 'scroll', border: '1px solid rgba(0,0,0,0.2)', height: '70vh'}}>
			{props.children}
		</div>
	)
}

export default Scroll;