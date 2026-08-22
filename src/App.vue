<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import { update } from './lib/calc'
import Footer from './lib/Footer.vue'

const bpmField = ref(120)
const bpmCalc = reactive({ val: 0, actualBpm: 0, err: 0, methodText: '' })

const errClass = computed(() => {
  return Math.abs(bpmCalc.err) < 0.01
    ? 'has-text-success'
    : Math.abs(bpmCalc.err) < 0.2
      ? 'has-text-warning'
      : 'has-text-danger'
})

const accuracyTagClass = computed(() => {
    return Math.abs(bpmCalc.err) < 0.01
    ? 'is-success'
    : Math.abs(bpmCalc.err) < 0.2
      ? 'is-warning'
      : 'is-danger'
})

const accuracyLabel = computed(() => {
  return Math.abs(bpmCalc.err) == 0.0 ? 'Exact match' : Math.abs(bpmCalc.err) < 0.2 ? 'Close match' : 'Rough match'
})

function clampBPM (bpm: number): number {
  return Math.round(Math.min(360, Math.max(bpm, 0)))
}

function double() {
  bpmField.value = clampBPM(bpmField.value * 2)
}

function half() {
  bpmField.value = clampBPM(bpmField.value / 2)
}

watch(
  bpmField,
  (bpm: number) => {
    const result = update(clampBPM(bpm))
    Object.assign(bpmCalc, result)
  },
  { immediate: true },
)
</script>

<template>
  <div class="page">
  <div class="container is-max-desktop">
    <header class="app-header">
      <p class="eyebrow">Onyx Fx &middot; Speed Wheel</p>
      <h1 class="title is-3">BPM Calculator</h1>
      <p class="subtitle is-6 has-text-grey">Enter a target BPM to get the speed wheel value.</p>
    </header>

    <div class="box calc-card">
      <div class="block">
        <div class="label" for="bpm-input">Target BPM</div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-medium" type="number" min="0" max="360" placeholder="Enter a BPM" v-model.number="bpmField" />
          </div>
          <div class="control">
            <button class="button is-medium" @click="double" aria-label="Double BPM">
              &times;2
            </button>
          </div>
          <div class="control">
            <button class="button is-medium is-primary" @click="half" aria-label="Half BPM">
              &divide;2
            </button>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <div class="block">
        <div class="stat-grid">
          <div class="stat">
            <p class="stat-label">Speed value:</p>
            <p class="stat-value">{{ bpmCalc.val }}</p>
            <p class="stat-sub">Half: {{ Math.round(bpmCalc.val / 2) }} &middot; Quarter: {{ Math.round(bpmCalc.val / 4) }}</p>
          </div>
          <div class="stat">
            <p class="stat-label">Actual BPM:</p>
            <p class="stat-value">{{ +(bpmCalc.actualBpm).toFixed(2) }}</p>
          </div>
          <div class="stat">
            <p class="stat-label">BPM error:</p>
            <p class="stat-value" :class="errClass">{{ bpmCalc.err }}</p>
          </div>
        </div>
      </div>

      <div class="block method-row">
        <span class="tag is-rounded" :class="accuracyTagClass">{{  accuracyLabel }}</span>
        <span class="method-text">{{ bpmCalc.methodText }}</span>
      </div>
    </div>

    <Footer />
  </div>
  </div>
</template>

<style scoped>
.page {
  padding: 3rem 1rem;
}
.app-header {
  text-align: center;
  margin-bottom: 2rem;
}
.app-header .title {
  margin-bottom: 0.25rem;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bulma-primary);
  margin-bottom: 0.25rem;
}
.calc-card {
  border: 1px solid var(--bulma-border-weak, #ececec);
  box-shadow: 0 1px 2px rgba(16, 16, 16, 0.04), 0 8px 24px rgba(16, 16, 16, 0.06);
  padding: 2rem;
}
.field-has-addons .button {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.divider {
  margin: 1.75rem 0;
  height: 1px;
  background: var(--bulma-border-weak, #ececec);
  border: none;
}
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.stat {
  text-align: center;
  padding: 0 0.5rem;
}
.stat + .stat {
  border-left: 1px solid var(--bulma-border-weak, #ececec);
}
.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--bulma-grey);
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.1;
}
.stat-sub {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--bulma-grey);
}
.method-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.method-text {
  font-size: 0.85rem;
  color: var(--bulma-grey);
}
@media (max-width: 480px) {
  .stat-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .stat + .stat {
    border-left: none;
    border-top: 1px solid var(--bulma-border-weak, #ececec);
    padding-top: 1rem;
  }
  .calc-card {
    padding: 1.5rem;
  }
}
</style>