import Vue from 'vue'
import feather from 'feather-icons'

Vue.component('fIcon', {
  functional: true,
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => feather.icons.hasOwnProperty(value)
    },
    size: {
      type: Number,
      default: 24,
      validator: (value) => !isNaN(value) && value > 0
    }
  },
  render: function (h, ctx) {
    const { contents, attrs } = feather.icons[ctx.props.type]
    attrs.width = ctx.props.size
    attrs.height = ctx.props.size

    return h('svg', { attrs, domProps: { innerHTML: contents }})
  }
})