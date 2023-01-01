/*
@title: Sokoban_5_Hard
@author: Rama Ganesh

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
......00........
....10L0L.......
...000LLL.......
..000001L1......
...0....0.......
...0.0.00.......
...0....0.......
00000000000.....
04444044440.....
04044045040.....
04044044040.....
04000000040.....
00033033000.....
..0330330.......
..0000000.......`],
  [ box, bitmap`
................
................
..CCCCCCCCCCCCC.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..CCCCCCCCCCCCC.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..C77777C77777C.
..CCCCCCCCCCCCC.
................`],
  [ goal, bitmap`
................
................
................
.....DDDDD......
....DDDDDDD.....
...DD22222DD....
...DD22222DD....
...DD22222DD....
...DD22222DD....
...DD22222DD....
....DDDDDDD.....
.....DDDDD......
................
................
................
................`],
  [ wall, bitmap`
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
C0CCC0CCC0CCC0CC
0000000000000000`]
);

let level = 0;
const levels = [
  map`
p...
www.
w...
wbwg
....
....`,
  map`
.....
.b.b.
www..
g..gp`,
  map`
......
p.....
.bwww.
...w..
..bgwg`,
  map`
..w
..w
gbg
.b.
.w.
bw.
g.p`,
  map`
wwwwwwww
www...ww
wgpb..ww
www.bgww
wgwwb.ww
w.w.g.gw
wbbgbb.w
w...g..w
wwwwwwww`
];
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box],
  [box]:[box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
