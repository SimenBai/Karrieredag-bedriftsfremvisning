#Karrieredag bedrifter
Prosjekt for å vise frem hvem som skal på karrieredagen til Login

#Eksempel på strukturering av JSON datene
```json
{
  "company": [
    {
      "name": "Navnet på bedriften",
      "img": "Link for logo bildet",
      "description": "Beskrivelse av bedrift.",
      "white": true,
      "svg": true,
      "presentation": {
        "time": "XX:XX-ZZ:ZZ",
        "room": "ROOM ID"
      },
      "interview": {
        "signupLink": "Link for påmelding til intervju"
      }
    },
    {
      "name": "Navn på bedriften",
      "img": "Link for logo bildet"
    }
  ]
}
```

***white*** og ***svg*** bestemmer noen attributter for bildene. 

***white*** gjør at bakgrunnen bak bilde blir hvit, slik at man kan bruke mørke logoer.
***svg*** tilpasser høyden slik at svg bilder blir større.

