module.exports = function({types: t}) {
    return {
        visitor: {
            Identifier(path, state) {
                const name = path.node.name;
                console.log(state.opts);
                if (state.opts[name]) {
                    path.node.name = state.opts[name];
                }
            },
            MemberExpression(path, state) {
                if (path.get("object").matchesPattern("process.env")) {
                    const key = path.toComputedKey();
                    if (t.isStringLiteral(key)) {
                        path.replaceWith(t.valueToNode(process.env[key.value]));
                    }
                }
            }
        }
    };
}