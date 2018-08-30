import axios from 'axios'
//配置默认请求路径
axios.defaults.baseURL = "http://localhost:8181";

//拦截器，把数据统一处理成res.data
axios.interceptors.response.use((res) => {
  return res.data;
})

//获取首页轮播图数据
export let getBanner1 = () => {
  return axios.get('/sliders1');
}

//获取热门图书数据
export let getHotBooks = () => {
  return axios.get('/hot');
}

//获取所有图书
export let getAllBooks = () => {
  return axios.get('/book');
}

//获取某一本图书
export let findOneBook = (id) => {
  return axios.get(`/book?id=${id}`);
}

//删除图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`);
};

//修改书本
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};

//增加一本书
export let addBook = (data) => {
  return axios.post('/book', data);
};

//获取首页全部数据
export let getAll = () => {
  return axios.all([getBanner1(), getHotBooks()]);
}

//获取分页数据
export let pagination = (offset) => {
  return axios.get(`/page?offset=${offset}`)
}

