import React from 'react';
import ProgressImg from '../images/progress_bar.gif';

class ProgressCmp extends React.Component {
  render() {
    return (
	    <div className="progressBar">
        	<img src={ProgressImg} />
    	</div>
    );
  }
}

export default ProgressCmp;