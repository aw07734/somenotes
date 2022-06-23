### Gradle基础

- Gradle的基础概念
  - Distribution
  - Wrapper
  - GradleUserHome
  - Daemon
- Groovy基础
  - 动态调用与MOP
  - 闭包

### Gradle构建

- Gradle的核心模型
  - Project
  - Task
  - Lifecycle与Hook

### 插件编写

- 构建逻辑的复用
- 简单插件
- script插件
- buildSrc

```groovy
task('first') {
    doLast {
        println ("Hello,i`m first task.")
    }
}

class MyAwesomePlugin implements Plugin<Project> {
    @Override
    void apply(Project project) {
        (0..10).each {i ->
            project.task('task' + i) {
                if (i % 2 == 0) {
                    dependsOn('first')
                }

                def capturedI = i
                doLast {
                    println "Executing task ${capturedI}"
                }
            }
        }
    }
}

apply plugin: MyAwesomePlugin
```

