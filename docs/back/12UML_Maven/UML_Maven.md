# UML

## UML特点

UML(统一建模语言): 是一种**基于面向对象的可视化建模语言**

UML 本身定义了一套图形符号，采用这些符号(如类图)作为建模语言, 使用这些符号可以形象地描述系统的各个方面,它用于帮助软件开发人员进行思考和记录思路的结果

**UML 通过建立图形之间的各种关系(如类与类之间的关系)来描述模型关系**

UML解决编码前的设计问题，而不解决编码过程的实施问题，我们前面学习的各种编程技术是解决编码过程的实施，必须有了这些基础才能理解和运用UML

**通用性**

**可视性**

**分析设计专用语言，凌驾于所有开发语言之上**

业界的最佳实践和成功经验

## UML不能做什么

是一种描述语言，不能直接用于验证

只是一种表示方式，而不是建模方法

UML要**结合一种程序开发方法**

# Maven

## Maven能做什么事情

1. Maven翻译为“知识的积累”，“专家”，“行家”，**是一个跨平台的项目管理工具**

2. Maven主要用作**基于Java平台的项目（Maven本身也是Java编写的）的构建、依赖包管理和项目信息管理**

3. Maven能提供一种项目的配置，配置好的项目，只需要运行一条简单的命令，就能完成重复的，繁琐的构建动作

4. Maven能提供一种项目的依赖配置，配置好的项目，Maven能自动的从Maven的中央仓库中帮我们下载并管理项目依赖的jar包，并且还能自动的管理这些jar包依赖的其他jar包

5. Maven提供了一种**标准的项目目录结构**，测试命名规则等项目的最佳实践方案，统一了不同项目的学习成本

## Maven安装目录结构

- bin：包含了Maven的运行脚本文件

- boot：Maven的依赖的类加载器

- conf：非常重要，Maven的全局配置文件（settings.xml），定制Maven的运行行为

- lib：Maven依赖的jar包（里面的maven-model-builder-3.2.5.jar重要，后面再介绍）

## scope的可选值

Maven在编译,测试,运行的时候,各需要一套classpath;(比如编译的时候会有编译的classpath;测试的时候会有测试的classpath;)

scope表明该依赖的项目和三个classpath的关系

**可选值**

- compile

  > 默认,适用于所有阶段,会随着项目一起发布,在编译,测试,运行时都有效

- test

  > 测试范围,不会随项目发布
  >
  > 如junit

- provided

  > 运行时已提供
  >
  > 典型的如servlet-api.jar,打包时不需要,容器来提供

- runtime

  > 运行时有效,用于接口和实现分离
  >
  > 典型的如jdbc具体驱动实现

- import

  > (maven继承中使用,不讲)

## Maven搭建SSH项目

### 项目基础搭建

#### 开发者信息

```xml
<developers>
	<developer>
    	<id>Will</id>
        <name>Will</name>
        <email>iwiller@sina.cn</email>
        <url>www.520it.com</url>
        <timezone>8</timezone>
    </developer>
</developers>
```

#### 项目编码

```xml
<properties>
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```

#### 项目编译版本和运行环境

```xml
<build>
	<plugins>
    	<!-- 设置编译器版本 -->
        <plugin>
        	<groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.3</version>
            <configuration>
            	<source>1.7</source>
                <target>1.7</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
        
        <!-- 设置Tomcat7 -->
        <plugin>
        	<groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.2</version>
            <configuration>
            	<path>/</path>
                <port>8088</port>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 项目其他构建

#### junit

```xml
<dependencies>
	<dependency>
    	<groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

#### lombok

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.6</version>
</dependency>
```

#### MySQL驱动包

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.21</version>
</dependency>
```

#### druid连接池

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.0.15</version>
</dependency>
```

#### servlet-api

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
    <scope>provided</scope>
</dependency>
```

#### fastjson

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.9</version>
</dependency>
```

### SSH框架构建

#### 声明框架版本

与项目编码一同放在`<properties>`标签内

```xml
<properties>
	<spring.version>4.2.4.RELEASE</spring.version>
    <hibernate.version>4.3.5.Final</hibernate.version>
    <struts2.version>2.3.24</struts2.version>
</properties>
```

#### Spring

- spring-core
- spring-context
- spring-orm
- spring-aop
- spring-web
- spring-test
- aspectjweaver

```xml
<!-- spring框架 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.7</version>
</dependency>
```

#### Hibernate

- hibernate-core

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>${hibernate.version}</version>
</dependency>
```

#### Struts2

- struts2-core
- struts2-json-plugin(可以不要)
- struts2-spring-plugin

```xml
<dependency>
    <groupId>org.apache.struts</groupId>
    <artifactId>struts2-core</artifactId>
    <version>${struts2.version}</version>
    <exclusions>
        <exclusion>
            <groupId>javassit</groupId>
            <artifactId>javassist</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.struts</groupId>
    <artifactId>struts2-spring-plugin</artifactId>
    <version>${struts2.version}</version>
</dependency>
```
