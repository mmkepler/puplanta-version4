import React from 'react'
import "../styles/privacy.css"

export default function Privacy() {
  return (
    <div id="privacy">
      <h1>Privacy Notice</h1>
      <p>last updated: Aug 26, 2026</p>
      <p>This is an website for a coding portfolio and not a functioning business.</p>

      <section>
        <h2>Information collected:</h2>
        <ul>
          <li>username</li>
          <li>email</li>
        </ul>
      </section>

      <section>
        <h2>How is this information used</h2>
        <p>None of this information is sold or used for advertising. This is an example project.</p>
      </section>

      <section>
        <h2>Hosting and Services</h2>
        <p>This website is hosted on Hostwinds. Auth, db and storage are through Supabase. The hosting provider may process technical information such as IP addresses and browser data as part of serving the website.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>This website doesn't use cookies due to the ways Supabase's private storage buckets work</p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>All accounts will be deleted about every three months to save space.</p>
        <p>If you would like the account deleted before then please use the information on the Account page.</p>
      </section>
      </div>
  )
}
