<template>
  <v-card class="mt-4">
    <v-card-title>Estatísticas</v-card-title>

    <v-card-text>
      <div>Total de objetos: {{ total }}</div>

      <v-list>
        <v-list-item
          v-for="(count, label) in grouped"
          :key="label"
        >
          {{ label }} → {{ count }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  detections: Array
})

const total = computed(() => props.detections?.length || 0)

const grouped = computed(() => {
  const map = {}
  props.detections?.forEach(d => {
    map[d.label] = (map[d.label] || 0) + 1
  })
  return map
})
</script>