var next = 1;
function iota() { return next++; }

module.exports = {
	ARRAY_LITERAL		: iota(),
	ASSIGN_EXP 			: iota(),
	BIN_OP_EXP			: iota(),
	CALL_EXP			: iota(),
	COMPUTED_MEMBER_EXP	: iota(),
	FUNCTION_DEF		: iota(),
	FUNCTION_INSTANCE	: iota(),
	FUNCTIONS 			: iota(),
	IDENT				: iota(),
	IF_STMT				: iota(),
	LOGICAL_AND_EXP		: iota(),
	LOGICAL_OR_EXP		: iota(),
	OBJECT_LITERAL		: iota(),
	PRIMITIVE_LITERAL	: iota(),
	RETURN_STMT			: iota(),
	STATEMENTS			: iota(),
	STATIC_MEMBER_EXP	: iota(),
	UNARY_OP_EXP 		: iota(),
	VARIABLES			: iota(),
	WHILE_STMT			: iota()
};