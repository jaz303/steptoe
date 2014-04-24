lib/parser.js: lib/grammar.peg
	node node_modules/.bin/pegjs --allowed-start-rules Function $< $@
