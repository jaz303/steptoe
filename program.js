var ast = require('./ast_nodes');

var stmts = new ast.Statements();

stmts.body.push(new ast.Assign(
    new ast.Ident('a'),
    new ast.BinOp(
        new ast.Number(100),
        '+',
        new ast.Number(125)
    )
));

stmts.body.push(new ast.Assign(
    new ast.Ident('b'),
    new ast.BinOp(
        new ast.Number(50),
        '-',
        new ast.Number(30)
    )
));

module.exports = stmts;