import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from "@microsoft/signalr";

const _hub = import.meta.env.VITE_HUB_URL;

export const connectHub = async ({ client, onDataReceived }) => {
  console.log(client);

  const hubConnection = new HubConnectionBuilder()
    .withUrl(_hub, {
      transport: HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .build();

  hubConnection.on(client, (data) => {
    if (onDataReceived) {
      onDataReceived(data);
    }
  });

  try {
    await hubConnection.start();
    console.log("Connected to SignalR hub");
    return hubConnection;
    // setConnection(hubConnection);
  } catch (error) {
    console.log("Connection failed: ", error);
    return null;
  }
};
export default connectHub;
