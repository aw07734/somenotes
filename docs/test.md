---
food: Pizza
ls: awsl
---

{{ page.food }}

{{ page.ls }}

这是test.md的内容

## 1. Iterator 和 for...of 循环

### 1.1 可迭代协议 与 迭代器协议

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

### 1.2 为什么要有两个协议

不可能知道一个特定的对象是否实现了迭代器协议, 然而创造一个同时满足迭代器协议和可迭代协议的对象是很 容易的(就像下面的 example 所示). 这样做允许一个迭代器能被不同希望迭代的语法方式所使用. 因此, 很少只实现迭代器协议而不实现可迭代协议.

#### 自定义可迭代对象
```js
var inHomeYou = {
    /* 迭代器协议 */
    s: 0,
    next() {
        const actions = ['dy', 'wzry', 'cf', 'sj'];
        if (this.s >= actions.length) {
            return {
                done: true
            };
        }
        return {
            done: false,
            value: actions[this.s++]
        };
    },
    /* 可迭代协议 */
    [Symbol.iterator]: function () {
        return this;
    }
};

// for (let item of inHomeYou) {
//     console.log('item::', item);
// }
console.log(Array.from(inHomeYou));

```

### 1.3 都有哪些语法或特性, 使用或实现了可迭代协议与迭代器协议

`for...of` / `...` / `Array.from` 使用了迭代器协议

`[]` / `Set` / `Map` / `generators` 实现了迭代器协议
