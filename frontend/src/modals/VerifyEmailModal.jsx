import React from 'react';
import styles from '../css/VerifyEmailModal.module.css';

const VerifyEmailModal = ({ email, verifyCode, setVerifyCode, handleCodeVerify, handleCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Email растау</h2>
        <p className={styles.modalDescription}>
          <strong>{email}</strong> поштаңызға жіберілген 5 таңбалы кодты енгізіңіз:
        </p>
        <input
          className={styles.modalInput}
          type="text"
          maxLength={5}
          placeholder="ABCDE"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
        />
        <div className={styles.modalButtons}>
          <button className={styles.verifyBtn} onClick={handleCodeVerify}>Растау</button>
          <button className={styles.cancelBtn} onClick={handleCancel}>Бас тарту</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
