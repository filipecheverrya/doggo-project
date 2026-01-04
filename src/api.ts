const BASE = 'https://dogapi.dog/api/v2'
const BREEDS = BASE + '/breeds'
const GROUPS = BASE + '/groups'

export type GroupsResponseType = {
  data: GroupsType[]
  links: {
    current: string
    self: string
  }
}

export type GroupsType = {
  attributes: {
    name: string
  }
  id: string
  relationship: {
    breeds: {
      data: []
    }
  }
  type: string
}

type MinMaxType = {
  min: number
  max: number
}

export type DoggoType = {
  attributes: {
    name: string
    description: string
    life: MinMaxType
    female_weight: MinMaxType
    male_weight: MinMaxType
    hypoallergenic: boolean
  }
  id: string
  relationship: {}
  type: string
  visible: boolean
}

export type BreedsType = {
  data: DoggoType[]
  links: {
    current: string
    self: string
    last: string
    next: string
    prev: string
    first: string
  }
  meta: {
    pagination: {
      current: number
      records: number
      next: number
      last: number
      prev: number
      first: number
    }
  }
}

type FetchDataType = {
  url?: string
  query?: string
}

export const fetchData = async ({ url, query = "" }: FetchDataType): Promise<BreedsType | null> => {
  try {
    const resp = await fetch(url || BREEDS + query)
    const data = resp.json()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

export const fetchGroups = async ({ url, query = ""}: FetchDataType): Promise<GroupsResponseType | null> => {
  try {
    const resp = await fetch(url || GROUPS + query)
    const data = resp.json()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}