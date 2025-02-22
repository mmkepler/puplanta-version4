import "../styles/footer.css"

export default function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer id="footer">
      <p>© {year} Puplanta <a href="https://mmkepler.com" target="_blank">Melissa Kepler</a></p>
    </footer>
  )
}
