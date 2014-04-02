lib/grammar.js: lib/grammar.peg
	node node_modules/.bin/pegjs $< > $@
