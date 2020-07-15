import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { any } from 'bluebird';
import MessagesView from './MessagesView';
import InboxListItem from './InboxListItem';

// maybe I am a popup, maybe a dropdown menu thing, maybe a separate page
interface IProps {
  user:{
    id: number,
    nameFirst: string,
    nameLast: string,
    username: string,
    email: string,
    avatar: string,
    googleId: string,
  },
}

const Messages: FC<IProps> = ({ user }) => {
  // get rid of hard coded clickedUser
  const [clickedUser, setClickedUser]: any = useState({});
  const [threads, setThreads]: any = useState([]);
  const [showMessages, setShowMessages]: any = useState(clickedUser !== {});
  useEffect(() => {
    axios
      .get(`messages/threads/${user.id}`)
      .then(response => {
        console.log(response);
        response.data.forEach((id: number) => {
          axios
            .get(`user/${id}`)
            .then(resObj => {
              setThreads((users: any) => [...users, resObj.data]);
            });
        });
        // return userArr;
      });
  }, []);

  const handleMessageView = (thread: any) => {
    console.log(thread);
    setClickedUser(thread);
    setShowMessages(!showMessages);
  };

  return (
    <div>
      {!showMessages
        ? (<div><MessagesView clickedUser={clickedUser} user={user} showMessages={showMessages} setShowMessages={setShowMessages} /></div>)
        : (
          <div>
            {threads.map((thread: any) => {
              return (
                <InboxListItem
                  thread={thread}
                  key={thread.id}
                  handleMessageView={handleMessageView}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

export default Messages;
