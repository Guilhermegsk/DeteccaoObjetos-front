<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <WebcamDetector @updateDetections="updateDetections" />
      </v-col>

      <v-col cols="4">
        <DetectionStats :detections="detections" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue"
import WebcamDetector from "@/components/WebcamDetector.vue"
import DetectionStats from "@/components/DetectionStats.vue"

const detections = ref([])

function updateDetections(data) {
  detections.value = data
}
</script>