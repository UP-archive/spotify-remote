const spt_Prev = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>katzPlayer | Previous Socket</title>
</head>
<body>
  <script type="module">
    import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

    const socket = io();

    socket.emit("controller", 'prev');
  </script>
</body>
</html>`

module.exports = spt_Prev
