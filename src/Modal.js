import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '60%',
  left: '50%',
  backgroundColor: '#a2d0ff',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '92%'
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: '0%',
  left: '0%',
  // right: 0,
  // bottom: 0,
  // backgroundColor :  '#FF8C00',
  // height: '90%',
  //  width: '96%',
  // backgroundColor:  #FF8C00 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}
export default function Modal({ children, onClose }) {

    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <button className='btn bg-secondary fs-6' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> x </button>
          {children}
        </div>
      </>,
      document.getElementById('cart-root')
    )
  }