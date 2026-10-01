# Innovatief Klimaat – Front-end, Sprint 1

## Studentgegevens

- **Studentnaam:** Jeremy Meijer
- **Studentennummer:** 97124269
- **Klas:** sd-flex
- **Opleiding:** Software Developer

## Projectgegevens

### Naam van het project

Innovatief Klimaat (front-end) – Sprint 1

### Beschrijving van de sprint

Innovatief Klimaat is een website waarmee docenten en docententeams meten hoe het klimaat binnen hun team is. De vragenlijst dient daarbij als gespreksstarter. Het hele project staat beschreven in `README.md`. Deze README gaat over de eerste week (sprint 1) en gaat uitsluitend over de front-end. De API wordt tegelijkertijd door mij apart ontwikkeld en valt niet onder deze sprint.

**Doel van de sprint:** de front-end zo aanpassen dat alle schermen en gebruikersrollen klaar zijn, zodat de API er in een volgende sprint zonder grote aanpassingen aan gekoppeld kan worden.

**Wat ik in deze sprint wil maken:**

1. **Eigen en teamresultaten:** gebruikers zien alleen hun eigen resultaten en die van hun team. Dit werkt voorlopig met dummydata.
2. **Adminpagina aanpassen:** de adminpagina krijgt een inlogscherm met wachtwoord en een duidelijkere opzet.
3. **Filteren door de admin:** de admin kan filteren op college en kan individuele vragen binnen een dimensie van teams inzien.
4. **Voorbereiden op de API:** de dummydata komt op één plek te staan, los van de schermen. Daardoor kan ik de dummydata later vervangen door echte API-aanroepen zonder de schermen om te bouwen.

**Wat al klaar is en niet in deze sprint zit:** de vragenlijst, het resultatenscherm, de teamcode-generator, het toevoegen van een college aan een team en de mobiele en desktoplayout.

**Wat bewust niet in deze sprint zit:** de koppeling met de API en het online zetten van de website. Dit volgt in een volgende sprint, zodra de API klaar is.

### Reden(en) voor deze sprint

- Het gescheiden tonen van eigen resultaten en teamresultaten is nodig voor de privacy van de gebruikers.
- De admin heeft filters nodig om de resultaten van teams en colleges zinvol te kunnen bekijken.
- Door de front-end nu klaar te zetten, kan ik de API daarna sneller koppelen.
- De front-end hoeft niet te wachten op de API, omdat ik met dummydata kan werken.

### Randvoorwaarden

- **AVG:** De resultaten bevatten gevoelige informatie over het teamklimaat. Gebruikers mogen daarom alleen hun eigen en teamresultaten zien. Het wachtwoordscherm in de front-end is een eerste stap. Echte beveiliging van de gegevens moet later door de API gebeuren, omdat een wachtwoord dat alleen in de front-end staat omzeild kan worden.
- **Copyright en licenties:** Alleen libraries, lettertypen en iconen met een passende licentie worden gebruikt.
- **Wettelijke impact:** De website blijft toegankelijk en goed leesbaar op mobiel en desktop.
- **Maatschappelijke impact:** Resultaten worden neutraal getoond, als startpunt voor een gesprek en niet als beoordeling van personen.
- **Afhankelijkheid:** De API is nog niet klaar. Daarom werk ik in deze sprint met dummydata, en de koppeling volgt later.

### Begin- en einddatum

- **Begindatum:** 01-10-2026
- **Einddatum:** 08-10-2026

## Leerdoelen

- Een front-end opzetten die gescheiden is van de databron, zodat een API er later makkelijk aan gekoppeld kan worden.
- Leren gebruikers en admins van elkaar te scheiden in de interface.
- Leren filters te bouwen waarmee data op meerdere manieren bekeken kan worden.
- Nadenken over privacy en wat wel en niet in de front-end geregeld kan worden.
- Leren een planning te maken en die binnen één week uit te voeren.

> *"Het geheim van vooruitgang is beginnen."* – Mark Twain

## Kerntaken / Werkprocessen

Met deze sprint hoop ik de volgende werkprocessen (Crebo 25998) te vullen:

- **B1-K1-W1 – Stemt opdracht af, plant werkzaamheden en bewaakt de voortgang:** ik zet de sprintpunten in een logische volgorde en houd bij wat af is, zodat alles binnen de week klaar komt.
- **B1-K1-W3 – Realiseert (onderdelen van) software:** ik bouw de gescheiden eigen- en teamresultaten, de adminpagina met wachtwoordscherm en het filteren, met aandacht voor privacy en veiligheid.
- **B1-K1-W4 – Test software:** ik test of gebruikers alleen zien wat ze mogen zien en of de filters goed werken op mobiel en desktop.
- **B1-K1-W5 – Doet verbetervoorstellen voor de software:** ik noteer verbeterpunten uit de tests en bepaal wat naar een volgende sprint gaat, waaronder de API-koppeling.