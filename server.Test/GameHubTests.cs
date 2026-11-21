using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.SignalR.Client;

namespace server.Test;

public class GameHubTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    private async Task<HubConnection> ConnectAsync()
    {
        var connection = new HubConnectionBuilder()
            .WithUrl("http://localhost/hub", options =>
            {
                options.HttpMessageHandlerFactory = _ => factory.Server.CreateHandler();
                options.Transports = HttpTransportType.LongPolling;
            })
            .Build();
        await connection.StartAsync();
        return connection;
    }

    [Fact]
    public async Task Players_can_connect_to_the_hub()
    {
        await using var player = await ConnectAsync();

        Assert.Equal(HubConnectionState.Connected, player.State);
    }

    [Fact]
    public async Task Table_message_reaches_players_at_that_table_only()
    {
        await using var matt = await ConnectAsync();
        await using var alec = await ConnectAsync();
        await matt.InvokeAsync("JoinGame", "AAAA", "Matt");
        await alec.InvokeAsync("JoinGame", "BBBB", "Alec");

        var mattGot = new TaskCompletionSource<string>();
        var alecGot = new List<string>();
        matt.On<string>("ReceiveMessage", msg => mattGot.TrySetResult(msg));
        alec.On<string>("ReceiveMessage", alecGot.Add);

        await matt.InvokeAsync("GroupMessage", "AAAA", "table A message");

        Assert.Equal("table A message", await mattGot.Task.WaitAsync(TimeSpan.FromSeconds(5)));
        await Task.Delay(200);
        Assert.Empty(alecGot);
    }
}