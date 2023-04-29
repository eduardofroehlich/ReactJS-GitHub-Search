import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Moment from 'moment';
import { Card } from '../../components/Card'
import { useParams } from 'react-router-dom';
import { useGitHubApi } from '../../api';
import LoadingSpinner from '../../components/Spinner';
import { CardRepository } from '../../components/CardRepository';
export function Profile() {
    const { user } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState('');
    const conversorDate = () => {
        const date = new Date(profile.created_at);
        const formateDate = Moment(date).format('MM/DD/YYYY');
        return formateDate;
    }
    const searchUser = async () => {
        setIsLoading(true);
        try {
            const response = await useGitHubApi.getUserByName(user);
            setProfile(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        searchUser();
    }, [])
    return(
        <>
            {isLoading && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && profile && (
                <>
                    <div className={styles.details}>
                        <img src={profile.avatar_url} alt="" />
                        <div className={styles.user}>
                            <div className={styles.details_user}>
                                <div className={styles.followers_details}>
                                    <p>ID</p>
                                    <p>{profile.id}</p>
                                </div>
                                <div className={styles.followers_details}>
                                    <p>Creation Date</p>
                                    <p>{conversorDate()}</p>
                                </div>
                                <div className={styles.followers_details}>
                                    <p>Total Repositories</p>
                                    <p>{profile.public_repos}</p>
                                </div>
                            </div>
                            <div className={styles.username_details}>
                                <h3>{profile.name} | {profile.login}</h3>
                                <a href={profile.html_url} className={styles.link_profile}>Know more about him</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <CardRepository user={profile.login} />
                    </div>
                </>
            )}
        </>
    )
}