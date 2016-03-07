import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import SearchTextInput from '../../components/SearchTextInput'

function setup(propOverrides) {
  const props = Object.assign({
    filterTrucks: expect.createSpy(),
    revealTrucks: expect.createSpy(),
    text: 'Burger',
    placeholder: 'What needs to be done?',
  }, propOverrides)

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <SearchTextInput {...props} />
  )

  let output = renderer.getRenderOutput()

  output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('SearchTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.props.placeholder).toEqual('What needs to be done?')
      expect(output.props.value).toEqual('Burger')
      expect(output.props.className).toEqual('search-box')
    });

    it('should update value on change', () => {
      const { output, renderer } = setup()
      output.props.onChange({ target: { value: 'Burgers' } })
      const updated = renderer.getRenderOutput()
      expect(updated.props.value).toEqual('Burgers')
    });

    it('should call filterTrucks as text string length increases', () => {
      const { output, props } = setup()
      output.props.onChange({ target: { value: 'Burgers' } })
      expect(props.filterTrucks).toHaveBeenCalledWith('Burgers')
    });

    it('should call revealTrucks as text string decreases', () => {
      const { output, props } = setup()
      output.props.onChange({ target: { value: 'Burg' } })
      expect(props.revealTrucks).toHaveBeenCalledWith('Burg')
    });
  })
})
