import PacienteItem from "../PacienteItem";
import styles from "./ListPacientes.module.css";

const ListaPacientes = ({ pacientes, onPacienteClick }) => {
  return (
    <div className={styles.listaPacientes}>
      {pacientes.map((paciente) => (
        <PacienteItem key={paciente.id} paciente={paciente} onClick={onPacienteClick} />
      ))}
    </div>
  );
};

export default ListaPacientes;
