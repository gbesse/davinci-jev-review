# davinci-jev-review — contrôle d’adoption · adoption check · comprobación de adopción

## Français

Point de départ local, après la préparation indiquée dans le README :

```sh
npm run demo
```

Une plage de sous-titre invalide ne doit jamais créer un marqueur sur une image arbitraire. Examinez les timecodes du plan hors ligne avant toute application dans Resolve.

## English

Local starting point, after the setup described in the README:

```sh
npm run demo
```

An invalid subtitle interval must never create a marker on an arbitrary frame. Inspect the offline plan timecodes before applying anything in Resolve.

## Español

Punto de partida local, después de la preparación descrita en el README:

```sh
npm run demo
```

Un intervalo de subtítulo no válido nunca debe crear un marcador en un fotograma arbitrario. Revise los códigos de tiempo del plan sin conexión antes de aplicarlo en Resolve.
## Variante synthétique · Synthetic variation · Variante sintética

```text
start=00:00:08,000; end=00:00:07,000
```

FR : adaptez une copie de la fixture locale à cette situation, puis vérifiez le comportement décrit ci-dessus. Les valeurs sont illustratives, pas des résultats Jev mesurés.

EN: adapt a copy of the local fixture to this situation, then check the behavior described above. Values are illustrative, not measured Jev output.

ES: adapte una copia de la fixture local a esta situación y compruebe el comportamiento descrito arriba. Los valores son ilustrativos, no resultados Jev medidos.

## Second cas · Second case · Segundo caso

```text
allowed_caption_ids=[caption_1]; returned_choice=caption_99
```

**FR :** Une réponse qui cite un identifiant hors des sous-titres soumis doit être rejetée avant la création du plan de marqueurs.

**EN:** A response citing an ID outside the submitted captions must be rejected before building the marker plan.

**ES:** Una respuesta que cita un ID fuera de los subtítulos enviados debe rechazarse antes de crear el plan de marcadores.
