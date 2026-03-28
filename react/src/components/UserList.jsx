// Sample component to display User.php data
import { useState, useEffect } from "react";
import { getAll, getById, getByName } from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchUsers() {
    getAll()
      .then(res => {
        setUsers(res.data);
        console.log(res); // debug
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Fail to get data";
        setFetchError(msg);
      });
  }, []);

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);
 
    const id = searchId;
    if (!id || id <= 0) {
      setFetchError("input valid ID");
      return;
    }

    getById(id)
      .then(res => {
        setSelectedUser(res.data);
        console.log(res); // debug
      })
      .catch(e => {
        const msg = e.response?.data?.message || "User not found";
        setFetchError(msg);
      });
  };

  const handleSearchName = () => {
    setFetchError("");
    setSelectedUser(null);
 
    if (searchName == "") {
      setFetchError("user name cannnot be empty");
      return;
    }
 
    getByName(searchName)
      .then(res => {
        if(res == 'Not found'){
          setFetchError(res);
        }else{
          setSelectedUser(res);
        }
      })
      .catch(e => {
        const msg = e.response?.data?.message || "User not found";
        setFetchError(msg);
      });
  };

  const handleClear = () => {
    setSearchId("");
    setSearchName("");
    setSelectedUser(null);
    setFetchError("");
  };

  return (
    <>
      <div>
        <h3>Try to find user by id</h3>
        <input
          type="number"
          placeholder="Search by UserID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <div>
        <h3>Try to find user by name</h3>
        <input
          type="text"
          placeholder="Search by user name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearchName}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {fetchError && <p>{fetchError}</p>}

      {selectedUser && (
        <div>
          <h3>Test:Get user by id</h3>
          <ul>
            <li><strong>UserID:</strong> {selectedUser.UserID}</li>
            <li><strong>UserName:</strong> {selectedUser.Username}</li>
            <li><strong>User Email:</strong> {selectedUser.Email}</li>
            <li><strong>User Datajoined:</strong> {selectedUser.DateJoined}</li>
            <li><strong>User Availability:</strong> {selectedUser.Availability}</li>
          </ul>
        </div>
      )}

      <div>
          <h3>Test:Get all users</h3>
          <ul>
              {users.map((user) => (
                  <li key={user.UserID}>
                    {user.UserID}/
                    {user.Username}/
                    {user.Email}/
                    {user.DateJoined}/
                    {user.Availability}
                  </li>
              ))}
          </ul>
      </div>
    </>
  );
 }
