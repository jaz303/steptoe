# steptoe

## TODO

  * Refactor to heavyweight (i.e. observable) AST
  * Function definitions
  * Function calls
  * Return
  * unary operators
  * arrays
  * dictionaries
  * <del>while loop</del>
  * break
  * foreach / for loop
  * <del>if/else statement</del>
  * <del>logical operators</del>
  * native functions
  * Closures, maybe
  * Parser

## Notes

Just thinking about this, the compiler is going to need to plant code that causes the interpreter to yield to the executor. It's either that or a yield after every step, which will be even slower than it is already.