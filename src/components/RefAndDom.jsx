import React, { Component } from "react";

class RefAndDom extends Component{
    constructor(){
        super()

        this.inputRef = React.createRef()
    }
    render(){
        console.log("---render---")
        return <div>
            {/* 1.0 让input自动获取焦点 */}
            {/* <input ref="boxRef"  type="text"/> */}
            <input ref={this.inputRef} type="text" name="text"/>
        </div>
    }

    // 初次渲染完毕
    componentDidMount(){
        console.log("---componentDidMount----")
        // document.getElementById("box").focus()
        // console.log(this.refs.boxRef)

        // this.refs.boxRef.focus()

        // console.log(this.inputRef.current)
        this.inputRef.current.focus()
    }
}

export default RefAndDom