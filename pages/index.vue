<template lang='pug'>
div.container
  div.container-content
    div.haiku(v-if='selectedPhrases')
      p.haiku-phrase(:class='{ hidden: animationStage < 1 }') {{ selectedPhrases[0] }}
      p.haiku-phrase(:class='{ hidden: animationStage < 2 }') {{ selectedPhrases[1] }}
      p.haiku-phrase(:class='{ hidden: animationStage < 3 }') {{ selectedPhrases[2] }}

  div.container-footer
    Button.generate-button(:class='{ hidden: animationStage < 4 }', type='text', @click='generateHaiku') another one
</template>

<script lang='coffee'>
import firebase from 'firebase/app'

export default {
  name: 'Haiku'
  data: () ->
    phrases: null
    selectedPhrases: null
    animationStage: 0

  computed:
    fiveSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 5).map((e) -> e.text) else null
    sevenSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 7).map((e) -> e.text) else null

  methods:
    generateHaiku: () -> 
      this.animationStage = 0
      await this.sleep(500)
      fives = this.getRandomFromArray(this.fiveSyllablePhrases, 2)
      seven = this.getRandomFromArray(this.sevenSyllablePhrases)

      this.selectedPhrases = [fives[0], seven[0], fives[1]]
      this.animateHaiku()

    animateHaiku: () ->
      await this.sleep(500)
      this.animationStage = 1
      await this.sleep(1500)
      this.animationStage = 2
      await this.sleep(1500)
      this.animationStage = 3
      await this.sleep(2000)
      this.animationStage = 4

  mounted: () -> 
    ref = firebase.database().ref('phrases')
    await ref.once('value', (snapshot) => this.phrases = Object.values(snapshot.toJSON()))
    this.generateHaiku()
}
</script>

<style lang='sass'>
@import '~assets/theme'

.haiku
  font-size: 1.5rem
  font-weight: 200

  &-phrase
    transition: opacity 500ms

.generate-button
  transition: opacity 500ms

.hidden
  opacity: 0
</style>