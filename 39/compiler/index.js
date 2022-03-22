/**
 * 分词, 处理每个字符内容
 * @param {code} str 
 * @returns 
 */
function generateToken(str) {
    let current = 0;
    let tokens = [];
    while (current < str.length) {
        let char = str[current];
        if (char === "(") {
            tokens.push({
                type: "paren",
                value: "("
            });
            current++;
            continue;
        }
        if (char === ")") {
            tokens.push({
                type: "paren",
                value: ")"
            });
            current++;
            continue;
        }
        if (/\s/.test(char)) {
            current++;
            continue;
        }
        if (/[0-9]/.test(char)) {
            let numValue = "";
            while(/[0-9]/.test(char)) {
                numValue = numValue.concat(char);
                char = str[++current];
            }
            tokens.push({
                type: "number",
                value: numValue
            });
            continue;
        }
        if (/[a-zA-Z]/.test(char)) {
            let varValue = "";
            while(/[a-zA-Z]/.test(char)) {
                varValue = varValue.concat(char);
                char = str[++current];
            }
            tokens.push({
                type: "name",
                value: varValue
            });
            continue;
        }
        throw new TypeError("未能识别的字符");
    }
    return tokens;
}

/**
 * AST 生成
 * @param {*} tokens 
 * @returns 
 */
function generateAST(tokens) {
    let current = 0;

    let ast = {
        type: "Program",
        body: []
    };

    function walk() {
        let token = tokens[current];
        if (token.type === "number") {
            current++;
            return {
                type: "NumberLiteral",
                value: token.value
            };
        }
        if (token.type === "paren" && token.value === "(") {
            token = tokens[++current];
            let node = {
                type: "CallExpression",
                name: token.value,
                params: []
            };
            token = tokens[++current];
            while (
                (token.type !== "paren") || 
                (token.type === "paren" && token.value !== ")")) {
                    node.params.push(walk());
                    token = tokens[current];
            }
            current++;
            return node;
        }
        throw new TypeError(token.type);
    }

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}

/**
 * AST 转化: babel 插件需要我们处理的部分
 * @param {*} ast 
 * @returns 
 */
function transformer(ast) {
    let newAst = {
        type: "Program",
        body: []
    };

    ast._context = newAst.body;

    DFS(ast, {
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: "NumberLiteral",
                    value: node.value
                });
            }
        },
        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: node.name
                    },
                    arguments: []
                };

                node._context = expression.arguments;
                if (parent.type !== "CallExpression") {
                    expression = {
                        type: "ExpressionStatement",
                        expression: expression
                    };
                }
                parent._context.push(expression);
            }
        }
    });

    return newAst;
}

/**
 * AST 遍历
 * @param {*} ast 
 * @param {*} visitor 
 * @returns 
 */
function DFS(ast, visitor) {
    function traverseNode(node, parent) {
        let methods = visitor[node.type];
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }
        switch(node.type) {
            case "Program": {
                traverseArray(node.body, node);
                break;
            }
            case "CallExpression": {
                traverseArray(node.params, node);
                break;
            }
            case "NumberLiteral": {
                break;
            }
        }
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    function traverseArray(children, parent) {
        children.forEach(child => traverseNode(child, parent));
    }

    return traverseNode(ast, null);
}

/**
 * AST -> code 生成代码过程
 * @param {*} ast 
 * @returns 
 */
function generate(ast) {
    switch (ast.type) {
        case "Program": {
            return ast.body.map(subAst => generate(subAst)).join("\n");
        }
        case "ExpressionStatement": {
            return generate(ast.expression) + ";";
        }
        case "CallExpression": {
            return generate(ast.callee) + "(" + ast.arguments.map(arg => generate(arg)).join(", ") + ")";
        }
        case "Identifier": {
            return ast.name;
        }
        case "NumberLiteral": {
            return ast.value;
        }
    }
}

function parser(input) {
    const tokens = generateToken(input);
    const ast = generateAST(tokens);

    const newAst = transformer(ast);
    const code = generate(newAst);
    return code;
}

module.exports = parser;