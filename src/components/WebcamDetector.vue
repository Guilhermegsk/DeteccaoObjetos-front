<template>
  <v-card>
    <v-card-title>Detector em Tempo Real</v-card-title>

    <div class="video-wrapper">
      <video ref="video" autoplay playsinline></video>
      <canvas ref="canvas"></canvas>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { connectWebSocket, sendFrame } from "@/services/websocket"

const video = ref(null)
const canvas = ref(null)

const emit = defineEmits(["updateDetections"])

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.value.srcObject = stream

  video.value.onloadedmetadata = () => {
    canvas.value.width = video.value.videoWidth
    canvas.value.height = video.value.videoHeight

    connectWebSocket((detections) => {
      drawBoxes(detections)
      emit("updateDetections", detections)
    })

    startSendingFrames()
  }
})

function startSendingFrames() {
  setInterval(() => {
    if (!video.value.videoWidth) return

    const ctx = canvas.value.getContext("2d")

    ctx.drawImage(video.value, 0, 0,
      canvas.value.width,
      canvas.value.height
    )

    const frame = canvas.value.toDataURL("image/jpeg")
    sendFrame(frame)
  }, 300)
}

function drawBoxes(detections) {
  const ctx = canvas.value.getContext("2d")
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  detections.forEach(det => {
    const [x1, y1, x2, y2] = det.xyxy[0]

    ctx.strokeStyle = "red"
    ctx.lineWidth = 2
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1)

    ctx.fillText(det.label, x1, y1 - 5)
  })
}
</script>

<style>
.video-wrapper {
  position: relative;
}
video, canvas {
  width: 100%;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>