<template lang='pug'>
div#app
  Nuxt
</template>

<style lang='sass'>
@import '~assets/theme'

html
  font-family: $font-family
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

#app
  display: flex
  justify-content: center
  align-items: center

  height: 100vh
  width: 100vw

  background-color: $background-color

  overflow-x: hidden
  overflow-y: scroll
</style>
