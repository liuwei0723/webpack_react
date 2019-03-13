import React, { Component } from "react";

export default class ConditionalAndFor extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      name: "张三",
      persons: [
        { id: 1, name: "张无忌", skill: "乾坤大挪移" },
        { id: 2, name: "张三丰", skill: "太极" },
        { id: 3, name: "周芷若", skill: "九阴白骨抓" },
        { id: 4, name: "梅超风", skill: "九阴白骨抓" }
      ]
    };
  }

  render() {
    return (
      <div id="test">
        <div>我是一个结果</div>
      

      <ul>
          {this.state.persons.map(item =>{
              return <li key={item.id}>
                  {item.name}----{item.skill}
              </li>
          })}
      </ul>
      </div>
    );
  }
}
