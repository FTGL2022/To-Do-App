import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
 
  const [tasks, setTasks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const getData = async () => {
    if (userEmail) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos1/${userEmail}`);
        const json = await response.json();
        console.log(json);
        setTasks(json);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos1/${userEmail}`);
      const json = await response.json();
      console.log(json);
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }}, 
    []);

  console.log(tasks);

 
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
     {!authToken && <Auth/>}
     {authToken && 
     <>
     <ListHeader listname={"👨‍💻 To Do list"} getData={getData} />
     <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((tasks) => (
        <ListItem key={tasks.id} task={tasks} getData={getData} />
      ))}
      </>}
    </div>
  );
}

export default App;

