import {
  calculateFuelMass,
  calculateRequiredFuelMass,
  calculateFuelTotalForModules
} from './index';

test('calculateFuelMass', () => {
  expect(calculateFuelMass(12)).toBe(2);
  expect(calculateFuelMass(114739)).toBe(38244);
  expect(calculateFuelMass(3)).toBe(0);
});


test('calculateRequiredFuelMass', () => {
  expect(calculateRequiredFuelMass(100756)).toBe(50346);
  expect(calculateRequiredFuelMass(50378)).toBe(25158);
});

test('calculateFuelTotalForModules', () => {
  expect(calculateFuelTotalForModules([100756,50378])).toBe(50346+25158);
});