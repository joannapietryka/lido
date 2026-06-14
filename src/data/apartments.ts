import pokoj1aImg from '../assets/pokoj-1a.webp'
import pokoj1bImg from '../assets/pokoj-1b.webp'
import pokoj1cImg from '../assets/pokoj-1c.webp'
import pokoj1eImg from '../assets/pokoj-1e.webp'
import pokoj1fImg from '../assets/pokoj-1f.webp'
import pokoj2aImg from '../assets/pokoj-2a.webp'
import pokoj2bImg from '../assets/pokoj-2b.webp'
import pokoj2cImg from '../assets/pokoj-2c.webp'
import pokoj2dImg from '../assets/pokoj-2d.webp'
import pokoj2eImg from '../assets/pokoj-2e.webp'
import pokoj2fImg from '../assets/pokoj-2f.webp'
import budynek1Img from '../assets/budynek-1.webp'
import buildingImg from '../assets/building.webp'

export type ApartmentSlug = 'studio' | '2-pokoje'

export type GalleryPhoto = {
  src: string
  altKey: string
}

export type ApartmentData = {
  slug: ApartmentSlug
  photos: GalleryPhoto[]
}

const STUDIO_PHOTOS: GalleryPhoto[] = [
  { src: pokoj1aImg, altKey: 'gallery.main' },
  { src: pokoj1bImg, altKey: 'gallery.living' },
  { src: pokoj1cImg, altKey: 'gallery.kitchen' },
  { src: pokoj1eImg, altKey: 'gallery.interior' },
  { src: pokoj1fImg, altKey: 'gallery.extra' },
  { src: budynek1Img, altKey: 'gallery.buildingExterior' },
  { src: buildingImg, altKey: 'gallery.building' },
]

const TWO_ROOM_PHOTOS: GalleryPhoto[] = [
  { src: pokoj2aImg, altKey: 'gallery.main' },
  { src: pokoj2bImg, altKey: 'gallery.living' },
  { src: pokoj2cImg, altKey: 'gallery.kitchen' },
  { src: pokoj2dImg, altKey: 'gallery.bedroom' },
  { src: pokoj2eImg, altKey: 'gallery.interior' },
  { src: pokoj2fImg, altKey: 'gallery.extra' },
  { src: budynek1Img, altKey: 'gallery.buildingExterior' },
  { src: buildingImg, altKey: 'gallery.building' },
]

export const APARTMENTS: Record<ApartmentSlug, ApartmentData> = {
  studio: {
    slug: 'studio',
    photos: STUDIO_PHOTOS,
  },
  '2-pokoje': {
    slug: '2-pokoje',
    photos: TWO_ROOM_PHOTOS,
  },
}

export const APARTMENT_SLUGS: ApartmentSlug[] = ['2-pokoje', 'studio']

export const GALLERY_PREVIEW_COUNT = 5

export function isApartmentSlug(value: string | undefined): value is ApartmentSlug {
  return value === 'studio' || value === '2-pokoje'
}
