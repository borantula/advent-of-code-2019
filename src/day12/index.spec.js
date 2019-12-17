import { parseLinesToArray } from "../utils";

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

const data1 = parser(data);

test("data1", () => {
  let data = [...data1];
  console.log(data);
  const props = ["x", "y", "z"];
  const times = 1000;
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
  }
  console.log(times, data);

  const totals = data
    .map(m => {
      const pot = Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z);
      const kin = Math.abs(m.vx) + Math.abs(m.vy) + Math.abs(m.vz);
      return pot * kin;
    })
    .reduce((t, a) => t + a, 0);
  console.log(totals);
});
