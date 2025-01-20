import { HubConnectionState } from '@microsoft/signalr';
import { useEffect } from 'react';
import { SignalRConnectionState } from './useSignalR';

interface UseSignalREventHandlerProps {
  eventName: string;
  // eslint-disable-next-line no-unused-vars
  callback: (message: any) => void;
  connectionState: SignalRConnectionState;
}

const useSignalREventHandler = ({
  callback,
  eventName,
  connectionState,
}: UseSignalREventHandlerProps) => {
  useEffect(() => {
    const { connection, state } = connectionState;

    if (!connection || state !== HubConnectionState.Connected) return;

    const handleEvent = (message: any): void => {
      console.log('Data Received from SignalR:', message);
      callback(message);
    };

    connection.on(eventName, handleEvent);

    return () => {
      connection.off(eventName, handleEvent);
    };
  }, [connectionState, eventName, callback]);
};

export default useSignalREventHandler;
