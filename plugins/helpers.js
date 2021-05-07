import Vue from 'vue'

export const pluralize = (count, text) => {
  return text + ((count === 1) ? '' : 's')
}

export const getRandomFromArray = (arr, n = 1) => {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len)

  if (n > len)
    throw new RangeError('getRandom: more elements taken than available')

  while (n--) {
    let x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }

  return result
}

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

Vue.mixin({
  methods: {
    pluralize,
    getRandomFromArray,
    sleep
  }
})