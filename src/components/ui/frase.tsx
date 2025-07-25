import styles from './frase.module.css';

interface FraseProps {
    texto: string;
    autor: string;
}

export default function Frase({ texto, autor }: FraseProps) {
    return (
        <div className={styles.frases}>
            <div>
                <span>"{texto}"</span>
            </div>
            <div>
                <span className={styles.autor}>- {autor}</span>
            </div>
        </div>
    );
}