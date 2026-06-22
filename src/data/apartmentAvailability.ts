import availabilityJson from '../content/availability.json'

export type ApartmentAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  availableFrom: string
  photos: string[]
  floorPlanSrc: string
  available: boolean
}

type CmsAvailabilityPhoto = string | { image: string }

type CmsAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  availableFrom?: string
  photos?: CmsAvailabilityPhoto[]
  floorPlan: string
  available?: boolean
}

function mapPhotos(photos: CmsAvailabilityPhoto[] | undefined): string[] {
  return (photos ?? [])
    .map((photo) => (typeof photo === 'string' ? photo : photo.image))
    .filter(Boolean)
}

function mapUnit(unit: CmsAvailabilityUnit): ApartmentAvailabilityUnit {
  return {
    id: unit.id,
    number: unit.number,
    price: unit.price,
    area: unit.area,
    floor: unit.floor,
    hasAirConditioning: unit.hasAirConditioning,
    availableFrom: unit.availableFrom?.trim() ?? '',
    photos: mapPhotos(unit.photos),
    floorPlanSrc: unit.floorPlan,
    available: unit.available !== false,
  }
}

const allUnits = availabilityJson.units.map(mapUnit)

export function getAvailableUnits(): ApartmentAvailabilityUnit[] {
  return allUnits.filter((unit) => unit.available)
}

export const APARTMENT_AVAILABILITY = allUnits
