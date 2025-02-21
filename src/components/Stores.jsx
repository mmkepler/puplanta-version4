import supabase from "../lib/supabase";
import { useEffect, useState, } from "react";
import  "../styles/stores.css"

//const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  async function getStores() {
    const { data } = await supabase.from("stores").select();
    setStores(data);
    
  }
  console.log("data ", stores)
  return (
    <div>
    <ul>
        {stores.map((item ) => (
          <li key={item.id}>{item.brand},{item.id}</li>
        ))}
      </ul>
      </div>
  )
}
