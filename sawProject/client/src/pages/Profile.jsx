import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";

// components & settings
import userInfo from "../settings/state";
import serverURL from "../config/config";

// pages
import RestrictedArea from "./RestrictedArea";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const snapUser = useSnapshot(userInfo);

  useEffect(() => {
    getElem();
  }, []);

  function getElem() {
    fetch(serverURL.development.backendUrl).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
  }

  return (
    <>
      {snapUser.uuid !== "" && snapUser.admin ? (
        <Wrapper>
          <h1>Profiles</h1>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>username</th>
                <th>created at</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.username}</th>
                  <th>{user.create_at}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </Wrapper>
      ) : (
        <RestrictedArea />
      )}
    </>
  );
};

export default Profile;

const Wrapper = styled.section`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #042247;

  table,
  thead,
  tbody,
  th {
    border: 2px solid black;
  }

  thead th {
    background-color: gray;
    color: #ffffff;
    padding: 0.5rem 2rem;
  }

  tbody th {
    background-color: #c9c9c9;
    color: #fff;
    padding: 0.5rem 2rem;
  }

  h1 {
    font-family: Nasastyle, Poppins, sans-serif;
    color: #fff;
    text-transform: uppercase;
    font-size: 6rem;
    width: 90%;
    line-height: 1.1;
  }

  p {
    color: #fff;
    width: 90%;
    margin: 2rem auto;
  }

  img {
    width: 12rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 4rem;
    }

    p {
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    section {
      position: relative;
    }

    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 0.8rem;
    }

    button {
      position: absolute;
      bottom: 17%;
      left: 50%;
      transform: translateX(-50%);
    }

    .start-btn {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
  }
`;
