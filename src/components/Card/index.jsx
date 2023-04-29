import { Link } from 'react-router-dom';
import styles from './Card.module.css';
export function Card({ username, id, image }) {
    return(
        <Link to={`/profile/${username}`}>
            <div className={styles.card}>
                <div className={styles.details}>
                    <img src={image} alt="" />
                    <div className={styles.username}>
                        <p>ID: {id}</p>
                        <p>Username: {username}</p>
                    </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
            </div>
        </Link>
    );
}