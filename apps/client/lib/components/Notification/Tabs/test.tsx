import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Message = {
  sender: string;
  content: string;
  sentTime: Date;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const session = getSession();

  useEffect(() => {
    connectSignalR();

    return () => {
      if (connection) {
        connection.off('ReceiveMessage');
      }
    };
  }, []);

  const connectSignalR = async () => {
    const session = await getSession();

    if (!session?.user) return;
console.log('connecy', session.user)
    const connect = new HubConnectionBuilder()
      .withUrl('https://localhost:54728/Invent3Pro/notification-hub', {
        withCredentials: false,
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          ApiKey: `${session.user.apiKey}`,
        },
      })

      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);

      connect
        .start()
        .then(() => {
          connect.on('ReceiveNotification', (sender, content, sentTime) => {
            console.log({ sender, content, sentTime });
            setMessages((prev) => [...prev, { sender, content, sentTime }]);
          });
          connect.invoke('RetrieveMessageHistory');
        })

        .catch((err) =>
          console.error('Error while connecting to SignalR Hub:', err)
        );
  };
  const sendMessage = async () => {
    if (connection && newMessage.trim()) {
      await connection.send('PostMessage', newMessage);
      setNewMessage('');
    }
  };
  const isMyMessage = (username: string) => {
    return connection && username === connection.connectionId;
  };
  return <></>;
};
export default Chat;
