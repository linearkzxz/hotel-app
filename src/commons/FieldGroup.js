import React from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const FieldGroup = ({ id, type, label, help, placeholder, optionArray }) => {

  const selectFormType = (type) => {
    if (type === 'select') {
      return (
        <div>
          <FormControl componentClass={type} placeholder={placeholder}>
            <option value="select">select</option>
            <option value="other">...</option>
            {
              !!optionArray && (
                optionArray.map(item => <option value={item.value}>{item.text}</option>)
              )
            }
          </FormControl>
        </div>
      )
    }
    return (
      <div>
        <FormControl componentClass={type} placeholder={placeholder} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </div>
    )
  }

  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      {selectFormType(type)}
    </FormGroup>
  )
}

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  placeholder: PropTypes.string,
  optionArray: PropTypes.array
}

FieldGroup.defaltProps = {
  label: '',
  help: '',
  placeholder: '',
  optionArray: [],
}

export default FieldGroup
