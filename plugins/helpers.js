import Vue from 'vue'

export const pluralize = (count, text) => {
  return text + ((count === 1) ? '' : 's')
}

Vue.mixin({
  methods: {
    pluralize
  }
})