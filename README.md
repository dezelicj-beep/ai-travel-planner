# AI Travel Planner

Jednostavna AI web aplikacija za planiranje putovanja izrađena za projektni zadatak iz teme Google AI Studio, Gemini modeli i Google Cloud.

## Funkcionalnosti

- unos destinacije, broja dana, budžeta, interesa i stila putovanja
- slanje korisničkog zahtjeva Gemini modelu
- generiranje personaliziranog plana putovanja na hrvatskom jeziku
- prikaz plana u web sučelju
- mogućnost deployanja na Google Cloud Run

## Lokalno pokretanje

```bash
npm install
export GEMINI_API_KEY="OVDJE_STAVITI_API_KEY"
npm start
```

Aplikacija se otvara na:

```text
http://localhost:8080
```

Ako API ključ nije postavljen, aplikacija prikazuje demo odgovor kako bi se mogla pokazati struktura rada.

## Deploy na Google Cloud Run

Najkraći postupak:

1. Otvoriti Google Cloud Console.
2. Napraviti novi projekt ili koristiti postojeći.
3. Otvoriti Cloud Shell.
4. Učitati ZIP aplikacije i raspakirati ga.
5. Ući u mapu projekta.
6. Pokrenuti naredbu:

```bash
gcloud run deploy ai-travel-planner --source . --region europe-west1 --allow-unauthenticated --set-env-vars GEMINI_API_KEY="OVDJE_STAVITI_API_KEY"
```

Nakon završetka deploya Google Cloud Run prikazuje javni URL aplikacije.

## Tehnologije

- Google AI Studio
- Gemini API
- Node.js
- Express
- HTML/CSS/JavaScript
- Google Cloud Run
