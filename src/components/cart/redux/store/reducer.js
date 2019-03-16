/**
 * preState 就代表之前的数据
 * 
 * action 进行的操作 
 *  新增商品
 *  修改商品
 *  删除商品
 */

 const state = JSON.parse(localStorage.getItem('CART')||'[]')
export default (preState = state, action) => {
    console.log("----reducer------", action)
    switch (action.type) {
        case "ADD_CART":
            //1.把preState，进行深拷贝一次 
            const newArray = JSON.parse(JSON.stringify(preState))
            const goods = newArray.find(item => item.id === action.goods.id)
            if (goods) {
                goods.num += action.goods.num
            } else {
                newArray.push(action.goods)
            }

            return newArray
        case "UPDATA_CART":
            //1.把preState，进行深拷贝一次 
            const updataArray = JSON.parse(JSON.stringify(preState))
            const updataGoods = updataArray.find(item => item.id === action.goods.id)

            //2.把仓库中的数量修改成最新的
            updataGoods.num = action.goods.num

            return updataArray
        case "DELETE_CART":
            //1.把preState，进行深拷贝一次 
            const deleteArray = JSON.parse(JSON.stringify(preState))
            const deleteIndex = deleteArray.findIndex(item=>{
                item.id === action.id 
            })
            deleteArray.splice(deleteIndex,1)
            return deleteArray
        default:
            return preState
    }

}