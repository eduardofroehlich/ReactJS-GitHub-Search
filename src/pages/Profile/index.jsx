import image from '../../assets/catfit.jpeg';
import styles from './Profile.module.css';
import { Card } from '../../components/Card'
export function Profile() {
    return(
        <>
            <div className={styles.details}>
                <img src={image} alt="" />
                <div className={styles.user}>
                    <div className={styles.details_user}>
                        <div className={styles.followers_details}>
                            <p>256</p>
                            <p>Seguidores</p>
                        </div>
                        <div className={styles.followers_details}>
                            <p>256</p>
                            <p>Seguidores</p>
                        </div>
                        <div className={styles.followers_details}>
                            <p>256</p>
                            <p>Seguidores</p>
                        </div>
                    </div>
                    <div className={styles.username_details}>
                        <h3>username</h3>
                        <p>description</p>
                    </div>
                </div>
            </div>
            <div>
                <Card />
            </div>
        </>
    )
}