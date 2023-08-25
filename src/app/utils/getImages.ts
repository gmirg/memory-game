
import axios, { AxiosResponse } from "axios";
import { ICharacter } from "../interfaces/character.interface";




export const getImages = async (query: string) => { // Notice the async keyword here
  const apiUrl = "https://rickandmortyapi.com/api/character/" + query;
  try {
    const response = await axios.get<ICharacter>(apiUrl);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught higher up
  }
};