<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>Created by <a href="https://zklosko.github.io">Zachary Klosko</a>. </p>
      <p>The source code is licensed <a href="https://github.com/zklosko/onyx-bpm-calc/blob/main/LICENSE">GPL 3.0</a>.</p>
    </div>
  </footer>
</template>

<style scoped>
a {
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: vat(--bulma-border-weak, #ddd);
    text-underline-offset: 2px;
}
a:hover {
  color: var(--bulma-primary);
}
.footer {
  background: transparent;
  padding: 2rem 0.5rem 1rem;
}
.content {
  font-size: 0.8rem;
  color: var(--bulma-grey);
}
.content p:not(:last-child) {
  margin-bottom: 0.15rem;
}
@media (prefers-color-scheme: dark) {
  a{
    color: white;
  }
  a:hover {
    color: var(--bulma-primary);
  }
}
</style>