import Category from '../components/Days'
import PieChart from '../components/PieChart'
import { Inter, Noto_Music } from '@next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Intialize Variables

  const [usedHours, setUsedHours] = useState(0)

  const [funTotal, setFunTotal] = useState(0)
  const [studyTotal, setStudyTotal] = useState(0)
  const [excersizeTotal, setExcersizeTotal] = useState(0)
  const [workTotal, setWorkTotal] = useState(0)
  const [sleepTotal, setSleepTotal] = useState(0)
  const [eatTotal, setEatTotal] = useState(0)
  const [commuteTotal, setCommuteTotal] = useState(0)
  const [socialMediaTotal, setSocialMediaTotal] = useState(0)
  const [credits, setCreditsTotal] = useState(0)
  const [otherTotal, setOtherTotal] = useState(0)
  const [hoursRemain, setHoursRemain] = useState(168)
  const [weeklyHours, setWeeklyHours] = useState(168)

  const [minMaxCredits, setMinMaxCredits] = useState(0)

  const data = [
    {
      id: 'Credits',
      label: 'credits',
      value: credits * 2,
      func: setCreditsTotal,
      display: false,
    },
    {
      id: 'Fun',
      label: 'fun',
      value: funTotal,
      func: setFunTotal,
      displayDays: true,
      display: true,
    },
    {
      id: 'Study',
      label: 'study',
      value: studyTotal,
      func: setStudyTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Excersize',
      label: 'excersize',
      value: excersizeTotal,
      func: setExcersizeTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Work',
      label: 'work',
      value: workTotal,
      func: setWorkTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Social Media',
      label: 'socialMedia',
      value: socialMediaTotal,
      func: setSocialMediaTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Commute',
      label: 'commute',
      value: commuteTotal,
      func: setCommuteTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Eat',
      label: 'eat',
      value: eatTotal,
      func: setEatTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Sleep',
      label: 'sleep',
      value: sleepTotal,
      func: setSleepTotal,
      displayDays: false,
      display: true,
    },
    {
      id: 'Other',
      label: 'other',
      value: otherTotal,
      func: setOtherTotal,
      displayDays: false,
      display: true,
    },
  ]

  return (
    <>
      <div className="flex flex-col mx-auto w-max md:flex-row">
        <div className="p-4 mb-4 font-semibold text-gray-800 md:rounded-lg md:shadow-2xl bg-emerald-500">
          {usedHours === weeklyHours && <p>Used Up All Hours</p>}
          <label htmlFor="" className="text-lg text-gray-800">
            Credits:{' '}
          </label>
          <input
            type="number"
            className="w-10 rounded bg-emerald-200"
            value={credits === 0 ? '' : credits}
            max={Math.min(credits + hoursRemain / 2, 84)}
            min="0"
            onChange={(e) => {
              const { value, min, max } = e.target
              const creditsTotal = Math.max(
                Number(min),
                Math.min(Number(max), Number(value))
              )
              console.log('change', creditsTotal)

              setHoursRemain(() =>
                credits > creditsTotal
                  ? hoursRemain + (credits - creditsTotal) * 2
                  : hoursRemain - (creditsTotal - credits) * 2
              )
              setCreditsTotal(creditsTotal)
            }}
          />
          <p className="float-right">
            Hours available:{' '}
            <span className={hoursRemain === 0 ? 'text-purple-500' : ''}>
              {hoursRemain}
            </span>
          </p>
          {data.map((i) => (
            <Category
              key={i.id}
              category={i.id}
              needDayHeaders={i.displayDays}
              displayDays={true}
              total={i.func}
              usedHours={usedHours}
              setUsedHours={setUsedHours}
              display={i.display}
              hoursRemain={hoursRemain}
              setHoursRemain={setHoursRemain}
              credits={credits}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center h-80 w-[500px]">
          <PieChart data={data} />
          <button
            className="w-1/4 p-2 transition-all ease-in-out bg-yellow-400 rounded shadow-lg active:shadow-md active:scale-95"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  )
}
