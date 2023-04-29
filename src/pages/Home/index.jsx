import { useEffect, useState } from 'react';
import { Card } from '../../components/Card'
import styles from './Home.module.css'
import { useGitHubApi } from '../../api/index'
import LoadingSpinner from '../../components/Spinner';
export function Home() {
    const [user, setUser] = useState('');
    const [listUser, setListUser] = useState('');
    const searchUser = async () => {
        setIsLoading(true);
        if (!user) return handleSearch();
        try {
            const response = await useGitHubApi.getUserByName(user);
            setListUser(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await useGitHubApi.getAllUsers();
            setDados(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }
    useEffect(() => { handleSearch() }, []);
    const [dados, setDados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className={styles.title}>
                <h1>Repository of Github</h1>
            </div>
            <div className={styles.search}>
                <input type='text' placeholder='Write here' onChange={(e) => setUser(e.target.value)} />
                <button onClick={()=>searchUser()}>Search</button>
            </div>
            <div>
                {isLoading && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}
                {!isLoading && !listUser && dados && dados.map((profile, index) =>

                    <div key={index} className={styles.users}>
                        <Card image={profile.avatar_url} username={profile.login} id={profile.id} />
                    </div>
                )}
                {listUser && (
                    <div className={styles.users}>
                        <Card image={listUser.avatar_url} username={listUser.login} id={listUser.id} />
                    </div>
                )}
            </div>
        </>
    )
}