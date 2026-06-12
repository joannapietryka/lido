import availabilityJson from '../content/availability.json'

export type ApartmentAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  floorPlanSrc: string
  available: boolean
}

type CmsAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  floorPlan: string
  available?: boolean
}

function mapUnit(unit: CmsAvailabilityUnit): ApartmentAvailabilityUnit {
  return {
    id: unit.id,
    number: unit.number,
    price: unit.price,
    area: unit.area,
    floor: unit.floor,
    hasAirConditioning: unit.hasAirConditioning,
    floorPlanSrc: unit.floorPlan,
    available: unit.available !== false,
  }
}

const allUnits = availabilityJson.units.map(mapUnit)

export function getAvailableUnits(): ApartmentAvailabilityUnit[] {
  return allUnits.filter((unit) => unit.available)
}

export const APARTMENT_AVAILABILITY = allUnits
