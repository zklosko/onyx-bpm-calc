# Onyx BPM Calculator

Convert a song's BPM into the speed wheel value used by Onyx, so you don't have to guess-and-check by squinting at your floor package.

🔗 **Live app:** https://zklosko.github.io/onyx-bpm-calc/

## How it works

Onyx's speed wheel doesn't map exactly to BPM, so this tool uses an approximation formula to convert between the two:

```math
speedValue ≈ 1000 × (BPM / 360) ^ (1/1.95)
```

This approximation is most accurate below 200 BPM.

## Local Development

```bash
# install dependencies
npm install

# start a local dev server with hot reload
npm run dev
```

Requires Node.js 22+.

## License

[GPL-3.0](./LICENSE)