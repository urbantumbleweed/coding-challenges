import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Header from '../../components/Header'
import SearchTextInput from '../../components/SearchTextInput'

function setup() {
  const props = {
    addTodo: expect.createSpy()
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('header')
      expect(output.props.className).toBe('header')

      const [ h1, input ] = output.props.children

      expect(h1.type).toBe('h1')
      expect(h1.props.children).toBe('SF Food Trucks')

      expect(input.type).toBe(SearchTextInput)
      expect(input.props.placeholder).toBe('Enter the food you want?')
    });
  })
})
