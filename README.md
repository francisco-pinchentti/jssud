# README.md

## about

A pure js text adventure game framework

## project structure

-   examples/
    -   ...
-   src/
    -   main framework source code directory

## a little history

This mini framework attempts to provide (and figure out how complex can be) an OO solution for text adventure games, which originally were written using BASIC language, labels and go to statements.
It's partly inspired on a previous framework I used to work (now it's pretty much abandoned) called 'pysud', it had the same goal but was coded in python.

## running examples

We need to add the -r esm flag to enable es6 modules on node (BTW I'm using node 10.x):

```bash
cd examples
node -r esm <example filename>
```
