import React, { Component } from "react";
import "./book.css";

export default class Book extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
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
      
      fetch(`http://localhost:8080/book/${this.state.editId}`, {
        method: "PUT", //请求方法
        headers: {
          //请求头 键值对 json
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: this.state.bookName})
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          this.loadBooksData();
        });

    } else {
      //新增      
      fetch("http://localhost:8080/book", {
        method: "POST", //请求方法
        headers: {
          //请求头 键值对 json
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=" + this.state.bookName
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          this.loadBooksData();
        });
    }
  };
  deleteBook = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:8080/book/${id}`,{
      method:"delete"
    }).then(response=>{response.json()})
    .then(data=>{
      console.log(data);
      this.loadBooksData()
    })
    
  };
  // 编辑图书
  editBook = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:8080/book/${id}`)
      .then(response => response.json())
      .then(data => {
        // 记录下要修改的id
        this.state.editId = id;
        this.setState({
          bookName: data.name
        });
      });
  };

  componentWillMount() {
    this.loadBooksData();
  }

  loadBooksData = () => {
    fetch("http://localhost:8080/book", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          books: data
        });
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
