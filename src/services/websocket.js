let socket = null

export function connectWebSocket(onMessage) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL
  console.log("BASE_URL:", BASE_URL)

  socket = new WebSocket(`${BASE_URL}/ws`)

  socket.onopen = () => {
    console.log(" WebSocket conectado")
  }

  socket.onmessage = (event) => {
    console.log(" Mensagem recebida:", event.data)

    try {
      const data = JSON.parse(event.data)
      console.log(" JSON parseado:", data)
      onMessage(data)
    } catch (e) {
      console.error("Erro ao parsear JSON:", e)
    }
  }

  socket.onclose = (event) => {
    console.log("WebSocket fechado:", event)
  }

  socket.onerror = (error) => {
    console.error(" Erro no WebSocket:", error)
  }
}

export function sendFrame(frame) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("Enviando frame, tamanho:", frame.length)
    socket.send(frame)
  } else {
    console.log("Socket não está pronto")
  }
}