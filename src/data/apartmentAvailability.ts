import availabilityJson from '../content/availability.json'
import type { ApartmentSlug } from './apartments'

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

const allUnits: Record<ApartmentSlug, ApartmentAvailabilityUnit[]> = {
  studio: availabilityJson.studio.map(mapUnit),
  '2-pokoje': availabilityJson['2-pokoje'].map(mapUnit),
}

export function getAvailableUnits(slug: ApartmentSlug): ApartmentAvailabilityUnit[] {
  return allUnits[slug].filter((unit) => unit.available)
}

export const APARTMENT_AVAILABILITY = allUnits
