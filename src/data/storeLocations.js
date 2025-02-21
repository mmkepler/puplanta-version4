const StoreLocations = [
  {
    'image': 'https://thepetset.com/cdn/shop/files/pet-set-highlight_1080x.jpg?v=1614754844',
    'neighborhood': 'Midtown',
    'brand': 'The Pet Set',
    'address': '2480 Briarcliff Road NE #3, Atlanta, GA 30329',
    'google': 'https://maps.app.goo.gl/FDbTqxMALCaYMBfY7',
    'lat': 33.781263,
    'lng': -84.380975,
    'website': 'https://thepetset.com/',
    'phone': '(404) 633-8755',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/467586615_10160720073897864_7666546549687793354_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eQF3nlmZ0pEQ7kNvgEVa6A8&_nc_oc=AdjlAYov43tIzmweSRnJNDvXtOtT2xUn_ITTkUzw78ek6vCqq4W1gTt2MEBU8m4La0uTwjps3RFeKZ1D5VcBGWJr&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=At_tYNdsHFkuww0U2jWPZCJ&oh=00_AYBp82LBBcKAFsc6u1V9OC4RRwD3neTyIT7Og3SBG5kh0g&oe=67AEE82C',
    'neighborhood': 'Inman Park',
    'brand': 'Inman Park Pet Works',
    'address': '914 Austin Ave NE, Atlanta, GA 30307',
    'google': 'https://g.co/kgs/GBSgbf4',
    'lat': 33.762036,
    'lng': -84.357464,
    'website': 'https://www.facebook.com/InmanParkPetWorks/',
    'phone': '(404) 522-4544',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://www.highlandpet.com/site/assets/files/1/img_1064.jpeg',
    'neighborhood': 'Virginia Highlands',
    'brand': 'Highland Pet Supply',
    'address': '1186 North Highland Avenue NE, Atlanta, GA 30306',
    'google': 'https://g.co/kgs/vkLUtkR',
    'lat': 33.787013,
    'lng': -84.355976,
    'website': 'http://www.highlandpet.com/',
    'phone': '(404) 892-5900',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://images.squarespace-cdn.com/content/564107d1e4b0c7ff8f70ebff/1447103681730-YYUT5090MLG0KTROUUON/WDM-Logo-Stacked-White.png?content-type=image%2Fpng',
    'neighborhood': 'Piedmont Park',
    'brand': 'The Whole Dog Market',
    'address': '931 Monroe Dr NE Ste 113B, Atlanta, GA 30308',
    'google': 'https://g.co/kgs/99HGc91',
    'lat': 33.781368,
    'lng': -84.368277,
    'website': 'https://www.thewholedogmarket.com/#featured',
    'phone': '(404) 549-2727',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://static.wixstatic.com/media/d83748_29cb0581f0b141659a57fb71a261f372~mv2.png/v1/crop/x_0,y_9,w_500,h_255/fill/w_470,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PPS%20Logo%20Bright%202024.png',
    'neighborhood': 'East Atlanta',
    'brand': 'Park Pet Supply',
    'address': '479-A Flat Shoals Ave SE, Atlanta, GA 30316',
    'google': 'https://g.co/kgs/DNuCx7f',
    'lat': 33.740958,
    'lng': -84.346548,
    'website': 'http://parkpetsupply.com/',
    'phone': '(404) 588-0140',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://static.wixstatic.com/media/5e045d_b5f2746dfe6a45d49a696683ff9df394~mv2.png/v1/fill/w_740,h_424,al_c,q_80,usm_0.66_1.00_0.01/5e045d_b5f2746dfe6a45d49a696683ff9df394~mv2.webp',
    'neighborhood': 'Roswell',
    'brand': 'Top Dogs Pet Boutique',
    'address': '900 Mansell Rd Ste 13, Roswell, GA 30076',
    'google': 'https://g.co/kgs/jt41BSf',
    'lat': 34.043248,
    'lng': -84.337980,
    'website': 'https://www.topdogs.net/',
    'phone': '(770) 641-8620',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://s3.us-west-2.amazonaws.com/nextpaw-assets/73136/GDS-LOGO.png',
    'neighborhood': 'Kennesaw',
    'brand': 'The Good Dog Shoppe',
    'address': '4200 Wade Green Rd NW, Kennesaw, GA 30144',
    'google': 'https://g.co/kgs/gXruJVY',
    'lat': 34.056258,
    'lng': -84.590453,
    'website': 'http://thegooddogshoppe.com/',
    'phone': '(770) 919-0333',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-1/292211206_442267587908051_5672223101235723363_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=U63XkgImW24Q7kNvgETvJVl&_nc_oc=Adij4fOuqBFiFz100lwywbgNCpT98eKKIxOjY4Ph3CHsMKnTlDxfBz9yfD_FovpA7g2kCJKRElAyt9zTXlI7gu6C&_nc_zt=24&_nc_ht=scontent-den2-1.xx&_nc_gid=AR-XbtcZpzNJ9mRFMcQqhI5&oh=00_AYAsWUU4dR6c5Q3radqmcLd35e2wEKiJ2M-6bQeaNsHVlw&oe=67AEE6E8',
    'neighborhood': 'Woodstock',
    'brand': 'Sassy Paws Pet Boutique ',
    'address': '1105 Parkside Ln, Woodstock, GA 30189',
    'google': 'https://g.co/kgs/4iRvxut',
    'lat': 34.107711,
    'lng': -84.553184,
    'website': 'https://www.facebook.com/sassypawspet/',
    'phone': '(678) 275-2126',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://static.wixstatic.com/media/d05a06_040da38167e447e49b08189b1f512a25~mv2.jpg/v1/fill/w_466,h_208,al_c,q_80,usm_0.66_1.00_0.01/d05a06_040da38167e447e49b08189b1f512a25~mv2.webp',
    'neighborhood': 'Roswell',
    'brand': 'The Downtown Pooch',
    'address': '1045 Canton St, Roswell, GA 30075',
    'google': 'https://g.co/kgs/QnwizBh',
    'lat': 34.027262,
    'lng': -84.360694,
    'website': 'https://www.thedowntownpooch.com/',
    'phone': '(678) 536-8471',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://cdn.shopify.com/s/files/1/1166/2506/t/2/assets/logo-2x.png?1',
    'neighborhood': 'Marietta',
    'brand': 'Bark Street Petopia',
    'address': '3636 Dallas Hwy, Marietta, GA 30064',
    'google': 'https://g.co/kgs/JfjgqaY',
    'lat': 33.952148,
    'lng': -84.549258,
    'website': 'https://barkstreetpetopia.com/',
    'phone': '(470) 485-2345',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://www.petsuppliesplus.com/_next/image?url=https%3A%2F%2Fprod.pspcdn.com%2Fstoreimages%2FStore4083_4083_Store_1.png&w=1080&q=75',
    'neighborhood': 'Acworth',
    'brand': 'Pet Suplies Plus',
    'address': '6199 GA-92 #160, Acworth, GA 30102',
    'google': 'https://g.co/kgs/Dx8gFCe',
    'lat': 34.090202,
    'lng': -84.585500,
    'website': 'https://www.petsuppliesplus.com/store/ga/acworth/4083-acworth/4083',
    'phone': '(770) 672-6802',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://www.petsuppliesplus.com/_next/image?url=https%3A%2F%2Fprod.pspcdn.com%2Fstoreimages%2FStore8041_8041_Store_1.jpg&w=1080&q=75',
    'neighborhood': 'Marietta',
    'brand': 'Pet Suplies Plus',
    'address': '2960 Shallowford Rd Ste 114-B, Marietta, GA 30066-3093',
    'google': 'https://g.co/kgs/fYLdca5',
    'lat': 34.034804,
    'lng': -84.466637,
    'website': 'https://www.petsuppliesplus.com/store/ga/marietta/8041-marietta/8041',
    'phone': '(770) 973-3551',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://www.petsuppliesplus.com/_next/image?url=https%3A%2F%2Fprod.pspcdn.com%2Fstoreimages%2FStore4020_4020_Store_3.jpg&w=1080&q=75',
    'neighborhood': 'Smyrna',
    'brand': 'Pet Suplies Plus',
    'address': '3240 S Cobb Dr. SE Ste. 750, Smyrna, Ga 30080',
    'google': 'https://g.co/kgs/jKpS4SH',
    'lat': 33.875113,
    'lng': -84.533618,
    'website': 'https://www.petsuppliesplus.com/store/ga/smyrna/4020-smyrna/4020',
    'phone': '(770) 431-0029',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  {
    'image': 'https://www.petsuppliesplus.com/_next/image?url=https%3A%2F%2Fprod.pspcdn.com%2Fstoreimages%2FStore8034_8034_Store_1.jpg&w=1080&q=75',
    'neighborhood': 'Carrolton',
    'brand': 'Pet Suplies Plus',
    'address': '1301-C S Park St, Cartollton, Ga 30117',
    'google': 'https://g.co/kgs/gCndgR5',
    'lat': 33.564622,
    'lng': -85.077003,
    'website': 'https://www.petsuppliesplus.com/store/ga/carrollton/8034-carrollton/8034/events/2-8-2025-vip-petcare-offers-b',
    'phone': '(770) 214-8825',
    'votes': {
      'up': 0,
      'down': 0
    }
  },
  
  
  ];
  
  export default StoreLocations;