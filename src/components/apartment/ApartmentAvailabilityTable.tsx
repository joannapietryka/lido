import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DoorClosedLocked, LayoutGrid, Snowflake } from 'lucide-react'
import type { ApartmentSlug } from '../../data/apartments'
import { getAvailableUnits, type ApartmentAvailabilityUnit } from '../../data/apartmentAvailability'
import { ApartmentFloorPlanModal } from './ApartmentFloorPlanModal'

type ApartmentAvailabilityTableProps = {
  slug: ApartmentSlug
}

export function ApartmentAvailabilityTable({ slug }: ApartmentAvailabilityTableProps) {
  const { t } = useTranslation()
  const [selectedUnit, setSelectedUnit] = useState<ApartmentAvailabilityUnit | null>(null)
  const units = getAvailableUnits(slug)

  return (
    <>
      <section className="mt-12 md:mt-16">
        <h2 data-reveal className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-brand-dark">
          {t('apartmentDetail.availability.title')}
        </h2>

        {units.length === 0 ? (
          <div
            data-reveal
            className="flex items-center justify-center gap-3 rounded-[32px] border border-gray-100 bg-[#F8F9FA] px-6 py-10 text-center font-inter"
          >
            <DoorClosedLocked
              className="h-8 w-8 shrink-0 text-brand-dark"
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="text-[15px] leading-relaxed text-gray-600">
              {t('apartmentDetail.availability.empty')}
            </p>
          </div>
        ) : (
        <div data-reveal className="overflow-x-auto rounded-[32px] border border-gray-100 bg-white">
          <table className="w-full min-w-[720px] text-left font-inter">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F8F9FA]">
                {(
                  [
                    'number',
                    'price',
                    'area',
                    'floor',
                    'airConditioning',
                    'floorPlan',
                  ] as const
                ).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-5 py-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400"
                  >
                    {t(`apartmentDetail.availability.columns.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr
                  key={unit.id}
                  className="border-b border-gray-100 last:border-b-0 odd:bg-white even:bg-[#F8F9FA]"
                >
                  <td className="px-5 py-4 text-[15px] font-medium text-brand-dark">{unit.number}</td>
                  <td className="px-5 py-4 text-[15px] text-brand-dark">{unit.price}</td>
                  <td className="px-5 py-4 text-[15px] text-gray-600">{unit.area}</td>
                  <td className="px-5 py-4 text-[15px] text-gray-600">
                    {t('apartmentDetail.availability.floorValue', { floor: unit.floor })}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-dark">
                      {unit.hasAirConditioning ? (
                        <Snowflake className="w-3.5 h-3.5 shrink-0 text-gray-500" strokeWidth={1.75} aria-hidden />
                      ) : null}
                      {unit.hasAirConditioning
                        ? t('apartmentDetail.availability.yes')
                        : t('apartmentDetail.availability.no')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedUnit(unit)}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-dark shadow-sm ring-1 ring-gray-100 transition-all hover:bg-brand-dark hover:text-white hover:ring-transparent"
                      aria-label={t('apartmentDetail.availability.viewFloorPlan', { number: unit.number })}
                    >
                      <LayoutGrid className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {units.length > 0 && (
          <p data-reveal className="mt-3 text-[13px] text-gray-400 font-inter">
            {t('apartmentDetail.availability.hint')}
          </p>
        )}
      </section>

      {selectedUnit && (
        <ApartmentFloorPlanModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
      )}
    </>
  )
}
