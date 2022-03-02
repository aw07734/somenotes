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

#### 手动抓取 html 中的有效内容

#### 登录、控制并发等内容

### cli

