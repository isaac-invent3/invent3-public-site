import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export interface SignalRConnectionState {
  connection: HubConnection | null;
  state: HubConnectionState;
}

const useSignalR = () => {
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [connectionState, setConnectionState] =
    useState<SignalRConnectionState>({
      connection: null,
      state: HubConnectionState.Disconnected,
    });

  const { data: session } = useSession();

  const hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:54728/Invent3Pro/notification-hub', {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        ApiKey: `${session?.user.apiKey}`,
      },
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .withKeepAliveInterval(15000)
    .withServerTimeout(30000)
    .build();

  const startSignalRConnection = async (): Promise<void> => {
    if (hubConnection.state !== HubConnectionState.Disconnected) {
      console.log(
        'Connection is not in the Disconnected state. Current state:',
        hubConnection.state
      );
      return;
    }

    try {
      await hubConnection.start();
      setConnectionState({
        connection: hubConnection,
        state: hubConnection.state,
      });
      console.log('Connected to SignalR');
    } catch (error) {
      console.error('Error connecting to SignalR:', error);

      reconnectTimeoutRef.current = setTimeout(
        () => startSignalRConnection(),
        5000
      );
    }
  };

  const stopSignalRConnection = async (): Promise<void> => {
    if (
      hubConnection.state === HubConnectionState.Connected ||
      hubConnection.state === HubConnectionState.Connecting
    ) {
      console.log('Stopping SignalR connection');
      await hubConnection.stop();
    }
  };

  useEffect(() => {
    startSignalRConnection();

    hubConnection.onclose(async () => {
      console.log('SignalR connection closed, attempting to reconnect...');
    });

    return () => {
      stopSignalRConnection();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return connectionState;
};

export default useSignalR;
