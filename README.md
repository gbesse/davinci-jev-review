# DaVinci Jev Review

Typed transcript review that previews exact timeline markers for DaVinci Resolve. Jev detects declared issues, then chooses a caption ID; marker text is copied byte-for-byte from the source transcript. It never writes editorial feedback.

## Offline proof

```bash
npm test
npm run demo
```

The core parses SRT, performs a two-pass finite review and converts exact caption timecodes into Resolve frames. The workflow UI always previews a complete marker plan before applying it.

## Resolve workflow integration

`workflow/` is the source scaffold for a Resolve 20.1+ Workflow Integration. Install it using Blackmagic Design's Workflow Integration plugin location for your operating system, then wire the host bridge exposed by your Resolve build. The offline web preview remains usable without Resolve. Host API names and packaging should be validated against the exact Resolve Studio release before Marketplace distribution; no claim of editor-host validation is made in v0.1.0.

## Boundaries

This integration starts from text subtitles; it does not transcribe audio, inspect pixels or alter clips. A marker is a review prompt, not a factual determination. Keep provider credentials outside the packaged UI and route live inference through a trusted local or hosted gateway.

Independent community integration. MIT licensed.
