const BASE = 'https://dogapi.dog/api/v2'
const BREEDS = BASE + '/breeds'

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

export type ResponseType = {
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

export const fetchData = async ({ url, query = "" }: FetchDataType): Promise<ResponseType | null> => {
  try {
    const resp = await fetch(url || BREEDS + query)
    const data = resp.json()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}