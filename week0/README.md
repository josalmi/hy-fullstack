# Week 0

- [x] 0.1 HTML ja CSS
- [x] 0.2 HTML:n lomakkeet
- [x] 0.3 Muistiinpanojen sivu

  ![sekvenssikaavio](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=a2F5dHRhamEtPnNlbGFpbjoKbm90ZSBsZWZ0IG9mIAAPBgoAHggga2lyam90dGFhIG9zb2l0ZXJpdmlsbGUKZnVsbHN0YWNrLWV4YW1wbGVhcHAuaGVyb2t1YXBwLmNvbS9ub3RlcwplbmQgbm90ZQoAaQYtPnBhbHZlbGluOiBHRVQgAB8pAIEZDQA8CAogIEhhZXRhYW4gc3RhYXR0aW5lbiBIVE1MLXNpdnVzdG8AdgoAcAgAgXAJIHN0YXR1cyAyMDAsIHNpdnUAMwdrb29kaQoAdjptYWluLmNzAIEGLXR5eWxpdGllZG8AgQkrACcOAHJAagCCNy1za3JpcHQAgQIxADAHAIIjO2RhdGEuanNvbgCFIxUAhTkHIG7DpHl0dMOkw6QAhCQIbWVuIHBhbGF1dHRhbWEAhB8GLAogam9rYSBvAIJ5CGVsdHkAgn4ObiBtdWthaXNlc3RpAIQkKG11aXN0aWlucGFub3QgSlNPTi1tdW9kb3NzYQoAgRkdcmlrYXN0YWEgYWllbW0AgT8IZXR5AIVGDm4KIHNpc8OkbHTDpG3DpMOkbgBlDiwgam90a2Egc2FhdGlpbiAAgikKIGt1dHN1AIIEBXV1YXJ2b25hAIcYCQ&s=napkin)

  ```
  kayttaja->selain:
  note left of selain
    kayttaja kirjottaa osoiteriville
    fullstack-exampleapp.herokuapp.com/notes
  end note
  selain->palvelin: GET fullstack-exampleapp.herokuapp.com/notes
  note left of palvelin
    Haetaan staattinen HTML-sivusto
  end note
  palvelin->selain: status 200, sivun HTML-koodi

  selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.css
  note left of palvelin
    Haetaan staattinen tyylitiedosto
  end note
  palvelin->selain: status 200, tyylitiedosto

  selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.js
  note left of palvelin
    Haetaan staattinen skriptitiedosto
  end note
  palvelin->selain: status 200, skripti

  selain->palvelin: GET fullstack-exampleapp.herokuapp.com/data.json
  note left of selain
   selain näyttää palvelimen palauttaman HTML,
   joka on tyylitelty tyylitiedoston mukaisesti
  end note
  palvelin->selain: status 200, muistiinpanot JSON-muodossa

  note left of selain
   selain rikastaa aiemmin näytetyn HTML-sivuston
   sisältämään muistiinpanot, jotka saatiin data.json
   kutsun paluuarvona
  end note
  ```

- [x] 0.4 Uusi muistiinpano

  ![Sekvenssikaavio](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIGtheXR0YWphCiAgSmF0a2V0YWFuIHRlaHTDpHbDpG4gMC4zIHRpbGFudGVlc3RhCmVuZCBub3RlCgoAMggtPnNlbGFpbjoKAFEFbGVmdCBvZiAADwYKICBLw6R5dHTDpGrDpCBzecO2dHTDpMOkIHZlcmtrb3NpdnVsbGEgbsOka3kAbAVsb21ha2tlZW4KICB0ZWtzdGlrZW50dMO2w7ZuIG11aXN0aWlucGFub24gamEgcGFpbmFhIFRhbGxldGEKICAtcGFpbmlrZXQAgSAMAIEbBi0-cGFsdmVsaW46IFBPU1QgZnVsbHN0YWNrLWV4YW1wbGVhcHAuaGVyb2t1YXBwLmNvbS9ub3RlcwCBSw4APQgKICBQAEkHIHNhYSBweXlubgCBHwZrYW5hIGsAgW4KbgogAIFyCW3DpACBOBAibm90ZSIga2VudMOkc3PDpC4AUAxraXJqb2l0dGFhAIFwD3RhbHQAgiIGZXNpbWVya2lrc2kgdGlldG9rYW50YWFuLgCDJQoAgXMIAIMlCSBzdGF0dXMgMzAyLCBsb2NhdGlvbjoAgWoqAINXF1N1b3JpdACEMRZhcGFodHVtYWtldGp1IGFsdXN0YS4KICBEYXRhLmpzb24ga3V0c3VuIHZhc3RhdWtzZXNzYSBvbiBueXQganV1cmkgbGlzw6R0dHkKIACDfw0Agm0HLCBqYSBzZSBuw6R5dGUAhGMFbgCCfAxsbGUAhTgJ&s=napkin)

  ```
  note over kayttaja
    Jatketaan tehtävän 0.3 tilanteesta
  end note

  kayttaja->selain:
  note left of selain
    Käyttäjä syöttää verkkosivulla näkyvän lomakkeen
    tekstikenttöön muistiinpanon ja painaa Talleta
    -painiketta
  end note
  selain->palvelin: POST fullstack-exampleapp.herokuapp.com/notes
  note left of palvelin
    Palvelin saa pyynnön mukana käyttäjän
    syöttämän muistiinpanon "note" kentässä.
    Palvelin kirjoittaa muistiinpanon talteen
    esimerkiksi tietokantaan.
  end note
  palvelin->selain: status 302, location: fullstack-exampleapp.herokuapp.com/notes

  note left of selain
    Suoritetaan tehtävän 0.3 tapahtumaketju alusta.
    Data.json kutsun vastauksessa on nyt juuri lisätty
    muistiinpano mukana, ja se näytetään käyttäjälle
  end note
  ```

- [x] 0.5 Single page app  
  - Tehtävän 0.5 sekvenssikaavio on lähes identtinen tehtävän 0.3 sekvenssikaavion kanssa. Ainoat erot kaaviossa ovat polku johon käyttäjä navigoi (~~`/notes`~~ -> `/spa`) sekä ladattava JS-tiedosto (~~`main.js`~~ -> `spa.js`).
- [ ] 0.6 Uusi muistiinpano SPA:ssa
