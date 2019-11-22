import React from 'react';

class TextFieldCmp extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
  	let errormsg;
  	if(this.props.error !== '') errormsg = <div className="errormsg">{this.props.error}</div>;
    return (
        <div className="fields-Container">
            <label for={this.props.field}>{this.props.label}</label>
            <input
              onChange={this.props.onChange}
              value = {this.props.value}
              type={this.props.type}
              name={this.props.field}
              required />
            {errormsg}
        </div>
    );
  }
}

export default TextFieldCmp;