<template lang='pug'>
div.navbar
  nuxt-link.navbar-item(to='/', exact) haiku
  nuxt-link.navbar-item(to='/create') create
</template>

<script lang='coffee'>
</script>

<style lang='sass'>
@import '~assets/theme'

.navbar
  padding: 2rem 0 1rem

  &-item
    margin: 0 0.5rem 

    font-size: 1.25rem
    font-weight: 500
    color: $subtitle-color

    &-active, &:hover
      color: $body-color

    &-active
      border-bottom: 2px solid $body-color
</style>