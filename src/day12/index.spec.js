import { parseLinesToArray } from "../utils";
import { lcm } from "mathjs";

const data = `
<x=3, y=15, z=8>
<x=5, y=-1, z=-2>
<x=-10, y=8, z=2>
<x=8, y=4, z=-5>`;
/**
 <x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>
 */
const d = `
<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

const dd = `
<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

const totalEnergy = data =>
  data
    .map(m => {
      const pot = Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z);
      const kin = Math.abs(m.vx) + Math.abs(m.vy) + Math.abs(m.vz);
      return pot * kin;
    })
    .reduce((t, a) => t + a, 0);
const parser = str =>
  parseLinesToArray(str).map(e => {
    const m = e
      .replace("<", "")
      .replace(">", "")
      .split(",")
      .map(e => e.trim())
      .map(e => {
        const splitted = e.split("=");
        return { [splitted[0]]: Number(splitted[1]) };
      });
    //   console.log(m);
    return {
      x: m[0].x,
      y: m[1].y,
      z: m[2].z,
      vx: 0,
      vy: 0,
      vz: 0
    };
  });

const original = parser(data);

test("Q1", () => {
  let data = [...original];
  console.log(data);
  console.log(totalEnergy(data));
  const props = ["x", "y", "z"];
  const times = 10;
  for (let t = 1; t <= times; t++) {
    props.forEach(prop => {
      const snapshot = [...data];
      const mapped = data.map(a => a[prop]);
      for (let i = 0; i < data.length; i++) {
        const biggerCount = mapped.filter(a => a > snapshot[i][prop]).length;
        const smallerCount = mapped.filter(a => a < snapshot[i][prop]).length;

        data[i][`v${prop}`] += biggerCount - smallerCount;

        data[i][prop] += data[i][`v${prop}`];
      }
    });
    if (totalEnergy(data) === 0) {
      console.log("YAYYY", t, data);
    }
  }
  console.log(times, data);

  console.log(totalEnergy(data));
});

const makeString = (moon, prop) =>
  JSON.stringify(moon.map(e => [e[prop], e[`v` + prop]]));
test("Q2", () => {
  let data = [...original];
  console.log(data);
  const atStart = {
    x: makeString(original, "x"),
    y: makeString(original, "y"),
    z: makeString(original, "z")
  };
  const matches = {
    x: undefined,
    y: undefined,
    z: undefined
  };
  console.log(atStart);
  // console.log(totalEnergy(data));
  const props = ["x", "y", "z"];
  const times = 1;
  props.forEach(prop => {
    let search = true;
    let t = 0;
    while (search) {
      t++;
      const snapshot = [...data];
      const mapped = data.map(a => a[prop]);
      for (let i = 0; i < data.length; i++) {
        const biggerCount = mapped.filter(a => a > snapshot[i][prop]).length;
        const smallerCount = mapped.filter(a => a < snapshot[i][prop]).length;

        data[i][`v${prop}`] += biggerCount - smallerCount;

        data[i][prop] += data[i][`v${prop}`];
      }
      // console.log(t, data);
      const str = makeString(data, prop);
      if (str === atStart[prop]) {
        matches[prop] = t;
        search = false;
      }
    }
  });
  console.log(times, data, matches, lcm(...Object.values(matches)));
});
