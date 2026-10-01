import { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

async function apiFoutmelding(response: Response) {
  const body = await response.json().catch(() => null)
  return body?.detail ?? body?.description ?? `Opslaan bij de API mislukt (${response.status}).`
}

// kleine inline iconen (geen extra dependency nodig)
type IconProps = { className?: string }

const IconWrap = ({ className, children }: IconProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
)

const Users = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrap>
)

const QrCode = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM14 21h3M21 14v3M18 21h3v-3" />
  </IconWrap>
)

const Copy = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </IconWrap>
)

const Check = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <path d="M20 6 9 17l-5-5" />
  </IconWrap>
)

const Plus = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <path d="M12 5v14M5 12h14" />
  </IconWrap>
)

const Search = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </IconWrap>
)

const Download = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <path d="M12 3v12m0 0-4-4m4 4 4-4" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </IconWrap>
)

const BarChart3 = ({ className }: IconProps) => (
  <IconWrap className={className}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17V5M8 17v-4" />
  </IconWrap>
)

const dims = [
  { id: 1,  short: 'Vrijheid' },
  { id: 2,  short: 'Ideesupport' },
  { id: 3,  short: 'Vertrouwen' },
  { id: 4,  short: 'Dynamiek' },
  { id: 5,  short: 'Speelsheid' },
  { id: 6,  short: 'Dialoog' },
  { id: 7,  short: 'Risico nemen' },
  { id: 8,  short: 'Tijd voor ideeën' },
  { id: 9,  short: 'Conflict' },
  { id: 10, short: 'Uitdaging' },
]

const categorieen = [
  'Bouw',
  'Defensie',
  'Horeca',
  'ICT',
  'Installatie- & Elektrotechniek',
  'Interieur',
  'Kinderopvang & Onderwijs',
  'Maak- & Procesindustrie',
  'Metaal',
  'Mobiliteit & Logistiek',
  'Retail & E-commerce',
  'Verf- & Applicatietechniek',
  'Welzijn & Zorg',
  'Infratechniek',
  'Zakelijke Dienstverlening',
  'Diensten'
]

const collegeScores = [15, 14, 17, 13, 19, 16, 11, 15, 13, 17]
const MAX_SCORE = 25
const RESPONDENTEN_ALLE_TEAMS = 24

const scoreColor = (score: number) => {
  if (score <= 6)  return 'bg-blue-950'
  if (score <= 11) return 'bg-blue-800'
  if (score <= 16) return 'bg-blue-500'
  return 'bg-blue-300'
}

const gemiddeldeVan = (scores: number[]) =>
  (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)

const genereerCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const blok = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${blok()}-${blok()}`
}

// nieuwe teams krijgen willekeurige (demo-)scores per dimensie
const genereerScores = () => dims.map(() => Math.floor(Math.random() * (MAX_SCORE - 6)) + 6)

type Team = {
  name: string
  code: string
  category: string
  scores: number[]
  aangemaakt: string
}

export default function Admin() {
  const [teams, setTeams] = useState<Team[]>([])
  const [teamNaam, setTeamNaam] = useState('')
  const [categorie, setCategorie] = useState('')
  const [actieveCode, setActieveCode] = useState<Team | null>(null)
  const [copied, setCopied] = useState(false)
  const [zoekNaam, setZoekNaam] = useState('')
  const [apiFout, setApiFout] = useState<string | null>(null)
  const [bezig, setBezig] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleGenereer = async () => {
    const naam = teamNaam.trim()
    if (!naam || !categorie || bezig) return
    setBezig(true)
    setApiFout(null)

    try {
      const categoryResponse = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json, application/json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({ name: categorie }),
      })
      if (!categoryResponse.ok) throw new Error(await apiFoutmelding(categoryResponse))

      const category: { '@id'?: string; id?: number } = await categoryResponse.json()
      const categoryIri = category['@id'] ?? (category.id ? `/api/categories/${category.id}` : '')
      if (!categoryIri) throw new Error('De API gaf geen categorie-ID terug.')

      const code = genereerCode()
      const teamResponse = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json, application/json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({ name: naam, code, category: categoryIri }),
      })
      if (!teamResponse.ok) throw new Error(await apiFoutmelding(teamResponse))

      const team: { name?: string; code?: string } = await teamResponse.json()
      const nieuwTeam: Team = {
        name: team.name ?? naam,
        code: team.code ?? code,
        category: categorie,
        scores: genereerScores(),
        aangemaakt: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }
      setTeams((prev) => [...prev.filter((item) => item.name.toLowerCase() !== naam.toLowerCase()), nieuwTeam])
      setActieveCode(nieuwTeam)
      setTeamNaam('')
    } catch (error) {
      setApiFout(error instanceof Error ? error.message : 'Teamcode aanmaken is mislukt.')
    } finally {
      setBezig(false)
    }
  }

  const handleCopy = async () => {
    if (!actieveCode) return
    try {
      await navigator.clipboard.writeText(vragenlijstLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard niet beschikbaar; stil negeren
    }
  }

  const zoekTrim = zoekNaam.trim().toLowerCase()
  const toontAlleTeams = zoekTrim === ''
  const gevondenTeam = useMemo(
    () => (toontAlleTeams ? undefined : teams.find((t) => t.name.toLowerCase().includes(zoekTrim))),
    [teams, zoekTrim, toontAlleTeams],
  )
  const geenMatch = !toontAlleTeams && !gevondenTeam

  const tonenScores = toontAlleTeams ? collegeScores : gevondenTeam?.scores ?? []
  const tonenGemiddelde = tonenScores.length ? gemiddeldeVan(tonenScores) : '–'
  const tonenLabel = toontAlleTeams ? 'Alle teams · gemiddelde' : gevondenTeam ? gevondenTeam.name : 'Geen match'
  const tonenRespondenten = toontAlleTeams ? RESPONDENTEN_ALLE_TEAMS : gevondenTeam ? 1 : 0
  const vragenlijstLink = actieveCode
    ? (() => {
        const url = new URL('/vragenlijst', window.location.origin)
        url.searchParams.set('teamCode', actieveCode.code)
        return url.toString()
      })()
    : ''
  const qrCodeUrl = vragenlijstLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(vragenlijstLink)}`
    : ''

  return (
    <div className="w-4/5 mx-auto max-h-[calc(100vh-2.5rem)] mt-2 rounded-lg border-2 border-blue-800 bg-slate-50 px-4 py-8 md:py-12 lg:px-12 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-950 md:text-4xl">Admin Dashboard</h1>
          <p className="mt-1 text-slate-500">Beheer teamtoegang en bekijk de resultaten van de vragenlijst.</p>
        </header>

        {apiFout && (
          <p role="alert" className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {apiFout}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-1 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-blue-950">Teamtoegang</h2>
            </div>
            <p className="mb-4 text-sm text-slate-500">Genereer een teamcode met QR-code voor snelle toegang.</p>

            <label htmlFor="teamnaam" className="mb-1 block text-sm font-medium text-blue-950">
              Teamnaam
            </label>
            <input
              id="teamnaam"
              type="text"
              value={teamNaam}
              onChange={(event) => {
                setTeamNaam(event.target.value)
                setCategorie('')
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenereer() }}
              placeholder="Bijv. Team Innovatie"
              className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-blue-950 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <label htmlFor="teamcategorie" className="mb-1 block text-sm font-medium text-blue-950">
              Categorie
            </label>
            <select
              id="teamcategorie"
              value={categorie}
              onChange={(event) => setCategorie(event.target.value)}
              required
              disabled={!teamNaam.trim()}
              className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-blue-950 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>Kies een categorie</option>
              {categorieen.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleGenereer}
              disabled={!teamNaam.trim() || !categorie || bezig}
              className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-400 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {bezig ? 'Team opslaan...' : 'Teamcode genereren'}
            </button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-center">
                {qrCodeUrl ? (
                  <a href={vragenlijstLink} aria-label="Open vragenlijst via QR-link">
                    <img
                      src={qrCodeUrl}
                      alt={`QR-code voor ${actieveCode?.name} met teamcode`}
                      className="h-40 w-40 rounded-lg border border-slate-200 bg-white p-2"
                    />
                  </a>
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white">
                    <QrCode className="h-8 w-8 text-slate-300" />
                  </div>
                )}
              </div>

              <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="font-mono text-base font-semibold tracking-wide text-blue-950">
                  {actieveCode?.code ?? '—'}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!vragenlijstLink}
                  aria-label="Kopieer vragenlijstlink met teamcode"
                  className="text-blue-900/60 transition-colors hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {vragenlijstLink && (
                <a
                  href={vragenlijstLink}
                  className="mb-3 block break-all text-xs text-blue-800 underline underline-offset-2"
                >
                  {vragenlijstLink}
                </a>
              )}

              <dl className="space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <dt>Team</dt>
                  <dd className="text-slate-700">{actieveCode?.name ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Categorie</dt>
                  <dd className="text-right text-slate-700">{actieveCode?.category ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Aangemaakt</dt>
                  <dd className="text-slate-700">{actieveCode?.aangemaakt ?? '—'}</dd>
                </div>
              </dl>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {teams.length} team{teams.length === 1 ? '' : 's'} opgeslagen
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-1 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-blue-950">Resultaten</h2>
            </div>
            <p className="mb-4 text-sm text-slate-500">Bekijk scores per dimensie, voor alle teams of één specifiek team.</p>

            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={zoekNaam}
                onChange={(e) => setZoekNaam(e.target.value)}
                placeholder="Zoek op teamnaam (leeg = alle teams)"
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-blue-950 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900">
                {tonenLabel}
              </span>
              <span className="text-sm text-slate-500">
                {tonenRespondenten} respondent{tonenRespondenten === 1 ? '' : 'en'}
              </span>
              <span className="ml-auto text-sm font-semibold text-blue-950">
                {tonenGemiddelde}
                <span className="font-normal text-slate-400">/{MAX_SCORE}</span>
              </span>
            </div>

            {geenMatch ? (
              <div className="flex flex-col items-center justify-center gap-1 py-14 text-center">
                <p className="text-sm font-medium text-slate-600">Geen resultaten voor "{zoekNaam.trim()}"</p>
                <p className="text-xs text-slate-400">Controleer de teamnaam of genereer eerst teamtoegang.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dims.map((d, i) => {
                  const score = tonenScores[i]
                  return (
                    <div key={d.id} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 truncate text-sm text-slate-600">{d.short}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${scoreColor(score)} transition-all duration-700`}
                          style={{ width: `${(score / MAX_SCORE) * 100}%` }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-sm font-medium text-blue-950">
                        {score}/{MAX_SCORE}
                      </span>
                    </div>
                  )
                })}

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                  <span>Laag</span>
                  <span className="h-2 w-4 rounded-full bg-blue-950" />
                  <span className="h-2 w-4 rounded-full bg-blue-800" />
                  <span className="h-2 w-4 rounded-full bg-blue-500" />
                  <span className="h-2 w-4 rounded-full bg-blue-300" />
                  <span>Hoog</span>
                </div>
              </div>
            )}

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-900 bg-white px-5 py-2.5 text-sm font-semibold text-blue-950 transition-colors hover:bg-blue-50 md:w-auto"
            >
              <Download className="h-4 w-4" />
              Download als PDF
            </button>
          </section>

        </div>
      </div>
    </div>
  )
}