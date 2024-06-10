import React from 'react';
import Buttons from './Buttons';
import '../components/confirmationDialog.css';

export default function ConfirmationDialog({ message, onConfirm }) {
  return (
    <div className="confirmation-dialog">
      <div className="message">{message}</div>
      <div className="buttons">
        <Buttons text="Yes" onClick={() => onConfirm(true)} />
        <Buttons text="No" onClick={() => onConfirm(false)} />
      </div>
    </div>
  );
}
