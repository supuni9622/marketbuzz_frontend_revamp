import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";
import { TWebsocketMessageProps } from "@shoutout-labs/market_buzz_crm_types";
import { WebsocketMessageAction } from '@/constants';
/*
Websocket params :-
 1. socket-url : string
 2. message to be sent to the backend for initiation of process : must be value in enum WebsocketMessageAction

Websocket return :- 
    data : of any type (ex:- Sync progress object : TWebsocketSyncDataResponse)

*/

interface WebSocketData {
  dataResponse: any;
}

const useWebSocketData = (
  socketUrl: string,
  requestMessage: string | null = null // This is a string ex:- GET_SYNC_PROGRESS , must be of WebsocketMessageAction enum in crm_types
): WebSocketData => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      // "lastMessage" or "lastJsonMessage" >> null before first received message. If message.data is not JSON parsable, then this will be a static empty object
      shouldReconnect: (closeEvent) => false, // useWebSocket will retry connecting in case of connection loss, currently false -> WILL NOT RETRY
      reconnectAttempts: 10, // Attempts to should try to reconnect, default is 20
      reconnectInterval: 3000 // 3 seconds, default is 5 seconds
    }
  );

  const [dataRequest, setDataRequest] = useState<TWebsocketMessageProps>({
    action: WebsocketMessageAction.GET_SYNC_PROGRESS
  });
  const [dataResponse, setDataResponse] = useState<any>();

  useEffect(() => {
    if (readyState === 1) {
      // connection open
      if (requestMessage !== null) {
        setDataRequest(dataRequest);
      }
      sendJsonMessage(dataRequest);
    }
  }, [requestMessage, dataRequest, sendJsonMessage, readyState]);

  useEffect(() => {
    // When Sync status changes
    if (lastJsonMessage !== null) {
      setDataResponse(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return { dataResponse };
};

export default useWebSocketData;
