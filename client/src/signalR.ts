import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export const connection = new HubConnectionBuilder()
    .withUrl('/hub')
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build()

connection.start().catch(err => console.error('SignalR failed to start', err))