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

- [ ] 0.4 Uusi muistiinpano
- [ ] 0.5 Single page app
- [ ] 0.6 Uusi muistiinpano SPA:ssa
