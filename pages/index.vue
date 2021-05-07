<template lang='pug'>
div.container
  Input.poetry-input(v-model='poetryInput', placeholder='create poetry', autofocus)
  hr.divider
  p.syllable-count(:class='syllableDisplayClasses') {{ syllableCount }} {{ pluralize(syllableCount, 'syllable') }}
</template>

<script lang='coffee'>
import { syllable } from 'syllable'

export default {
  data: () ->
    poetryInput: null
  computed:
    syllableCount: () -> if !this.poetryInput then 0 else syllable(this.poetryInput)
    syllableDisplayClasses: () -> {
      'valid': this.syllableCount == 5 || this.syllableCount == 7
      'invalid': this.syllableCount > 7
      'hidden': this.syllableCount <= 0
    }
}
</script>

<style lang='sass'>
@import '~assets/theme'

.container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  width: 100%

.poetry-input
  width: 100%

  .ivu-input
    height: 2rem

    text-align: center
    color: $body-color
    font-size: 1.5rem
    font-weight: 500

    background: none
    outline: none 
    box-shadow: none
    border: none
    border-radius: 0

.divider
  width: 8rem
  height: 2px
  margin: 0.5rem 0

  background-color: $body-color
  border: none

.syllable-count

  font-size: 1rem
  font-weight: 500
  color: $subtitle-color

  transition: color 500ms, opacity 500ms

  &.hidden
    opacity: 0

  &.valid
    color: $green

  &.invalid
    color: $red
</style>
