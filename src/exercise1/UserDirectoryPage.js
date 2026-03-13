import { useState, useEffect } from 'react';
import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';

const API_URL = "https://69a1e6ca2e82ee536fa28a79.mockapi.io/users_api";


function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id"); 
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();

  }, []);

  async function handleDeleteClick(userId) {
    await fetch(`${API_URL}/${userId}`, {method: "DELETE"});
    setUsers(users.filter(user => user.id !== userId));
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort((a, b) => Number(a.user_group) - Number(b.user_group));
    setUsers(sortedUsers);
    setSortBy("group");
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort((a, b) => Number(a.id) - Number(b.id));
    setUsers(sortedUsers);
    setSortBy("id");
  }

  function handleViewToggleClick() {
    if (viewMode === "grid") {
      setViewMode("list");
    } else {
      setViewMode("grid");
    }
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onSortByIdClick={handleSortByIdClick} 
          onSortByGroupClick={handleSortByGroupClick}
          onViewToggleClick={handleViewToggleClick}
          onDeleteClick={handleDeleteClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
