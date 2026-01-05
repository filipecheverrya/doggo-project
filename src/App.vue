<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchData, type DoggoType, type BreedsType, type FactsType, fetchFacts } from './api'

const request = ref<BreedsType | null>(null)
const facts = ref<FactsType | null>(null)
const loader = ref(false)

const handleClickPagination = async (url: string) => {
  try {
    loader.value = true
    const response = await fetchData({ url })
    if (response !== null) {
      response.data.map((item) => {
        item.visible = false
        return item
      })
      request.value = response
    }
  } finally {
    loader.value = false
  }
}

const handleClickResume = (item: DoggoType) => {
  request.value?.data.map(current => {
    if (current.id === item.id) {
      if (current.visible) {
        current.visible = false
        return current
      }
      current.visible = true
    }
    return current
  })
}

onMounted(async () => {
  try {
    loader.value = true
    const response = await fetchData({ query: '?page[size]=8' })
    if (response !== null) {
      response.data.map((item) => {
        item.visible = false
        return item
      })
      request.value = response
    }

    const factsResponse = await fetchFacts()
    if (factsResponse !== null) {
      facts.value = factsResponse
    }
  } finally {
    loader.value = false
  }
})
</script>

<template>
  <div v-if="!loader">
    <h1 class="heading">
      <span>🐶</span>
      Doggos
    </h1>
    <h4 class="sub-heading">Facts</h4>
    <p>{{ facts?.data[0]?.attributes.body }}</p>
    <h4 class="sub-heading">Breeds</h4>
    <ul class="list">
      <li v-for="(item, key) in request?.data" class="list-item" :key="key">
        <h4 class="list-item-title">
          {{ item.attributes.name }}
        </h4>
        <p class="list-item-resume" :class="{ 'blur': !item.visible }">
          {{ item.attributes.description }}
        </p>
        <div class="list-item-attrs" v-show="item.visible">
          <ul class="list-item-attrs-list">
            <li>
              <strong>Weight</strong>
              <p>
                A female can weigh between {{ item.attributes.male_weight.min }} and {{ item.attributes.male_weight.max }} kgs. 
                A male can weigh between {{ item.attributes.female_weight.min }} and {{ item.attributes.female_weight.max }} kgs.
              </p>
            </li>
            <li>
              <strong>Hypoallergenic</strong>
              <p>{{ item.attributes.hypoallergenic ? "Yes" : "No" }}</p>
            </li>
            <li>
              <strong>Life time</strong>
              <p>It can live between {{ item.attributes.life.min }} and {{ item.attributes.life.max }} years.</p>
            </li>
          </ul>
        </div>
        <button class="link list-item-link" @click="handleClickResume(item)">
          See more
        </button>
      </li>
    </ul>
    <ul class="pagination">
      <li v-show="request?.meta.pagination.prev">
        <button 
          @click="handleClickPagination(request?.links.prev!)" 
          :disabled="!request?.meta.pagination.prev"
        >
          {{ request?.meta.pagination.prev }}
        </button>
      </li>
      <li>
        <button 
          @click="handleClickPagination(request?.links.current!)" 
          disabled
        >
          {{ request?.meta.pagination.current }}
        </button>
      </li>
      <li v-show="request?.meta.pagination.next">
        <button 
          @click="handleClickPagination(request?.links.next!)" 
          :disabled="!request?.meta.pagination.next"
        >
          {{ request?.meta.pagination.next }}
        </button>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2 class="sub-heading">Loading...</h2>
  </div>
</template>
