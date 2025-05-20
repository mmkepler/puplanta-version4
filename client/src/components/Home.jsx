import "../styles/home.css"
import pawArt from "../assets/dogsinpaw3_t.webp"
import pawArtJ from "../assets/dogsinpaw3_t.png"
export default function Home() {
  return (
    <div id="home">
      <h1>Welcome to <span className="leckerli">Puplanta!</span></h1>
      <div id="home-content">
        <picture id="home-img">
          <source srcSet={pawArt} type="image/webp"/>
          <img id="home-paw" src={pawArtJ} alt="a peice of artwork where a pawprint is filled with pictures of dogs." fetchPriority="high"/>
        </picture>
        <span>
        <p>Find information about Dog Parks and Pet Stores in the Greater Atlanta area.</p> 
        <p>Vote on the locations you have visited and check out thier ratings.</p>
        </span>
      </div>
    </div>
  )
}
