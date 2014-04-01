exports.Statements      = Statements;
exports.Assign          = Assign;
exports.BinOp           = BinOp;
exports.Number          = NumberLiteral;
exports.Ident           = Ident;
exports.While           = While;
exports.LogicalAndOp    = LogicalAndOp;
exports.LogicalOrOp     = LogicalOrOp;
exports.If              = If;

var DEBUG = false;

var nextid = 1;
function genid(name) {
    var id = DEBUG ? name : (nextid++);
    exports[name] = id;
    return id;
}

var STATEMENTS  = genid('STATEMENTS'),
    ASSIGN      = genid('ASSIGN'),
    BIN_OP      = genid('BIN_OP'),
    NUMBER      = genid('NUMBER'),
    IDENT       = genid('IDENT'),
    WHILE       = genid('WHILE'),
    LOGICAL_AND = genid('LOGICAL_AND'),
    LOGICAL_OR  = genid('LOGICAL_OR'),
    IF          = genid('IF');

//
// Statements

function Statements(body) {
    this.type = STATEMENTS;
    this.body = body || [];
}

Statements.prototype.newFrame = function() {
    return { ix: 0 };
}

Statements.prototype.step = function(state, env, ctx) {
    if (state.ix >= this.body.length) {
        ctx.ret(null);
    } else {
        ctx.evaluate(this.body[state.ix++]);
    }
}

//
// Assign

function Assign(left, right) {
    this.left = left;
    this.right = right;
}

Assign.prototype.type = ASSIGN;

Assign.prototype.newFrame = function() {
    return { state: 0 };
}

Assign.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        ctx.evaluate(this.right);
    } else if (state.state === 1) {
        env[this.left.name] = ctx.retVal;
    } else {
        ctx.ret(null);
    }
    state.state++;
}

//
// while

function While(condition, body) {
    this.condition = condition;
    this.body = body;
}

While.prototype.type = WHILE;

While.prototype.newFrame = function() {
    return { state: 0 };
}

While.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        ctx.evaluate(this.condition);
        state.state = 1;
    } else {
        if (ctx.retVal) {
            ctx.evaluate(this.body);
            state.state = 0;
        } else {
            ctx.ret();
        }
    }
}

//
// if

function If(conditions, bodies) {
    this.conditions = conditions;
    this.bodies = bodies;
}

If.prototype.type = IF;

If.prototype.newFrame = function() {
    return { state: 0, ix: 0 };
}

If.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        if (this.conditions[state.ix]) {
            ctx.evaluate(this.conditions[state.ix]);
            state.state = 1;
        } else {
            ctx.evaluate(this.bodies[state.ix]);
            state.state = 2;
        }
    } else if (state.state === 1) {
        if (ctx.retVal) {
            ctx.evaluate(this.bodies[state.ix]);
            state.state = 2;
        } else {
            state.state = 0;
            state.ix++;
            if (state.ix >= this.conditions.length) {
                ctx.ret(null);
            }
        }
    } else {
        ctx.ret(null);
    }
}

//
//

function BinOp(left, op, right) {
    this.type = BIN_OP;
    this.left = left;
    this.op = op;
    this.right = right;
}

BinOp.prototype.type = BIN_OP;

BinOp.prototype.newFrame = function() {
    return { state: 0, left: null };
}

var OPS = {
    '+' : function(l, r) { return l + r; },
    '-' : function(l, r) { return l - r; },
    '*' : function(l, r) { return l * r; },
    '/' : function(l, r) { return l / r; },
    '<' : function(l, r) { return l < r; },
    '<=': function(l, r) { return l <= r; },
    '>' : function(l, r) { return l > r; },
    '>=': function(l, r) { return l >= r; },
    '==': function(l, r) { return l == r; }
}

BinOp.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        ctx.evaluate(this.left);
    } else if (state.state === 1) {
        state.left = ctx.retVal;
        ctx.evaluate(this.right);
    } else {
        if (this.op in OPS) {
            ctx.ret(OPS[this.op](state.left, ctx.retVal));
        } else {
            throw new Error("runtime error - unsupported op!");
        }
    }
    state.state++;
}

//
//

function LogicalAndOp(left, right) {
    this.left = left;
    this.right = right;
}

LogicalAndOp.prototype.type = LOGICAL_AND;

LogicalAndOp.prototype.newFrame = function() {
    return { state: 0 };
}

LogicalAndOp.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        ctx.evaluate(this.left);
    } else if (state.state === 1) {
        if (!ctx.retVal) {
            ctx.ret(false);
        } else {
            ctx.evaluate(this.right);
        }
    } else if (state.state === 2) {
        ctx.ret(!!ctx.retVal);
    }
    state.state++;
}

//
//

function LogicalOrOp(left, right) {
    this.left = left;
    this.right = right;
}

LogicalOrOp.prototype.type = LOGICAL_OR;

LogicalOrOp.prototype.newFrame = function() {
    return { state: 0 };
}

LogicalOrOp.prototype.step = function(state, env, ctx) {
    if (state.state === 0) {
        ctx.evaluate(this.left);
    } else if (state.state === 1) {
        if (ctx.retVal) {
            ctx.ret(true);
        } else {
            ctx.evaluate(this.right);
        }
    } else if (state.state === 2) {
        ctx.ret(!!ctx.retVal);
    }
    state.state++;
}

//
//

function NumberLiteral(value) {
    this.type = NUMBER;
    this.value = value;
}

NumberLiteral.prototype.newFrame = function() {
    return null;
}

NumberLiteral.prototype.step = function(state, env, ctx) {
    ctx.ret(this.value);
}

//
//

function Ident(name) {
    this.type = IDENT;
    this.name = name;
}

Ident.prototype.newFrame = function() {
    return null;
}

Ident.prototype.step = function(state, env, ctx) {
    ctx.ret(env[this.name]);
}
