import "../styles/footer.css"
import gitHub from "../assets/GitHub-Mark-32px.png"
import { Link } from "react-router-dom";

export default function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer id="footer">
      <span>©{year} Puplanta</span>
      <span><a href="https://mmkepler.com" target="_blank">by Melissa Kepler</a></span>
      <span><a href="https://github.com/mmkepler/puplanta-version4" target="_blank">
        <img src={gitHub} width={32} height={32} alt="The GitHub Octocat in black"/>
      </a></span>
      <Link to="/privacy">Privacy Notice</Link>
    </footer>
  )
}
