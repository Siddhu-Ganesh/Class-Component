import React from 'react';

class Sample extends React.Component {
    constructor(props){
        super(props);
        this.state ={change: true};
        }
        render(){
          return (
          <div>
            <button onClick={()=>{this.setState({change: !this.state.change});}}>
              Click Here
              
            </button>
            {this.state.change ? (<h1>THis is First Click</h1>):(<h2>This is Second Click</h2>)}
          </div>
          );
        }
}
export default Sample;