import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from './Nav.module.css'
import { SVG } from "../svg";

export const ConfirmLogout = ({visible, setVisible, onLogout}: any) => {

  return (
    <div className="card flex justify-content-center">
      <Dialog  draggable={false} visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
          <SVG.LogoutIcon/>
        </div>
        <div className="flex justify-center">
          <h1 style={{color: 'var(--primary-color)', fontSize: '27px'}}>Cerrar sesión</h1>
        </div>
        <p className="m-0 flex justify-center">
          ¿Estás seguro de que quiere cerrar sesión?
        </p>
        <div className="flex justify-center" style={{marginTop: 30}}>
          <button className={styles.btnModalLogout} onClick={() => onLogout()}>Continuar</button>
        </div>
      </Dialog>
    </div>
  )
}