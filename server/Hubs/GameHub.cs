using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;

public class GameHub : Hub
{
    public async Task CreateGame(string tableCode)
    {
        Console.WriteLine("CreateTable: " + tableCode);
        await Groups.AddToGroupAsync(Context.ConnectionId, tableCode);
    }
    
    public async Task JoinGame(string tableCode, string username)
    {
        Console.WriteLine($"Join Table: {tableCode} for {username}");
        await Groups.AddToGroupAsync(Context.ConnectionId, tableCode);
    }

    public async Task GroupMessage(string tableCode, string message)
    {
        Console.WriteLine($"Group Message: {message} for {tableCode}");
        await Clients.Group(tableCode).SendAsync("ReceiveMessage", message);
    }
}