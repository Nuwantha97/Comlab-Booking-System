import React from 'react'
import BootstrapButton from 'react-bootstrap/Button';
import '../components/buttons.css'

export default function Buttons({text, borderRadius, width, marginTop}) {

  const buttonStyle = {
    borderRadius: borderRadius, // Set the border radius using the prop
    width: width,
    marginTop: marginTop
  };

  return (
    <div>
      <><BootstrapButton variant="outline-light" className='button' style={buttonStyle}>{text}</BootstrapButton>{' '}</>
    </div>
  )
}
