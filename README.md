# onyx-bpm-calc

Calculate the speed wheel value in Onyx for a specific BPM with this tool.

Uses the following approximation formula: `speedValue ≈ 1000 × (BPM / 360) ^ (1/1.95)`, which is better at approximating speed values for BPMs below 200.
