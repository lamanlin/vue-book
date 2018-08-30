let getters = {
  count: (state) => state.cartList.reduce((prev, next) => prev + next.bookCount, 0),
  sum: (state) => {
    let total = 0;
    state.cartList.forEach((item) => {
      total += parseInt(item.bookPrice * item.bookCount);
    });
    return total;
  }
};
export default getters;
