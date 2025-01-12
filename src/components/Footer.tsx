import React from 'react'
import Link from 'next/link';
import "../styles/footer.css";

export default function Footer() {

  const date: Date = new Date();
  const year: number =  date.getFullYear();
  return (
    <footer>
      <p>©{year} Melissa Kepler </p>
      <p><Link href="https://www.mmkepler.com">mmkepler.com</Link></p>
    </footer>
  )
}
