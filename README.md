# README.md

## about

A pure js text adventure game framework

## project structure

-   docs/
    -   esdoc generated documentation
-   examples/
    -   mini games to test out the framework
-   src/
    -   main framework source code directory

## a little history

This mini framework attempts to provide (and figure out how complex can be) an OO solution for text adventure games, which originally were written using BASIC language, labels and go to statements.

It's partly inspired on a previous framework I used to work (now it's pretty much abandoned) called [pysud], it had a similar same goal but was coded in python.

If you want to check the old python project, it's here [pysud]

## running examples

### CLI games

We need to add the -r esm flag to enable es6 modules on node (BTW I'm using node 10.16.3):

```bash
cd examples
node -r esm <example filename>
```

### Browser demo

Since src/browser classes were added this library can also be used in a web page (thanks to browserify).
After running:

```bash
mkdir dist
npm run build-browser-demo
npm run serve-browser-demo
```

visit http://localhost:3000 to check out how it's coming

## generating documentation

Enter

```bash
npm run doc
```

to run esdoc and generate documentation on docs/ directory.

## Links

...

[pysud]: https://github.com/francisco-pinchentti/pysud
