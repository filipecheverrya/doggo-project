<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchData, fetchGroups, type DoggoType, type BreedsType, type GroupsResponseType } from './api'

const request = ref<BreedsType | null>(null)
const groupeRequest = ref<GroupsResponseType | null>(null)

const handleClick = async (url: string) => {
  const response = await fetchData({ url })
  if (response !== null) {
    response.data.map((item) => {
      item.visible = false
      return item
    })
    request.value = response
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

const handleClickGroup = async (group: any) => {
  const response = await fetchGroups({ query: `/${group.id}` })
  if (response !== null) {
    
  }
}

onMounted(async () => {
  const response = await fetchData({ query: '?page[size]=8' })
  if (response !== null) {
    response.data.map((item) => {
      item.visible = false
      return item
    })
    request.value = response
  }

  const groupResponse = await fetchGroups({ query: '' })
  if (groupResponse !== null) {
    groupeRequest.value = groupResponse
  }
})
</script>

<template>
  <div>
    <h1 class="heading">
      <span>🐶</span>
      Doggos
    </h1>
    <h4 class="sub-heading">Groups</h4>
    <ul class="list-group">
      <li v-for="(item, key) in groupeRequest?.data" :key="key" class="list-group-item">
        <button @click="handleClickGroup(item)">
          {{ item.attributes.name }}
        </button>
      </li>
    </ul>
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
          @click="handleClick(request?.links.prev!)" 
          :disabled="!request?.meta.pagination.prev"
        >
          {{ request?.meta.pagination.prev }}
        </button>
      </li>
      <li>
        <button 
          @click="handleClick(request?.links.current!)" 
          disabled
        >
          {{ request?.meta.pagination.current }}
        </button>
      </li>
      <li v-show="request?.meta.pagination.next">
        <button 
          @click="handleClick(request?.links.next!)" 
          :disabled="!request?.meta.pagination.next"
        >
          {{ request?.meta.pagination.next }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
