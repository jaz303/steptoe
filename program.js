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
        '/',
        new ast.Number(30)
    )
));

stmts.body.push(new ast.Assign(
    new ast.Ident('i'),
    new ast.Number(0)
));

stmts.body.push(new ast.While(
    new ast.BinOp(
        new ast.Ident('i'),
        '<',
        new ast.Number(10)
    ),
    new ast.Statements([
        new ast.Assign(
            new ast.Ident('i'),
            new ast.BinOp(
                new ast.Ident('i'),
                '+',
                new ast.Number(1)
            )
        )
    ])
));

stmts.body.push(new ast.If([
    new ast.BinOp(
        new ast.Ident('i'),
        '<',
        new ast.Number(100)
    ),
    new ast.BinOp(
        new ast.Ident('i'),
        '<',
        new ast.Number(10)
    ),
    new ast.BinOp(
        new ast.Ident('i'),
        '>',
        new ast.Number(20)
    ),
    new ast.BinOp(
        new ast.Ident('i'),
        '<',
        new ast.Number(50)
    ),
], [
    new ast.Assign(new ast.Ident('z'), new ast.Number(1)),
    new ast.Assign(new ast.Ident('z'), new ast.Number(2)),
    new ast.Assign(new ast.Ident('z'), new ast.Number(3)),
    new ast.Assign(new ast.Ident('z'), new ast.Number(4))
]));

module.exports = stmts;