## nodejs 实战

### 爬虫

爬虫应用我们来做一个爬取图片的图集, 我们选择 splash 作为我们练手的一个图集网站. [https://unsplash.com](https://unsplash.com)

#### 直接通过 api 获取内容

在我们搜索之后, unsplash 通过一个搜索 api, 返回的结果中带着所有图片的原信息和链接等等, 我们可以直接从 response 中获取这部分内容.

[https://unsplash.com/napi/search/photos?query=tree&xp=&per_page=20&page=5](https://unsplash.com/napi/search/photos?query=tree&xp=&per_page=20&page=5)

我们只需要在 node.js 中, 通过发送相同的请求, 从结果中拿取这部分的内容, 然后再通过请求下载即可.

```js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = 'https://unsplash.com/napi/search/photos?query=tree&xp=&per_page=20&page=5';

axios.get(url)
	.then(resp => {
    const data = resp.data;
    const result = data.results;
    
    result.forEach(element => {
        const url = element.urls.full;
        const id = element.id;
        
        axios.get(url, {
            responseType: 'arraybuffer'
        }).then(response => {
            const buffer = Buffer.from(response.data, 'binary');
            fs.writeFileSync(path.resolve(__dirname, `./unsplash/${id}.webp`), buffer);
        });
    });
}).catch(e => console.log(e));
```

我们通过 axios 发送请求, 拿到请求结果之后获取到图片的真实链接, 之后通过请求二进制数据, 通过文件系统相关方法写到硬盘上, 我们就能获取到这部分的图片数据在我们自己的服务器当中.

这是比较简单的爬虫应用, 有部分用户的页面结果, 它是直接渲染在 html 中的, 所以就必须我们自己手动提取.

#### 手动抓取 html 中的有效内容

有些时候, 我们并不能这么方便的从 api 里面直接获取内容, 这时候就需要我们使用一些第三方类库来进行处理, 例如 cheerio 就是一个能在 node.js 端能够以 jquery 方式处理 DOM 结构的一个库, 我们在 node.js 端拿到的 html string, 就可以在它的内部进行解析.

```js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://www.bigbigwork.com/tupian/shu50_1.html';

axios.get(url)
    .then(resp => {
        const $ = cheerio.load(resp.data);
        const $imgs = $('#items img');

        const result = $imgs.map((index, img) => {
            const src = img.attribs['src'];
            console.log(src);
            const id = src.split('?')[0].split('/').pop();
            return axios.get(src, {
                headers: {
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Microsoft Edge\";v=\"98\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "Referer": "https://www.bigbigwork.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                responseType: 'arraybuffer'
            }).then(resp => {
                const buffer = Buffer.from(resp.data, 'buffer');
                fs.writeFileSync(`./bigbigwork/${id}`, buffer);
            });
        });
    });
```

#### 登录、控制并发等内容

事实上, 登录之前我们也都解析过, 因为 http 协议的无状态性, 我们必须在每次请求时带入我们客户端的请求头部 cookie, 服务端通过 cookie 里面的结果, 来判断我们这次请求的合法性, 所以我们可以直接在请求中加入这个 header 即可.

前面我们讲到的这些内容在下载时, 都是一股脑的全部下载出来, 有时候需要我们主动的控制下载的并发. 我们就可以封装一个 promise queue 出来, 控制每个下载 promise 的执行时机.

### cli

cli 是一种通过命令行来交互的工具应用, 全称是 Command Line Interface. 比较常见的就是 create-react-app, vue-cli 等, 它们都能够将一段 js 脚本, 封装为可执行代码的形式, 进行一些操作.

使用 cli 之后呢, 能快速地创建一些我们业务中的样板文件, 比如快速创建一个项目内容, 配置公共的 eslint、webpack 等等配置工具.

在封装这些内容之前, 我们需要使用如下的几个库:

- commander: 命令行中的参数获取

- inquirer: 命令行的表单

- chalk: 命令行中的可变颜色效果

- clui: 命令行中的 loading 效果

- child_process: node 原生模块, 提供一些方法让我们能够执行新的命令

child_process 中有一些方法, 比如 exec 等, `exec`方法用于新建一个子进程, 然后缓存它的运行结果, 运行结束后调用回调函数.

我们这里可以使用 execSync, 他能够执行一些我们 linux 中的命令.

commander 对命令行进行了解析, 可以让我们比较方便的进行命令行参数的获取, 读取和解析.

chalk 对应的是命令行文字颜色的更改.

clui 是一个命令行中展示 loading 效果的库.

```js
const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

let config = {};
try {
    config = require(path.resolve(process.cwd(), './cli-config'));
} catch (e) { }

// @module-plugin-import
const { plugins = [] } = config;

program.arguments('<dir>')
    .description('this is cli written directory')
    .action(dir => {
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'framework',
                message: 'do you like these?',
                choices: [
                    'react',
                    'vue'
                ]
            }
        ]).then(answers => {
            const content = fs.readFileSync(path.resolve(__dirname, './index.boilerplate'), 'utf-8');
            let result = content.replace('__template', JSON.stringify(answers.framework));
    
            plugins.forEach(plugin => {
                const pluginModule = require(`@module-plugin-${plugin}`);
                result = pluginModule(content, dir);
            });
    
            fs.writeFileSync(path.resolve(process.cwd(), dir), result, 'utf-8');
        });
    });

program.parse(process.argv);
```

