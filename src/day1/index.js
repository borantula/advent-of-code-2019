import data from './data';


export function calculateFuelMass(mass){
  const result = Math.floor(mass / 3) - 2;
  return result > 0 ? result : 0;
}

export function calculateRequiredFuelMass(mass){
  const fuelMass = calculateFuelMass(mass);
  if(fuelMass <= 0) {
    return fuelMass;
  }
  return calculateRequiredFuelMass(fuelMass) + fuelMass;
}

export function calculateFuelTotalForModules(moduleMasses){
  return moduleMasses.reduce((total,moduleMass)=>total + calculateRequiredFuelMass(moduleMass),0);
}

console.log('TOTAL FUEL MASS: ',calculateFuelTotalForModules(data));