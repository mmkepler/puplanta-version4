import "../styles/footer.css"

export default function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer id="footer">
      <span>©{year} Puplanta</span>
      <span><a href="https://mmkepler.com" target="_blank">by Melissa Kepler</a></span>
    </footer>
  )
}
