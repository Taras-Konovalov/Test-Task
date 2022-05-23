import { useEffect, useMemo, useState } from "react";
import styles from "./Users.module.scss";
import { Card } from "../Card";
import Button from "../Button";
import { API_URL } from "../../utils";
import { fetchUsers } from "../../utils/api";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [allPages, setAllPages] = useState(null);
  const [countPage, setCountPage] = useState(1);
  const [dataLink, setDataLink] = useState(API_URL.USERS_GET);
  const [cardLoading, setCardLoading] = useState(false);

  const sortDataUser = useMemo(() => {
    return [...users].sort(
      (a, b) => b.registration_timestamp - a.registration_timestamp
    );
  }, [users]);

  const loadUsers = () => {
    setCardLoading(true);
    fetchUsers(dataLink).then((data) => {
      if (data.success) {
        setUsers([...users, ...data.users]);
        setDataLink(data.links.next_url);
        setCountPage(countPage + 1);
        setCardLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchUsers(dataLink).then((data) => {
      if (data.success) {
        setUsers(data.users);
        setDataLink(data.links.next_url);
        setAllPages(data.total_pages);
      }
    });
  }, []);

  return (
    <section className={styles.users} id='users'>
      <div className={styles.container}>
        <h2 className={styles.title}>Working with GET request</h2>
        <div className={styles.cards}>
          {sortDataUser.map(({ email, name, phone, photo, position }) => (
            <Card
              key={phone}
              email={email}
              name={name}
              phone={phone}
              photo={photo}
              position={position}
              cardLoading={cardLoading}
            />
          ))}
        </div>
        {countPage !== allPages && (
          <Button variant='show' onClick={loadUsers}>
            Show more
          </Button>
        )}
      </div>
    </section>
  );
};
