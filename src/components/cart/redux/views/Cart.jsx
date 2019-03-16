import React, { Component } from "react";
import store from "../store";
import { Table, InputNumber, Button } from "element-react";
import { updataToCart, deleteToCart } from "../store/actionCreators";

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      goodsList: [],
      totalPrice: this.calcTotalPrice(),
      columns: [
        {
          label: "名字",
          prop: "name"
        },
        {
          label: "图片",
          render: row => {
            return (
              <div style={{ width: 100, height: 100 }}>
                <img style={{ width: "100%", height: "100%" }} src={row.url} />
              </div>
            );
          }
        },
        {
          label: "数量",
          render: row => {
            return (
              <InputNumber
                size="small"
                defaultValue={row.num}
                value={row.num}
                onChange={this.onChange.bind(this, row)}
                min="1"
              />
            );
          }
        },
        {
          label: "单价",
          prop: "price"
        },
        {
          label: "总价",
          render: row => {
            return <span>{row.num * row.price}</span>;
          }
        },
        {
          label: "操作",
          render: row => {
            return (
              <div>
                <Button
                  onClick={this.onDelete.bind(this, row.id)}
                  type="danger"
                >
                  删除
                </Button>
              </div>
            );
          }
        }
      ]
    };
  }
  onChange = (goods, value) => {
    console.log(goods, value);
    //生成修改的action
    const newGoods = JSON.parse(JSON.stringify(goods));
    newGoods.num = value;
    const action = updataToCart(newGoods);
    store.dispatch(action);
  };
  calcTotalPrice = () => {
    let totalPrice = 0;

    store.getState().forEach(item => {
      totalPrice += item.price * item.num;
    });
    return totalPrice;
  };
  onDelete = id => {
    //生成删除的action
    const action = deleteToCart(id);
    //触发删除操作
    store.dispatch(action);
  };
  componentWillMount() {
    //初次渲染
    this.setState({
      goodsList: store.getState()
    });
    //监听仓库中数据的变化，只要数据发生了改变，就会自动触发回调函数
    store.subscribe(() => {
      this.setState({
        goodsList: store.getState(),
        totalPrice: this.calcTotalPrice()
      });
    });

    //监听window的onbeforeunload
    window.onbeforeunload = () => {
      localStorage.setItem('CART',JSON.stringify(store.getState()));
    };
  }
  render() {
    return (
      <div>
        <Table
          style={{ width: "100%" }}
          columns={this.state.columns}
          data={this.state.goodsList}
        />
        <div>
          <p>总价: {this.state.totalPrice}</p>
          <Button type="success">总价</Button>
        </div>
      </div>
    );
  }
}
