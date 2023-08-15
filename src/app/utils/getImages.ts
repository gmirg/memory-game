import axios, { AxiosResponse } from 'axios'; 

const apiUrl = 'https://rickandmortyapi.com/api/character/:id'

export const get = async <T>(url: string): Promise<T> =>
  fetch(apiUrl + url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  })