import * as Types from './mutations-type'
const mutations = {
  [Types.ADD_CART](state, book) {
    //添加一本书，如果有这本书则累加数量，没有则新增
    let product = state.cartList.find(item => item.bookId === book.bookId);
    if (product) {
      product.bookCount += 1;
      state.cartList = [...state.cartList];
    } else {
      book.bookCount = 1;
      state.cartList = [...state.cartList, book];
    }
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
 
};
export default mutations;
