function IndexPage(session) {
  const index = `<!DOCTYPE html>
<html>
  <head>
    <title>katzPlayer</title>
  </head>
  <body>
    <h1>dethzPlayer</h1>
    <button id="togglePlay">Toggle Play</button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script>
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = "${session}";
        const player = new Spotify.Player({
          name: "katz",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.1,
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: "Bearer ${session}",
            }),
            body: JSON.stringify({
              device_ids: [device_id],
              play: true,
            }),
          });
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
          window.location.replace('/api/auth/logout')
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
          window.location.replace('/api/auth/logout')
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        document.getElementById("togglePlay").onclick = function () {
          player.togglePlay();
        };

        player.connect();
      };
    </script>
  </body>
</html>
`
  return index
}

module.exports = IndexPage
