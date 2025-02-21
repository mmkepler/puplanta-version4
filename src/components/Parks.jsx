
import supabase  from "../lib/supabase"
import { useEffect, useState, } from "react";
import  "../styles/parks.css"



export default function Parks() {
  const [parks, setParks] = useState([]);

    useEffect(() => {
      getParks();
    }, []);

    async function getParks() {
      const { data } = await supabase.from("parks").select();
      setParks(data);
    }

    return (
      <ul>
        {parks.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
    );
}
