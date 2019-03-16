export const addToCart = goods =>{
    return {
        type:'ADD_CART',
        goods
    }
}
export const updataToCart = goods =>{
    return {
        type:'UPDATA_CART',
        goods
    }
}
export const deleteToCart = id =>{
    return {
        type:'DELETE_CART',
        id
    }
}