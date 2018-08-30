let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取轮播图 /sliders
let sliders1 = require('./sliders1');

function read(cb) { //用来读取数据的
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cb([]); // 如果有错误 或者文件没长度 就是空数组
    } else {
      cb(JSON.parse(data)); // 将读出来的内容转化成对象
    }
  })
}

function write(data, cb) { // 写入内容
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}

function readCart(cb) { //用来读取购物车数据的
  fs.readFile('./cart.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cb([]); // 如果有错误 或者文件没长度 就是空数组
    } else {
      cb(JSON.parse(data)); // 将读出来的内容转化成对象
    }
  })
}

function writeCart(data, cb) { // 写入内容
  fs.writeFile('./cart.json', JSON.stringify(data), cb)
}

let pageNum = 6; //每一页显示的书本数目

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.end(); /*让options请求快速返回*/

  let {
    pathname,
    query
  } = url.parse(req.url, true); // true把query转化成对象
  if (pathname === '/sliders1') {
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    return res.end(JSON.stringify(sliders1));
  }
  if (pathname === '/hot') {
    read(function (books) {
      let hot = books.slice(0, 6);
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify(hot));
    });
    return
  }
  if (pathname === '/book') { // 对书的增删改查
    let id = parseInt(query.id); //取出的字符串
    switch (req.method) { // ?id=1
      case 'GET':
        if (!isNaN(id)) { // 查询一个
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if (!book) book = {}; // 如果没找到则是undefined
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book));
          });
        } else { // 获取所有图书
          read(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books));
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', chunk => {
          str += chunk
        });
        req.on('end', () => {
          let book = JSON.parse(str);
          read(function (books) { // 添加id
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
            books.push(book); //将数据放到books中 ，books在内存中
            write(books, function () {
              res.end(JSON.stringify(book));
            });
          });
        });
        break;
      case 'PUT':
        if (id) { // 获取了当前要修改的id
          let str = '';
          req.on('data', chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str); //book要改成什么样子
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) { // 找到id相同的那一本书
                  return book
                }
                return item; // 其他书正常返回即可
              });
              write(books, function () { // 将数据写回json中
                res.end(JSON.stringify(book));
              })
            });
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id);
          write(books, function () {
            res.end(JSON.stringify({})); // 删除返回空对象
          });
        });
        break
    }
    return
  }
  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      let result = books.slice(offset, offset + pageNum); //按照最后添加的书开始显示
      let hasMore = true; //默认数据没有显示完
      if (books.length <= offset + pageNum) { //如果显示的数目大于长度，就没有了
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify({
        hasMore,
        books: result
      }))
    })
    return;
  }
  
}).listen(8181);
