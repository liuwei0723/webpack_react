import React, { Component } from "react";
import "./book.css";

export default class Book extends Component {
  constructor() {
    super();

    this.state = {
      books: [
        { id: 1001, name: "西游记" },
        { id: 1002, name: "红楼梦" },
        { id: 1003, name: "水浒传" },
        { id: 1004, name: "三国演义" }
      ],
      bookName: "",
      editId: null
    };
  }
  handle = event => {
    this.setState({
      bookName: event.target.value
    });
  };
  addOrEdit = () => {
    if (this.state.bookName.trim().length === 0) return;

    const ids = this.state.books.map(item => item.id);
    const maxId = Math.max(...ids) + 1;
    //   const maxId = Math.max.apply(null,ids) + 1

    if (this.state.editId) {
      //修改
      this.state.books.some(item => {
        if (item.id === this.state.editId) {
          item.name = this.state.bookName;
          return true;
        }
      });
      this.setState(
        {
          books: this.state.books
        },
        () => {
          this.state.editId = null;
          this.setState({
            bookName: ""
          });
        }
      );
      console.log(this.state.books);
    } else {
      //新增
      const newArray = [
        ...this.state.books,
        { id: maxId, name: this.state.bookName }
      ];
      this.setState(
        {
          books: newArray
        },
        () => {
          this.state.editId = null;
          this.setState({
            bookName: ""
          });
        }
      );
    }
  };
  deleteBook = (event, id) => {
    event.preventDefault();

    const newArray = this.state.books.filter(item => item.id != id);

    this.setState({
      books: newArray
    });
  };
  editBook = (event, id) => {
    event.preventDefault();
    // 记录下要修改的id
    this.state.editId = id;
    this.setState({
      bookName: this.state.books.find(item => item.id == id).name
    });
  };
  render() {
    const { bookName, books } = this.state;
    return (
      <div>
        <hr />
        书名: <input onChange={this.handle} value={bookName} type="text" />{" "}
        &nbsp;&nbsp;
        <input type="button" onClick={this.addOrEdit} value="新增&修改" />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>书名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <a href="" onClick={() => this.deleteBook(event, item.id)}>
                      删除
                    </a>
                    |
                    <a href="" onClick={() => this.editBook(event, item.id)}>
                      编辑
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
