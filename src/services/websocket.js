let socket = null

export function connectWebSocket(onMessage) {
  socket = new WebSocket("ws://localhost:8000/ws")

  socket.onopen = () => {
    console.log("WebSocket conectado")
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }

  socket.onclose = () => {
    console.log("WebSocket fechado")
  }
}

export function sendFrame(frame) {
  if (socket && socket.readyState === 1) {
    socket.send(frame)
  }
}