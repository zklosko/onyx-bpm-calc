<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { update } from './lib/calc.ts'
import Footer from './lib/Footer.vue'

const bpmField = ref(120)
const bpmCalc = reactive({ val: 0, actualBpm: 0, err: 0, methodText: '' }) // don't know if I need to do this

const errClass = computed(() => {
  return Math.abs(bpmCalc.err) < 0.5
    ? 'has-text-success'
    : Math.abs(bpmCalc.err) < 3
      ? 'has-text-warning'
      : 'has-text-danger'
})

watch(
  bpmField,
  async (bpm) => {
    const result = update(bpm)
    Object.assign(bpmCalc, result)
  },
  { immediate: true },
)
</script>

<template>
  <div class="container">
    <section class="hero is-small is-primary">
      <div class="hero-body">
        <p class="title">Onyx speed wheel calculator</p>
        <p class="subtitle">Enter a target BPM to get the speed value to enter</p>
      </div>
    </section>
    <div class="box">
      <div class="block">
        <div class="label">Target BPM</div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="BPM" v-model="bpmField" />
          </div>
          <div class="control">
            <button class="button">
              <span class="icon"><i class="fa-solid fa-xmark"></i></span
              ><span><i class="fa-solid fa-2"></i></span>
            </button>
          </div>
          <div class="control">
            <button class="button is-info">
              <span class="icon"><i class="fa-solid fa-divide"></i></span
              ><span><i class="fa-solid fa-2"></i></span>
            </button>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="block"><p class="is-size-6">Speed value:</p></div>
            <div class="block">
              <p class="has-text-weight-extrabold">Whole: {{ bpmCalc.val }}</p>
              <p class="has-text-weight-medium">Half: {{ bpmCalc.val / 2 }}</p>
              <p class="has-text-weight-medium">Quarter: {{ bpmCalc.val / 4 }}</p>
            </div>
          </div>
          <div class="column has-text-centered">
            <div class="block"><p class="is-size-6">Actual BPM:</p></div>
            <div class="block">
              <p class="has-text-weight-semibold">{{ bpmCalc.actualBpm }}</p>
            </div>
          </div>
          <div class="column has-text-centered">
            <div class="block"><p class="is-size-6">BPM error:</p></div>
            <div class="block">
              <p class="has-text-weight-semibold" :class="errClass">{{ bpmCalc.err }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="columns">
          <div class="column">
            <span class="tag">
              <h6 class="subtitle is-6">{{ bpmCalc.methodText }}</h6>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css';
</style>
