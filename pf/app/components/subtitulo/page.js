import styles from "./Subtitulo.module.css";

function Subtitulo({ subtitulo }) {
  return <h2 className={styles.subtitulo}>{subtitulo}</h2>;
}

export default Subtitulo;