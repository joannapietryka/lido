import type { ApartmentSlug } from './apartments'
import studioPlanImg from '../assets/pokoj-1e.png'
import studioPlanAltImg from '../assets/pokoj-1f.png'
import twoRoomPlanImg from '../assets/pokoj-2d.png'
import twoRoomPlanAltImg from '../assets/pokoj-2e.png'

export type ApartmentAvailabilityUnit = {
  id: string
  number: string
  price: string
  area: string
  floor: number
  hasAirConditioning: boolean
  floorPlanSrc: string
}

export const APARTMENT_AVAILABILITY: Record<ApartmentSlug, ApartmentAvailabilityUnit[]> = {
  studio: [
    {
      id: 'studio-101',
      number: '101',
      price: '1 800 zł',
      area: '20 m²',
      floor: 1,
      hasAirConditioning: true,
      floorPlanSrc: studioPlanImg,
    },
    {
      id: 'studio-102',
      number: '102',
      price: '1 850 zł',
      area: '20 m²',
      floor: 1,
      hasAirConditioning: false,
      floorPlanSrc: studioPlanAltImg,
    },
    {
      id: 'studio-201',
      number: '201',
      price: '1 800 zł',
      area: '20 m²',
      floor: 2,
      hasAirConditioning: true,
      floorPlanSrc: studioPlanImg,
    },
    {
      id: 'studio-202',
      number: '202',
      price: '1 820 zł',
      area: '20 m²',
      floor: 2,
      hasAirConditioning: true,
      floorPlanSrc: studioPlanAltImg,
    },
  ],
  '2-pokoje': [
    {
      id: '2p-103',
      number: '103',
      price: '2 500 zł',
      area: '40 m²',
      floor: 1,
      hasAirConditioning: true,
      floorPlanSrc: twoRoomPlanImg,
    },
    {
      id: '2p-203',
      number: '203',
      price: '2 600 zł',
      area: '40 m²',
      floor: 2,
      hasAirConditioning: true,
      floorPlanSrc: twoRoomPlanAltImg,
    },
    {
      id: '2p-303',
      number: '303',
      price: '2 550 zł',
      area: '40 m²',
      floor: 3,
      hasAirConditioning: false,
      floorPlanSrc: twoRoomPlanImg,
    },
  ],
}
