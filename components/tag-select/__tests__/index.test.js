import React from 'react'
import { render, mount } from 'enzyme'
import TagSelect from '..'
import sinon from 'sinon'

const options = [{
  id: 1,
  text: 'John'
}, {
  id: 2,
  text: 'Smith'
}]
describe('tag-select', () => {
  it('render correct', () => {
    const wrapper = render(
      <TagSelect options={options} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('default prop multiple is false', () => {
    const wrapper = mount(<TagSelect options={options} />)
    expect(wrapper.props().multiple).toBe(false)
  })

  it('single select click onChange correct', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TagSelect options={options} onChange={onChange} />) 

    wrapper.find('.ant-tag').first().simulate('click')
    expect(onChange.calledWith(1)).toBe(true)
  })

  it('multiple select click onChange correct', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<TagSelect options={options} onChange={onChange} multiple={true} />)

    wrapper.find('.ant-tag').first().simulate('click')
    expect(onChange.calledWith([1])).toBe(true)
  })

  it('single check', () => {
    const wrapper = render(<TagSelect options={options} defaultValue={1} />)
    expect(wrapper).toMatchSnapshot()
  })
})