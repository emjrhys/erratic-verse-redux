<template lang='pug'>
div#app
  Navbar

  div#content
    Nuxt
</template>

<script lang='coffee'>
import Navbar from '~/components/Navbar'

export default {
  components: { Navbar }
}
</script>

<style lang='sass'>
@import '~assets/theme'

html, body
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
  flex-direction: column
  align-items: center

  height: 100vh
  width: 100vw

  background-color: $background-color

  overflow: hidden

#content
  width: 100%
  flex: 1
  overflow: auto
</style>
