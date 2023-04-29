import { Link } from 'react-router-dom';
import styles from './CardRepository.module.css';
import { useEffect, useState } from 'react';
import { useGitHubApi } from '../../api';
export function CardRepository({ user }) {
    const [isLoading, setIsLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const searchRepositories = async () => {
        setIsLoading(true);
        try {
            const response = await useGitHubApi.getRepositories(user);
            setRepositories(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const goToRepo = (repo) => {
        window.location.href = repo;
    }
    useEffect(() => {
        searchRepositories();
    }, [])
    return(
        <>
            {!isLoading && repositories && repositories.map((repo, index) =>
                <div key={index} className={styles.card}>
                    <div className={styles.details}>
                        <p>Name: {repo.name}</p>
                    </div>
                    <div>
                        <p>ID: {repo.id}</p>
                    </div>
                    <div className={styles.details_link}>
                        <p className={styles.link_repo} onClick={() => goToRepo(repo.html_url)}>Learn more about the repository</p>
                    </div>
                </div>
            )}
        </>
    );
}