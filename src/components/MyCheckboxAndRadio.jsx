import React, { Component } from "react";

export default class MyCheckboxAndRadio extends Component {
  constructor() {
    super();

    this.state = {
      values: ["apple", "orange", "banana", "mangosteen"],
      svalues: ["orange", "banana"],
      name4Radio:'gender',
      values4Radio:['male','female','unkown'],
      svalues4Radio:['female']
    };
  }

  handler = e => {
    console.log(e.target.value);
    if (this.state.svalues.includes(e.target.value)) {
      //之前包含有,干掉
      
      const newArray = this.state.svalues.filter(
        item => item != e.target.value
      );
      this.setState({
        svalues:newArray
    })
    } else {
      const newArray = [...this.state.svalues, e.target.value];
      this.setState({
        svalues: newArray
      });
    }
  };
  handleRadio = event => {
    // console.log(event.target.value)
    this.setState({
      svalues4Radio: [event.target.value]
    });
  };
  submit = () => {
    console.log(this.state.svalues);
    console.log(this.state.svalues4Radio)
  };
  render() {
    const { values, svalues, name,name4Radio,values4Radio,svalues4Radio } = this.state;
    return (
      <div>
        爱吃的水果
        {values.map((item, index) => {
          return (
            <label key={index}>
              <input
                type="checkbox"
                onChange={this.handler}
                value={item}
                checked={svalues.includes(item)}
                name={name}
              />
              {item}
            </label>
          );
        })}
        <br />
        性别:
        {values4Radio.map((item,index)=>{
          return (
          <label key={index}>
            <input type="radio" onChange={this.handleRadio} value={item}
                  name={name4Radio} checked={svalues4Radio.includes(item)}/>{item}
          </label>
          )
        })}

        <br />
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}
