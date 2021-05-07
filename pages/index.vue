<template lang='pug'>
div.container
  div.haiku(v-if='selectedPhrases')
    p(ref='line1') {{ selectedPhrases[0] }}
    p(ref='line2') {{ selectedPhrases[1] }}
    p(ref='line3') {{ selectedPhrases[2] }}

  Button.generate-button(ref='generateButton', type='text', @click='generateHaiku') another one
</template>

<script lang='coffee'>
import firebase from 'firebase/app'

export default {
  name: 'Haiku'
  data: () ->
    phrases: null
    selectedPhrases: null

  computed:
    fiveSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 5).map((e) -> e.text) else null
    sevenSyllablePhrases: () -> if this.phrases then this.phrases.filter((e) -> e.syllables == 7).map((e) -> e.text) else null

  methods:
    generateHaiku: () -> 
      fives = this.getRandomFromArray(this.fiveSyllablePhrases, 2)
      seven = this.getRandomFromArray(this.sevenSyllablePhrases)

      this.selectedPhrases = [fives[0], seven[0], fives[1]]

  mounted: () -> 
    ref = firebase.database().ref('phrases')
    await ref.once('value', (snapshot) => this.phrases = Object.values(snapshot.toJSON()))
    this.generateHaiku()
}
</script>

<style lang='sass'>
@import '~assets/theme'

.container
  padding-bottom: 3rem

  .haiku
    font-size: 2rem
    font-weight: 200

  .generate-button
    margin-top: 2rem
</style>