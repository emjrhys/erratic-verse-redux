<template lang='pug'>
div.container
  div.container-content
    div.haiku(v-if='selectedPhrases')
      p.haiku-phrase(:class='{ hidden: !animationState[0] }', @click='randomizeLine(0)') {{ selectedPhrases[0] }}
      p.haiku-phrase(:class='{ hidden: !animationState[1] }', @click='randomizeLine(1)') {{ selectedPhrases[1] }}
      p.haiku-phrase(:class='{ hidden: !animationState[2] }', @click='randomizeLine(2)') {{ selectedPhrases[2] }}

  div.container-footer
    Button.generate-button(:class='{ hidden: !animationState[3] }', type='text', @click='generateHaiku()') another one
</template>

<script lang='coffee'>
import firebase from 'firebase/app'

export default {
  name: 'Haiku'
  data: () ->
    phrases: null
    selectedPhrases: null
    animationState: [false, false, false, false]

  computed:
    fiveSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 5).map((e) -> e.text) else null
    sevenSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 7).map((e) -> e.text) else null

  methods:
    generateHaiku: (first=false) -> 
      this.animationState = [false, false, false, false]
      if !first then await this.sleep(1000)

      fives = this.getRandomFromArray(this.fiveSyllablePhrases, 2)
      seven = this.getRandomFromArray(this.sevenSyllablePhrases)

      this.selectedPhrases = [fives[0], seven, fives[1]]
      this.$nextTick(() => this.animateHaiku())

    randomizeLine: (line) -> 
      return if !this.animationState[3] # haiku animation isn't finished

      this.$set(this.animationState, line, false)
      await this.sleep(1000)

      # pick a random line that isn't already in the haiku
      newLine = this.selectedPhrases[line]
      while (this.selectedPhrases.includes(newLine))
        newLine = if line == 1 then this.getRandomFromArray(this.sevenSyllablePhrases) else this.getRandomFromArray(this.fiveSyllablePhrases)
      this.selectedPhrases[line] = newLine

      this.$set(this.animationState, line, true)

    animateHaiku: () ->
      await this.sleep(500)
      this.$set(this.animationState, 0, true)
      await this.sleep(1500)
      this.$set(this.animationState, 1, true)
      await this.sleep(1500)
      this.$set(this.animationState, 2, true)
      await this.sleep(2000)
      this.$set(this.animationState, 3, true)

  mounted: () -> 
    ref = firebase.database().ref('phrases')
    await ref.once('value', (snapshot) => this.phrases = Object.values(snapshot.toJSON()))
    this.generateHaiku(true)
}
</script>

<style lang='sass'>
@import '~assets/theme'

$transition-duration: 1000ms

.haiku
  font-size: 1.5rem
  font-weight: 200

  &-phrase
    transition: opacity $transition-duration
    cursor: pointer

.generate-button
  transition: opacity $transition-duration

.hidden
  opacity: 0
  transition: opacity 500ms
</style>