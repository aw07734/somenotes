## Flutter

### Flutter 开发环境配置

- [入门: 在Windows上搭建Flutter开发环境 - Flutter中文网 (flutterchina.club)](https://flutterchina.club/setup-windows/)
- flutter doctor -v

### Dart 入门 - 变量声明

```js
var name = 'JavaScript';
var num1 = 123;
var num2 = 1.23;
```

```dart
String name = 'Dart';
int num1 = 123;
double num2 = 1.23;
num1 = num2; // error
num2 = num1; // error
num numDouble = 2.2;
num numInt = 1;
num1 = numDouble; // error
```

**const/final**

```js
const TIME_SECOND = 1000;
const userId = "123456";
```

```dart
const TIME_SECOND = 1000;
final userId = "123456";
/*
const 表达编译器的不可变, 用全大写的蛇足命名规范
final 表达运行时的不可变, 用驼峰命名规范, 多用于 function 和 class 中
*/
```

**var/dynamic**

```js
var str = 'a';
str = 'b';
str = 123;
```

```dart
var str = 'a';
str = 'b'; // ok
str = 123; // error

dynamic str = 'a';
str = 'b';
str = 123; // ok
```

### Dart 入门 - 条件判断

```js
let condition; // undifined
if (condition) { // false
    
}
```

```dart
var condition; // null
if (condition) { // true
    
}

if (condition != null) { // false
    
}
```

### Dart 入门 - 字符串拼接

```js
let minutes = 2;
console.log(`remain ${minutes} minutes`); // remain 2 minutes
```

```dart
var minutes = 2;
print('remain $minutes minutes'); // remain 2 minutes
```

### Dart 入门 - List

```js
const a = [1, 3];
a.push(4); // [1, 3, 4]
a.splice(1, 0, 2); // [1, 2, 3, 4]
a.indexOf(2); // 1
a.length; // 4
a[0]; // 1
a[a.length - 1]; // 4
```

```dart
List<int> a = [1, 3];
a.add(4); // [1, 3, 4]
a.insert(1, 2); // [1, 2, 3, 4]
a.indexOf(2); // 1
a.length; // 4
a.first; // 1
a.last; //4
```

### Dart 入门 - 函数

```js
function fn() {
    
}

const fn2 = () => {
    
}
```

```dart
bool isValid() {
    return false;
}

bool isValid2() => false;

main() {
    
}
```

### Dart 入门 - Class

```js
class Person {
    constructor({ name, age }) {
        this.name = name;
        this.age = age;
    }
    
    print() {
        console.log(`${this.name}, ${this.age}`);
    }
}
```

```dart
class Person {
    String name;
    int age;
    Person({ this.name = '', this.age = 12});
    // Person(this.name, this.age);
    
    void prints() => print('$name,$age');
}

void main() {
  Person p = Person(name: 'awsl', age: 12);
  // Person p = Person('awsl', 12);
  p.prints();
}
```

### Dart 入门 - 日志

```js
console.log('foo');
```

```dart
print('foo');
```

```dart
class Foo {
    String toString() => 'foo';
}

void main() {
    Foo f = Foo();
    print(f); // foo
}
```

### Dart 入门 - 异步

```js
const url = 'xxx';
fetch(url)
    .then(response => response.json())
    .then(data => {

});
```

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> fetchData() {
    http.get(url)
        .then(response => jsonDecode(response.body))
        .then((data) {
            // handle data
        });
}
```

### Dart 入门 - Async/Await

```js
const url = 'xxx';
async fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    // handle data
}
```

```dart
Future<String> fetchData() async {
    final url = 'xxx';
    final res = await http.get(url);
    final data = jsonDecode(res.body);
    // handle data
    return 'ok';
}
```

### Flutter 组件 vs RN 组件

```jsx
const MyCard = (props) => (
    <View>
        <Text>Card</Text>
        <Button
            title="press"
            onPress={() => props.onPress()}
        />
    </View>
);

<MyCard onPress={() => console.log('pressed!')} />
```

```dart
class MyCard extends StatelessWidget {
    MyCard({ @required this.onPress });
    
    final Function onPress;
    
    @override
    Widget build() {
        return Card(
            child: Column(
                children: <Widget>[
                    Text('Card'),
                    FlatButton(
                        child: Text('Press'),
                        onPressed: this.onPress
                    )
                ]
            )
        );
    }
}

MyCard(onPress: () {})
```

### Flutter package

[https://pub/dev/](https://pub/dev/)

pubspec.yaml - dependencies

flutter pub get

import "package:xxx.dart"

### 详细代码可参见 仓库 folder 37

flutter sdk 版本升级到 2.0 或者更高的版本后，运行之前的代码会报错，比如：

```
Error: Cannot run with sound null safety, because the following dependencies
don't support null safety:

 - package:flutter_swiper
 - package:flutter_page_indicator
 - package:transformer_page_view

For solutions, see https://dart.dev/go/unsound-null-safety


FAILURE: Build failed with an exception.
```

上面的问题是，这些包不支持 safety模式。我们可以在运行的时候添加--no-sound-null-safety。打开Android Studio，然后依次选择【Run】 -->【 Edit Configurations】 --> 【Add Additional Run args 】–> 【–no-sound-null-safety】