import {
  findBestVisible,
  getVisibleCountsMap,
  calcDistanceBetween2Points,
  getAngleMap,
  shootThemAllFromStation
} from ".";

const data1 = `
.#..#
.....
#####
....#
...##`;

//5-8 =>33
const data2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

const data3 = `
#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

// 6-3 => 41
const data5 = `
.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;

// 11-13 => 210
const data4 = `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

const shootData = `
.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....X...###..
..#.#.....#....##`;
test("test shoot", () => {
  const best = findBestVisible(shootData);

  expect(best).toEqual(["8-3", 30]);
});

test("test data1", () => {
  const best = findBestVisible(data1);

  expect(best).toEqual(["3-4", 8]);
});

test("shooting test 1", () => {
  const shootLogs = shootThemAllFromStation(shootData, [8, 3]);
  expect(shootLogs[5]).toEqual([9, 2]);
  expect(shootLogs[15]).toEqual([16, 4]);
  expect(shootLogs[18]).toEqual([4, 4]);
  expect(shootLogs[27]).toEqual([5, 1]);
  expect(shootLogs[28]).toEqual([6, 1]);
  expect(shootLogs[29]).toEqual([6, 0]);
  expect(shootLogs[30]).toEqual([7, 0]);
  expect(shootLogs[31]).toEqual([8, 0]);
  expect(shootLogs[32]).toEqual([10, 1]);
  expect(shootLogs[33]).toEqual([14, 0]);
  expect(shootLogs[34]).toEqual([16, 1]);
  expect(shootLogs[35]).toEqual([13, 3]);
  expect(shootLogs[36]).toEqual([14, 3]);
});

test("shooting test 2", () => {
  const shootLogs = shootThemAllFromStation(data4, [11, 13]);

  expect(shootLogs[1]).toEqual([11, 12]);
  expect(shootLogs[2]).toEqual([12, 1]);
  expect(shootLogs[3]).toEqual([12, 2]);
  expect(shootLogs[200]).toEqual([8, 2]);
});

// test("test data2", () => {
//   const best = findBestVisible(data2);

//   expect(best).toEqual(["5-8", 33]);
// });

// test("test data3", () => {
//   const best = findBestVisible(data3);

//   expect(best).toEqual(["1-2", 35]);
// });

// test("test data4", () => {
//   // const visibleCounts = getVisibleCountsMap(data4);
//   const best = findBestVisible(data4);

//   // console.log(visibleCounts);
//   expect(best).toEqual(["11-13", 210]);
// });

// test("test data5", () => {
//   // const visibleCounts = getVisibleCountsMap(data4);
//   const best = findBestVisible(data5);

//   // console.log(visibleCounts);
//   expect(best).toEqual(["6-3", 41]);
// });
