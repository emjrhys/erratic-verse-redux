<template lang='pug'>
div.container
  Input.poetry-input(v-model='poetryInput', placeholder='create poetry', autofocus)
  hr.divider
  p.syllable-count(:class='syllableDisplayClasses') {{ syllableCount }} {{ pluralize(syllableCount, 'syllable') }}

  Button.submit(type='text', @click='handleSubmit', :disabled='!validInput')
    fIcon(type='check', :size='20')
    | submit
</template>

<script lang='coffee'>
import { syllable } from 'syllable'

export default {
  data: () ->
    poetryInput: null

  computed:
    syllableCount: () -> if !this.poetryInput then 0 else syllable(this.poetryInput)
    validInput: () -> this.syllableCount == 5 || this.syllableCount == 7
    syllableDisplayClasses: () -> {
      'valid': this.validInput
      'invalid': this.syllableCount > 7
      'hidden': this.syllableCount <= 0
    }

  methods:
    handleSubmit: () -> this.poetryInput = null
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
    font-weight: 400

    background: none
    outline: none 
    box-shadow: none
    border: none
    border-radius: 0

.divider
  width: 8rem
  height: 2px
  margin: 0.5rem 0 0.65rem

  background-color: $body-color
  border: none

.syllable-count
  font-size: 1rem
  font-weight: 500
  font-style: italic
  color: $subtitle-color

  transition: color 500ms, opacity 500ms

  &.hidden
    opacity: 0

  &.valid
    color: $green

  &.invalid
    color: $red

.submit
  margin-top: 2rem

  font-size: 1rem
  font-weight: 500
  color: $body-color

  transition: opacity 500ms, color 250ms

  &:disabled
    background: none !important
    color: $body-color
    opacity: 0

    pointer-events: none

  &:hover
    color: $green
    background: none

  &:focus
    box-shadow: none
</style>
