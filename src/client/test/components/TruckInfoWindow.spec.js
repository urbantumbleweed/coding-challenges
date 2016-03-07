import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import TruckInfoWindow from '../../components/TruckInfoWindow'

function setup( editing = false ) {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: expect.createSpy(),
    deleteTodo: expect.createSpy(),
    completeTodo: expect.createSpy()
  }

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <TruckInfoWindow {...props} />
  )

  let output = renderer.getRenderOutput()

  if (editing) {
    const label = output.props.children.props.children[1]
    label.props.onDoubleClick({})
    output = renderer.getRenderOutput()
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('TruckInfoWindow', () => {
    xit('initial render', () => {
      const { output } = setup()

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('')

      const div = output.props.children

      expect(div.type).toBe('div')
      expect(div.props.className).toBe('view')

      const [ input, label, button ] = div.props.children

      expect(input.type).toBe('input')
      expect(input.props.checked).toBe(false)

      expect(label.type).toBe('label')
      expect(label.props.children).toBe('Use Redux')

      expect(button.type).toBe('button')
      expect(button.props.className).toBe('destroy')
    })

    xit('input onChange should call completeTodo', () => {
      const { output, props } = setup()
      const input = output.props.children.props.children[0]
      input.props.onChange({})
      expect(props.completeTodo).toHaveBeenCalledWith(0)
    })

    xit('button onClick should call deleteTodo', () => {
      const { output, props } = setup()
      const button = output.props.children.props.children[2]
      button.props.onClick({})
      expect(props.deleteTodo).toHaveBeenCalledWith(0)
    })

    xit('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup()
      const label = output.props.children.props.children[1]
      label.props.onDoubleClick({})
      const updated = renderer.getRenderOutput()
      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('editing')
    })

    xit('edit state render', () => {
      const { output } = setup(true)

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('editing')

      const input = output.props.children
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.text).toBe('Use Redux')
      expect(input.props.editing).toBe(true)
    })
  })
})
