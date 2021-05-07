<template lang='pug'>
div.container
  div.container-content
    input.phrase-input(ref='phraseInput'
                       :value='phraseInput'
                       @input='e => phraseInput = e.target.value'
                       placeholder='create poetry'
                       autofocus)
    hr.divider
    p.syllable-count(:class='syllableDisplayClasses') 
      span(v-if='syllableCount > 0') {{ syllableCount }} {{ pluralize(syllableCount, 'syllable') }}
      span(v-else) start typing

  div.container-footer(data-role='header', data-position='fixed', data-tap-toggle='false')
    Button.submit(type='text', @click='handleSubmit', :disabled='!validInput')
      fIcon(type='check', :size='20')
      | submit
</template>

<script lang='coffee'>
import firebase from 'firebase/app'
import { syllable } from 'syllable'

export default {
  name: 'Create'
  data: () ->
    phraseInput: null

  computed:
    syllableCount: () -> if !this.phraseInput then 0 else syllable(this.phraseInput)
    validInput: () -> this.syllableCount == 5 || this.syllableCount == 7
    syllableDisplayClasses: () -> {
      'valid': this.validInput
      'invalid': this.syllableCount > 7
    }

  methods:
    focusInput: () -> this.$nextTick(() => this.$refs.phraseInput.focus())

    handleSubmit: () -> 
      return if !this.validInput

      phrasesRef = firebase.database().ref('phrases')
      newPhraseRef = phrasesRef.push()
      newPhraseRef.set({
        text: this.phraseInput
        syllables: this.syllableCount
      })

      this.$Notice.open({
        title: 'phrase submitted'
        desc: this.phraseInput
        duration: 3
      })

      this.phraseInput = null
      this.focusInput()
  
  mounted: () -> 
    ref = firebase.database().ref('phrases')
    ref.once('value', (snapshot) => 
      snapshot.forEach((child) => 
        console.log(child.key, child.val())
      )
    )
    this.focusInput()
}
</script>

<style lang='sass'>
@import '~assets/theme'

.phrase-input
  width: 100%
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

  &::placeholder
    color: $subtitle-color

.divider
  width: 3rem
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
</style>
