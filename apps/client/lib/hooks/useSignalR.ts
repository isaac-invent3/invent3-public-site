import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { env } from 'next-runtime-env';

const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL');
const baseURL = NEXT_PUBLIC_API_URL;

export interface SignalRConnectionState {
  connection: HubConnection | null;
  state: HubConnectionState;
}

type SignalRType =
  | 'approvalworkflow-hub'
  | 'asset-hub'
  | 'dataUploadHistory-hub'
  | 'companies-hub'
  | 'tasks-hub'
  | 'maintenanceschedule-hub'
  | 'tickets-hub'
  | 'maintenanceplan-hub'
  | 'notification-hub'
  | 'userRole-hub'
  | 'users-hub'
  | 'vendors-hub';

const useSignalR = (path: SignalRType) => {
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [connectionState, setConnectionState] =
    useState<SignalRConnectionState>({
      connection: null,
      state: HubConnectionState.Disconnected,
    });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status !== 'authenticated' ||
      !session?.user.accessToken ||
      !session?.user.apiKey
    ) {
      console.log('Session is not ready or missing required fields.');
      return;
    }

    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/Invent3Pro/${path}`, {
        // accessTokenFactory: () => session.user.accessToken,
        withCredentials: false,
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          ApiKey: `${session.user.apiKey}`,
          ...(session?.user?.companySlug
            ? {
                'X-Tenant-ID': `${session.user.companySlug}`,
              }
            : {}),
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
        console.log(`Connected to SignalR - ${path}`);
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
  }, [session, status, path]);

  return connectionState;
};

export default useSignalR;
