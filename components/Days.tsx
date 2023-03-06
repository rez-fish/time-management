import React, { useState } from 'react'
import { updateObjectInArray } from '../util/data'

// each day has a label and number of hours
interface Day {
  label: string
  hours?: number
}

const Category = ({
  category,
  needDayHeaders,
  total,
  displayDays,
  setUsedHours,
  display,
  setHoursRemain,
  hoursRemain,
}: any) => {
  // initialize each day as obj arr w/0 hours to start
  const initialDays: Day[] = [
    {
      label: 'Mon',
      hours: 0,
    },
    {
      label: 'Tue',
      hours: 0,
    },
    {
      label: 'Wed',
      hours: 0,
    },
    {
      label: 'Thu',
      hours: 0,
    },
    {
      label: 'Fri',
      hours: 0,
    },
    {
      label: 'Sat',
      hours: 0,
    },
    {
      label: 'Sun',
      hours: 0,
    },
  ]

  // set initial state
  const [days, setDays] = useState<Day[]>(initialDays)

  // calculate hours based on days for a particular
  const calcTotal = () => {
    total(days.reduce((a, b) => a + (b.hours ?? 0), 0))
    setUsedHours()
  }
  if (category === 'Fun') console.log(days[0].hours)

  return (
    <div className={`${!display ? 'invisible' : 'flex'} mb-2`}>
      <div className="w-28">{category}</div>
      <div className="flex gap-2">
        {displayDays &&
          // get label and input for each day
          days.map((d, index) => (
            <div key={`${d}_${index}`} className="relative">
              {needDayHeaders ? (
                <label
                  htmlFor="input"
                  className="absolute text-xl font-bold bottom-8"
                >
                  {d.label}
                </label>
              ) : null}
              <input
                type="number"
                className="w-12 rounded bg-emerald-200"
                min="0"
                max={Math.min(hoursRemain, 24)}
                value={d.hours === 0 ? '' : d.hours}
                onKeyUp={(e) => {
                  calcTotal()
                }}
                onClick={(e) => {
                  calcTotal()
                }}
                onChange={(e) => {
                  // update the value without using mutation
                  const index = days.findIndex(
                    (existingDay) => existingDay.label === d.label
                  )
                  const { value, min, max } = e.target
                  const hours = Math.max(
                    Number(min),
                    Math.min(Number(max), Number(value))
                  )
                  const newDays: Day[] = updateObjectInArray<Day>(days, {
                    index,
                    item: {
                      label: d.label,
                      hours,
                    },
                  })

                  // update the days array
                  setHoursRemain(() =>
                    (d.hours ?? 0) > hours
                      ? hoursRemain + Math.abs((d.hours ?? 0) - hours)
                      : hoursRemain - Math.abs((d.hours ?? 0) - hours)
                  )
                  setDays(newDays)
                  calcTotal()
                }}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Category
