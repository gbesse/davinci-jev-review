# DaVinci Jev Review

Typed transcript review that previews exact timeline markers for DaVinci Resolve. Jev detects declared issues, then chooses a caption ID; marker text is copied byte-for-byte from the source transcript. It never writes editorial feedback.

## Offline proof

```bash
npm test
npm run demo
```

The core parses SRT, performs a two-pass finite review and converts exact caption timecodes into Resolve frames. The workflow UI always previews a complete marker plan before applying it.

## Resolve workflow integration

`workflow/` is the source scaffold for a Resolve 20.1+ Workflow Integration. Install it using Blackmagic Design's Workflow Integration plugin location for your operating system, then wire the host bridge exposed by your Resolve build. The offline web preview remains usable without Resolve. Host API names and packaging should be validated against the exact Resolve Studio release before Marketplace distribution; no claim of editor-host validation is made in v0.1.1.

## Boundaries

This integration starts from text subtitles; it does not transcribe audio, inspect pixels or alter clips. A marker is a review prompt, not a factual determination. Keep provider credentials outside the packaged UI and route live inference through a trusted local or hosted gateway.

Independent community integration. MIT licensed.

## October 2026 improvement · Amélioration d’octobre 2026 · Mejora de octubre de 2026

Invalid or zero-length SRT intervals and nonpositive frame rates are rejected before generating markers. Run `npm test` with no Resolve installation.

Les intervalles SRT invalides ou de durée nulle et les fréquences d’images non positives sont refusés avant la génération de marqueurs. Lancez `npm test` sans installer Resolve.

Los intervalos SRT inválidos o de duración nula y las frecuencias de imagen no positivas se rechazan antes de generar marcadores. Ejecute `npm test` sin instalar Resolve.
