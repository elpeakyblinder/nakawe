// Dentro de Frase.tsx (CORRECTO)
import styles from './Frase.module.css';

interface FraseProps {
    texto: string;
    autor: string;
}

export default function Frase({ texto, autor }: FraseProps) {
    return (
        <div className={styles.frases}>
            <div>
                <span>&quot;{texto}&quot;</span>
            </div>
            <div>
                <span>- {autor}</span>
            </div>
        </div>
    );
}