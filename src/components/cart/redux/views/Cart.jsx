import React, { Component } from "react";
import store from "../store";
import { Table,InputNumber,Button } from "element-react";

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      goodsList: [],
      columns: [
        {
          label: "名字",
          prop: "name"
        },
        {
          label: "图片",
          render: (row)=> {
            return (
              <div style={{ width: "100%", height: "100%" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={row.img_url}
                />
              </div>
            );
          }
        },
        {
          label: "数量",
          render:row => {
            return <InputNumber size="small" defaultValue={row.num} onChange={this.onChange.bind(this)} min="1"></InputNumber>
        }
        },
        {
          label: "单价",
          prop: "price"
        },
        {
            label: "总价",
            render:row => {
                return <span>{row.num * row.price}</span>
            }
        },
        {
            label:'操作',
            render:row=>{
                return <div>
                    <Button type="danger">删除</Button>
                </div>
            }
        }
      ]
    };
  }
  onChange = (value) => {
    console.log(value)
}
  componentWillMount() {
    //初次渲染
    this.setState({
      goodsList: store.getState()
    });
    store.subscribe(() => {
      this.setState({
        goodsList: store.getState()
      });
    });
  }
  render() {
    return (
      <div>
        <Table
          style={{ width: "100%" }}
          columns={this.state.columns}
          data={this.state.goodsList}
        />
      </div>
    );
  }
}
