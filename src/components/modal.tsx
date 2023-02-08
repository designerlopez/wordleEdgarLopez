import styles from "./modal.module.scss";

interface ModalProps {
  type: "won" | "lost";
  completedWords: string[];
  solution: string;
}


export default function Modal({ type, completedWords, solution }: ModalProps) {
 

  return (
    <div className={styles.modalViewContainer}>
      <div className={styles.modalContainer}>
        <h2>Estadísticas</h2>
        <div className={styles.modalStatistics}>
          <div className={styles.counterGames}>
            8
            <div className={styles.counterGames_label}>Jugadas</div>
          </div>
          <div className={styles.counterVictories}>
            2
            <div className={styles.counterVictories_label}>Victorias</div>
          </div>

        </div>
        <div className={styles.messages_label}>Siguiente Palabra</div>
        <div className={styles.counterTime}>04:10</div>
        <button>Aceptar</button>

       
      </div>
    </div>
  );
}