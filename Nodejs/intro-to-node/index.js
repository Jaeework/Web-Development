//jshint esversion:6

/*
const fs = require("fs");   // if you want to use some module, you need to require it first. fs indicates file system.

fs.copyFileSync("file1.txt", "file2.txt");

*/

var superheroes = require("superheroes");
var supervillains = require('supervillains');

var mySuperheroName = superheroes.random();
var mySuperVillainName = supervillains.random();

console.log(mySuperheroName);
console.log(mySuperVillainName);