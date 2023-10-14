const controller = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>katz Controller</title>

    <style>
      @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Thai:100,200,300,regular,500,600,700);
      @import url(https://fonts.googleapis.com/css?family=Noto+Emoji:300,regular,500,600,700);

      * {
        font-family: "IBM Plex Sans Thai", sans-serif;
        transition: all .3s;
      }

      body {
        padding: 0;
        margin: 0;
      }

      .container {
        width: 100%;
        height: 100vh;
        background: #2e2f2f;
        color: whitesmoke;

        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        align-items: center;
      }

      .controller button {
        font-family: "Noto Emoji", sans-serif;
        color: whitesmoke;
        display: inline-block;
        background: transparent;
        border: none;
        font-size: 60px;
        margin: 0 1rem;
      }

      .controller button:hover {
        opacity: .6;
        transform: scale(.85);
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="controller">
        <button id="prev">⏮️</button>
        <button id="playToggle">⏯️</button>
        <button id="next">⏭️</button>
      </div>
    </div>

    <script type="module">
      import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

      const socket = io();

      document.querySelector("#playToggle").onclick = () => {
        socket.emit("controller", "play");
      };

      document.querySelector("#prev").onclick = () => {
        socket.emit("controller", "prev");
      };

      document.querySelector("#next").onclick = () => {
        socket.emit("controller", "next");
      };
    </script>
  </body>
</html>
`

module.exports = controller
