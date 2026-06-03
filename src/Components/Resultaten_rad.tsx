import { useState } from 'react'

interface Dimensie {
  naam: string
  team: number
  alleTeams: number
}

const dimensies: Dimensie[] = [
  { naam: 'Vrijheid', team: 18, alleTeams: 14 },
  { naam: 'Ideesupport', team: 16, alleTeams: 15 },
  { naam: 'Vertrouwen', team: 20, alleTeams: 17 },
  { naam: 'Dynamiek', team: 14, alleTeams: 12 },
  { naam: 'Speelsheid', team: 22, alleTeams: 18 },
  { naam: 'Dialoog', team: 19, alleTeams: 16 },
  { naam: 'Risico nemen', team: 11, alleTeams: 13 },
  { naam: 'Tijd voor ideeën', team: 15, alleTeams: 14 },
  { naam: 'Conflict', team: 13, alleTeams: 12 },
  { naam: 'Uitdaging', team: 21, alleTeams: 18 },
]

export default function Resultaten_Cirkel() {
  const [active, setActive] = useState(0)

  const vorige = () =>
    setActive((prev) => (prev === 0 ? dimensies.length - 1 : prev - 1))

  const volgende = () =>
    setActive((prev) => (prev + 1) % dimensies.length)

  const current = dimensies[active]

  const gemiddelde = Math.round(
    (current.team + current.alleTeams) / 2
  )

  const left =
    dimensies[
      active === 0 ? dimensies.length - 1 : active - 1
    ]

  const right =
    dimensies[
      active === dimensies.length - 1 ? 0 : active + 1
    ]

  return (
    <div className="flex flex-col items-center w-full">

      <div className="w-full max-w-md text-center mb-8">
        <p className="text-gray-500">
          Dimensie {active + 1} van {dimensies.length}
        </p>

        <h2 className="text-4xl font-bold text-blue-900 mt-2">
          {current.naam}
        </h2>
      </div>

      <div className="relative w-full max-w-md">

        <button
          onClick={vorige}
          className="absolute left-0 top-20 z-20 w-12 h-12 rounded-full border-2 border-blue-900 bg-white text-2xl"
        >
          ←
        </button>

        <button
          onClick={volgende}
          className="absolute right-0 top-20 z-20 w-12 h-12 rounded-full border-2 border-blue-900 bg-white text-2xl"
        >
          →
        </button>

        <div className="relative h-[320px] overflow-hidden">

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-t-full border-4 border-blue-900 bg-blue-100">

            <div className="absolute bottom-0 left-0 right-0 h-full flex">

              <div className="flex-1 flex items-center justify-center opacity-50">
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    {left.naam}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-900">
                    {current.naam}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center opacity-50">
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    {right.naam}
                  </div>
                </div>
              </div>

            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4">

              <div className="w-64 h-64 rounded-full bg-white border-4 border-blue-900 flex items-center justify-center">

                <div className="grid grid-cols-3 gap-4 w-full px-4 text-center">

                  <div>
                    <p className="text-sm text-gray-500">
                      Jouw team
                    </p>

                    <p className="text-4xl font-bold text-blue-900">
                      {current.team}
                    </p>

                    <p>/25</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Gemiddelde
                    </p>

                    <p className="text-4xl font-bold text-orange-500">
                      {gemiddelde}
                    </p>

                    <p>/25</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Alle teams
                    </p>

                    <p className="text-4xl font-bold text-blue-900">
                      {current.alleTeams}
                    </p>

                    <p>/25</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="flex gap-2 mt-6">
        {dimensies.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full ${
              i === active
                ? 'bg-orange-400'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

    </div>
  )
}