import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import styles from "./Home.module.css";
import { useGitHubApi } from "../../api/index";
import LoadingSpinner from "../../components/Spinner";
export function Home() {
  const [user, setUser] = useState("");
  const [listUser, setListUser] = useState("");
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
  };
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
  };
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dados.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dados.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function nextPage() {
    if(currentPage !== npage) {
        setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if(currentPage !== 1) {
        setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <>
      <div className={styles.title}>
        <h1>Repository of Github</h1>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Write here"
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={() => searchUser()}>Search</button>
      </div>
      <div>
        {isLoading && (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading &&
          !listUser &&
          dados &&
          records.map((profile, index) => (
            <div key={index} className={styles.users}>
              <Card
                image={profile.avatar_url}
                username={profile.login}
                id={profile.id}
              />
            </div>
          ))}
        {listUser && (
          <div className={styles.users}>
            <Card
              image={listUser.avatar_url}
              username={listUser.login}
              id={listUser.id}
            />
          </div>
        )}
      </div>
      <nav>
        <ul className={styles.pagination}>
          <li className="page-item">
            <a href="#" className="page-link" onClick={() => prePage()}>
              Prev
            </a>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={() => nextPage()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
