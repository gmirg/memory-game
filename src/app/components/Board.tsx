import { AnyMxRecord } from "dns";
import { useEffect, useState } from "react";
import { Iimages } from "../interfaces/image.interface";

export const Board = () => {
const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async (request:Request): any => {
      // get the data from the api
      const data = await fetch('https://yourapi.com');
      // convert the data to json
      retur await response.json();
  
      // set state with the result
      setData(json);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])
  
  return (
    <div>Board</div>
  )
}
