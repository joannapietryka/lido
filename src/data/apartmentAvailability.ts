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
}

type CmsAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  floorPlan: string
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
  }
}

export const APARTMENT_AVAILABILITY: Record<ApartmentSlug, ApartmentAvailabilityUnit[]> = {
  studio: availabilityJson.studio.map(mapUnit),
  '2-pokoje': availabilityJson['2-pokoje'].map(mapUnit),
}
