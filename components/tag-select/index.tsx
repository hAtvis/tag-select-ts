import * as React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

const { CheckableTag } = Tag

export interface TagSelectProps {
  multiple?: boolean
  options: any[]
  value?: any
  onChange?: (value: any) => void,
  defaultValue?: any
}

export default class TagSelect extends React.PureComponent<TagSelectProps, any> {
  static propTypes =  {
    multiple: PropTypes.bool,
    options: PropTypes.array.isRequired 
  }

  static defaultProps = {
    multiple: false,
    onChange() {},
  }

  constructor(props) {
    super(props)
   
    const value = props.value ? props.value : props.defaultValue ? props.defaultValue : props.multiple ? [] : ''
    
    this.state = {
      value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      })
    }
  }
  handleChange = (tag: any, checked: boolean) => {
    const { multiple, onChange } = this.props
    let { value } = this.state
    let newValue 
    if (multiple) {
      if (checked) {
        if (value) {
          value.push(tag)
        } else {
          value = [tag]
        }
      } else {
        const pos = value.indexOf(tag)
        value.splice(pos, 1)
      }
      newValue = [...value]
    } else {
      if (tag != value) {
        newValue = tag
      }
    }
    if (newValue) {
      if(!('value' in this.props)) {
        this.setState({
        value: newValue,
        })
      }
      
      onChange(newValue)
    }
  }
  
  render() {
    const { options = [], multiple } = this.props
    const { value } = this.state
    const isChecked = val => {
      if (multiple) {
        return value.indexOf(val) > -1
      }
      return value == val
    }

    const tagId = opt => {
      if (typeof opt === 'string') {
        return opt
      } else if (typeof opt === 'object') {
        return opt.id  || opt.key
      }
    }

    const tagLabel = opt => {
      if (typeof opt === 'string') {
        return opt
      } else if (typeof opt === 'object') {
        return opt.label || opt.title || opt.text || opt.value
      }
    }

    return options.map((opt,idx) => {
      const id = tagId(opt)
      return <CheckableTag key={idx} checked={isChecked(id)} onChange={checked => this.handleChange(id, checked)}>{tagLabel(opt)}</CheckableTag>
    })
  }
}
