import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description }) => (

  <Helmet>

    <title>{title}</title>

    <meta name="description" content={description} />

    <meta property="og:title" content={title} />

    <meta property="og:description" content={description} />

    <meta name="twitter:card" content="summary" />

  </Helmet>

);

export default SEO;
