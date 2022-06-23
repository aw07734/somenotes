# Redis

## 为什么要使用redis

01

### 遇到的问题

当我们的系统引入了传统的缓存框架,比如(ehcache),因为ehcache等框架只是一个内置的缓存框架,所以前端的缓存和后台的(每一个web server)的缓存都是独立存在的,假如一个缓存中的数据发生了更新,其他缓存是不可能知道的,这样对于乐观锁,总会提示失败;

在分布式环境下,缓存不能同步;

### 解决

让缓存集中处理(大家使用同一个缓存服务),我们需要一个类似于MYSQL这样可以通过服务来提供第三方的缓存工具(缓存服务器);

流行的第三方缓存服务器:memcache/redis

## 认识redis

02

Remote DIctionary Server(Redis) 是一个由Salvatore Sanfilippo写的key-value存储系统(可以把redis想象成一个巨大的MAP)。

### 理解

redis可以看成一个Map(key-value)

在redis中,所有的key都可以理解为byte\[](String)

VALUE

> 在memcache中,value也只能是byte\[](String);------------>Map<String,String>
>
> 在redis中,value的可选类型很多,String,list,set,orderset,hash
>
> ​						Map<String,List>  Map<String,Set>  Map<String,String>  Map<String,Map<>>

### 优势

性能极高 – Redis能支持超过 10W次每秒的读写频率。

丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。

原子 – Redis的所有操作都是原子性的，同时Redis还支持对几个操作合并后的原子性执行(简单的事务)。

丰富的特性 – Redis还支持 publish/subscribe(发布/订阅), 通知, key 过期等等特性。

### 理念

redis是一个key-value的内存存储应用(使用redis主要还是把数据存在内存中,这个可以最大的使用redis的性能优势)

redis可以把数据存储在内存中，也可以持久化到磁盘上

redis不是一个适用于任何场景的存储应用

我们之前介绍数据库:关系型数据库,面向对象数据库,**NoSQL(Not only SQL)--->(KEY-VALUE)**内存数据库

redis不光可以作为一个缓存,他还是一个高效的内存数据库;可以在某些情况下,高效的替换到传统的关系型数据库,非常好的处理好高并发,高请求的场景

### 学redis

redis在线入门 ： http://try.redis.io/

redis 中文资料站： http://www.redis.cn/

### redis入门

两个最基本的redis命令

- SET KEY VALUE:把VALUE保存到redis中KEY对应的值

- GET KEY:取出redis中KEY对应的值

关于Redis中的key

在示例中,key的值为server:name:代表server的name;这是redis中key取名的一个规范

> 我们之前说到redis不光是一个缓存,还可以看成一个数据库,这种数据库和传统的关系型数据库最大的区别就在于,传统的关系型数据库,在保存数据之前,都已经有一个固定的schema;内容是保存在一个schema中不同行的数据;所有的数据都存在在一张指定的表中,所有的内容都对应表里面一个指定的行,每一个行都有固定的数据类型
>
> 所以,当我们在使用关系型数据库表现一个对象(数据结构的时候),我们能够事前通过schema规范好这个对象的结构
>
> 
>
> 但是,对于redis来说,整个数据库就是一个Map,没有任何结构可言,所有通过set等方法扔到redis中的数据,可以简单理解为就是所有的数据乱七八糟的放在一个map中
>
> 问题,在redis中,怎么存储一个User??(Map能不能通过value查询???不能,换句话说,在redis中,要能够支持查询的属性,都必须反映在key上,换句话说,redis的key的作用:1,反映数据的结构,2反映查询的内容)

## redis的基本概念

03

### 数据库

1. redis也有数据库的概念，一个数据库中可以保存一组数据

2. 各个数据库之间是相互隔离的，当然也可以在不同数据库之间复制数据

3. 一般一个应用会单独使用一个数据库

4. 每一个数据库都有一个id号，默认的数据库id为0

5. 可以使用select命令选择当前使用的数据库

   ```
   select 1;
   ```

6. redis默认为我们创建16个数据库,这个参数可以在redis配置文件中使用databases修改

### Command(命令)

1. redis中提供了非常大量的命令来方便的操作数据库中的数据,还可以使用redis中的一些特性

2. redis的命令可以简单理解为mysql的SQL命令

3. redis命令分为
   - 对数据的操作
   - 发布/订阅相关操作
   - 事务控制
   - 脚本命令
   - 连接服务器命令
   - 数据库服务相关命令

### KEY-VALUE

1. key用来标记一个数据；一般在key中需要尽量标明数据的名字(还可以使用key来表明数据所属类型)，比如用于标示一个对象的时候，可以使用user:1000来作为key，代表id为1000的用户对象

2. value表示一个key对应的值；在redis中，数据可以是任何内容，redis把所有的value都作为byte处理；所以可以用来保存任何内容

3. redis最突出的特点是提供了5种常用的数据存储类型（value的类型），深刻理解这5中数据结构和各自的使用场景，对redis的使用有很大帮助

### 存储

1. redis可以作为内存数据库，也可以把数据持久化到磁盘上；大部分情况下,都是把redis作为内存数据库;

2. 默认情况下

   ```conf
   #  after 900 sec (15 min) if at least 1 key changed
   #  after 300 sec (5 min) if at least 10 keys changed
   #  after 60 sec if at least 10000 keys changed
   save 900 1
   save 300 10
   save 60 10000
   ```

3. 数据默认存储在安装目录下.rdb文件中（可以在配置文件中dbfilename dump.rdb配置）

4. redis也可以设置为append模式，每次key的修改都会append到文件中，这种方式有可能丢失60秒的数据

   - 通过配置：appendonly yes开启

   - appendfilename "appendonly.aof"设置append文件

   - 可以设置append的模式（类似于mysql的事务文件同步机制）

     ```conf
     # appendfsync always：每次更新key及时同步到append文件；
     appendfsync everysec：每一秒同步一次key的更新；
     # appendfsync no：不管理append文件的更新，根据操作系统去定
     ```

## redis中的string

04

常见的字符串操作

- strlen key：返回key的value的值长度

- getrange key X Y：返回key对应value的一个子字符串，位置从X到Y

- append key value：给key对应的value追加值，如果key不存在，相当于set一个新的值

如果字符串的内容是数值（integer，**在redis中，数值也是string**）

- incr key：在给定key的value上增加1；（常用于id）；redis中的**incr是一个原子操作，支持并发**；如果key不存在，则相当于设置1

- incrby key value：给定key的value上增加value值；相当于key=key.value+value；**这也是一个原子操作**

- decr：在给定key的value上减少1

- decrby key value：给定key的value上减少value值

常见的使用场景

- 存储json类型对象

  ```
  incr user:id
  set user:1 {id:1,name:xiaolong}
  incr user:id
  set user:2 {id:2,name:stef}
  ```

- 作为计数器, incr count;优酷视频点赞

  ```
  incr video:100:goodcount
  decr video:100:goodcount
  ```

## redis中的list

05

redis的LIST结构(想象成java中的LinkedList)，是一个双向链表结构，可以用来存储一组数据

从这个列表的前端和后端取数据效率非常高

### 常用操作

RPUSH：在一个list最后添加一个元素

```
RPUSH firends "stef"
```

LPUSH：在一个list最前面添加一个元素

 ```
LPUSH firends "stea"
 ```

LTRIM key start stop：剪裁一个列表，剩下的内容从start到stop

```
LTRIM friends 0,3
//只剩下前4个数据；
```

LRANGE key start stop：获取列表中的一部分数据，两个参数，第一个参数代表第一个获取元素的位置（0）开始，第二个值代表截止的元素位置，如果第二个参数为-1，截止到列表尾部

```
LRANGE firends 0 -1
```

LLEN key： 返回一个列表当前长度

```
LLEND friends
```

LPOP：移除list中第一个元素，并返回这个元素

```
LPOP friends
```

RPOP：移除list中最后一个元素，并返回这个元素

```
RPOP friends
```

### 使用场景

- 可以使用redis的list模拟队列,堆栈

- 朋友圈点赞

  ```
  /*
  规定朋友圈内容的格式
  内容: user:x:post:x content来存储
  点赞: post:x:good list来存储
  */
  //创建一条微博内容
  set user:1:post:91 'hello redis';
  //点赞
  lpush post:91:good '{id:1,name:stef,img:xxx.jpg}';
  lpush post:91:good '{id:2,name:xl,img:xxx.jpg}';
  lpush post:91:good '{id:3,name:xm,img:xxx.jpg}';
  //查看有多少人点赞
  llen post:91:good;
  //查看哪些人点赞
  lrange post:91:good 0 -1;
  ```

  思考，如果用数据库实现这个功能，SQL会多复杂？？

- 回帖

  ```
  //创建一个帖子
  set user:1:post:90 'wohenshuai';
  //创建一个回帖
  set postreply:1 'nonono';
  //把回帖和帖子关联
  lpush post:90:replies 1;
  //再来一条回帖
  set postreply:2 'hehe';
  lpush post:90:replies 2;
  //查询帖子的回帖
  lrange post:90:replies 0 -1;
  get postreply:2;
  get postreply:1;
  ```

## redis中的set

SET结构和java中差不多，数据没有顺序，并且每一个值不能重复

### 常见操作

SADD：给set添加一个元素

 ```
sadd language 'java';
 ```

SREM：从set中移除一个给定元素

```
srem language 'php';
```

SISMEMBER：判断给定的一个元素是否在set中，如果存在，返回1，如果不存在，返回0

```
sismember language 'php';
```

SMEMBERS：返回指定set内所有的元素，以一个list形式返回

```
smembers language;
```

SCARD：返回set的元素个数

 ```
scard language;
 ```

SRANDMEMBER key count:返回指定set中随机的count个元素

```
srandmember friends 3; //随机推荐3个用户（典型场景，抽奖）
```

SUNION(并集)：综合多个set的内容，并返回一个list的列表，包含综合后的所有元素;

 ```
sadd language 'php';
sadd pg 'c';
sadd pg 'c++';
sadd pgs 'java';
sadd pgs 'swift';
sunion language pg pgs;
 ```

SINTER key [key ...] (交集)：获取多个key对应的set之间的交集

SINTER friends:user:1000 friends:user:1001 friends:user:1002 =>获取1000,1001,1002三个用户的共同好友列表；

SINTERSTORE destination key [key ...] ：获取多个key对应的set之间的交集，并保存为新的key值；目标也是一个set；

SINTER groupfriends friends:user:1000 friends:user:1001 friends:user:1002 =>获取三个用户共同的好友列表并保存为组好友列表；

### 使用场景

- 去重

- 抽奖

  ```
  准备一个抽奖池
  sadd luckdraws 1 2 3 4 5 6 7 8 9 10 11 12 13
  
  抽3个三等奖
  srandmember luckdraws 3
  srem luckdraws 11 1 10
  
  抽2个二等奖
  srandmember luckdraws 2
  srem luckdraws 3 7
  ```

- 做set运算（好友推荐）

  ```
  初始化好友圈
  sadd user:1:friends 'user:2' 'user:3' 'user:5'
  sadd user:2:friends 'user:1' 'user:3' 'user:6'
  sadd user:3:friends 'user:1' 'user:7' 'user:8'
  
  把user:1的好友的好友集合做并集
  user:1 user:3 user:6 user:7 user:8
  
  让这个并集和user:1的好友集合做差集(这个并集必须在前面,且结果要存储起来,sdiffstore)
  user:1 user:6 user:7 user:8
  
  从差集中去掉自己
  user:6 user:7 user:8
  
  随机选取推荐好友 
  ```

## sorted set

07

SET是一种非常方便的结构，但是数据无序

redis提供了一个sorted set，每一个添加的值都有一个对应的分数，可以通过这个分数进行排序;sorted set中的排名是按照分组升序排列

### 常用操作

ZADD：添加一个带分数的元素，也可以同时添加多个

 ```
ZADD hackers 1940 "Alan Kay"
ZADD hackers 1906 "Grace Hopper"
ZADD hackers 1969 "Linus Torvalds"

ZADD hackers 1940 "Alan Kay" 1906 "Grace Hopper" 1969 "Linus Torvalds"
 ```

ZCOUNT key min max ：给定范围分数的元素个数

```
ZCOUNT hackers 1940 1960 =>1940到1960的hacker个数
```

ZRANK key member ：查询指定元素的分数在整个列表中的排名（从0开始）

```
ZRANK hackers "Alan Kay" =>alan kay的年龄在所有hacker中的排名
```

ZRANGE key start stop：按照分数从小到大排

```
zrange hackers 0 -1 =>
1) "Grace Hopper"
2) "Alan Kay"
3) "Linus Torvalds"
```

ZREVRANGE key start stop：按照分数从大到小排; 

### 使用场景

sorted set算是redis中最有用的一种结构，非常适合用于做海量的数据的排行（比如一个巨型游戏的用户排名）；sorted set中所有的方法都建议大家去看一下；sorted set的速度非常快；

- 天梯排名

  1. 添加初始排名和分数

  2. 查询fat在当前ladder中的排名

  3. 查询ladder中的前3名

  4. jian增加了20ladder score

  ![](07.png)

- LRU淘汰最长时间没使用

  LFU淘汰最低使用频率

## hashes

08

hashes可以理解为一个map，这个map由一对一对的字段和值组成

所以，可以用hashes来保存一个对象

### 常见操作

HSET:给一个hashes添加一个field和value

```
HSET user:1000 name "John Smith"
HSET user:1000 email "john.smith@example.com"
HSET user:1000 password "s3cret"
```

HGET可以得到一个hashes中的某一个属性的值

```
HGET user:1000 name =>"John Smith"
```

HGETALL：一次性取出一个hashes中所有的field和value，使用list输出，一个field，一个value有序输出

 ```
HGETALL user:1000 =>
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"
 ```

HMSET:一次性的设置多个值(hashes multiple set)

```
HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
```

HMGET：一次性的得到多个字段值(hashes multiple get)，以列表形式返回

 ```
HMGET user:1001 name email =>
1)"Mary Jones"
2)"mjones@example.com"
 ```

HINCRBY：给hashes的一个field的value增加一个值(integer)，**这个增加操作是原子操作**

 ```
HSET user:1000 visits 10
HINCRBY user:1000 visits 1 => 11
HINCRBY user:1000 visits 10 => 21
 ```

HKEYS：得到一个key的所有fields字段，以list返回

 ```
HKEYS user:1000 =>
1)"name"
2)"password"
3)"email"
 ```

HDEL:删除hashes一个指定的filed

 ```
HDEL user:1000 visits
 ```

### 使用场景

- 使用hash来保存一个对象更直观;(建议不使用hash来保存)

- 分组

  ```
  //set user:id 1
  //set dept:id 1
  
  HMSET ids user:id 1 dept:id 1 orderbill:id 1
  HINCRBY ids user:id
  HINCRBY ids dept:id
  HMSET users user:1 "{id:1,name:xx}" user:2 "{id:2,name:xx}"
  ```


## jedis

09

```java
Jedis jedis = new Jedis("localhost", 6379);
/*
方法同jedis的命令
*/
jedis.close();
```

### mybatis-redis.jar

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-redis -->
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-redis</artifactId>
    <version>1.0.0-beta2</version>
</dependency>
```

```java
User u = new User(1L, "aw");
Jedis jedis = new Jedis("localhost", 6379);

/* 存储对象 */
jedis.set("user:1".getBytes(), SerializeUtil.serialize(u));
/* 取出对象 */
User u2 = SerializeUtil.deserialize(jedis.get("user:1").getBytes());

jedis.close();
System.out.println(u2);
```

## redis作为mybatis的缓存

10

### 导包

mybatis-redis.jar

```java
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-redis -->
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-redis</artifactId>
    <version>1.0.0-beta2</version>
</dependency>
```

### 配置redis.properties

redisConfig要用,也可以没有

```properties
host=localhost
port=6379
connectionTimeout=5000
soTimeout=5000
password=
database=0
clientName=
```

### 相关mapper.xml中配置

```xml
<cache type="org.mybatis.caches.redis.RedisCache" />
```

