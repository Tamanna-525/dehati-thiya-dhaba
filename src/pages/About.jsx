
// import "./About.css";

// function About() {
//   return (
//     <div className="about-page">

//       {/* <div className="about-banner">
//         <h1>About Us</h1>
//         <p>Home / About</p>
//       </div> */}

//       <div className="about-container">

//         <div className="about-image">
//           <img
//             src="/images/dhaba2.jpg"
//             alt="Dehati Thiya Apna Dhaba"
//           />
//         </div>

//         <div className="about-text">
//           <h4>ABOUT OUR DHABA</h4>

//           <h2>Welcome To Dehati Thiya Apna Dhaba</h2>

//           <p>
//             Welcome to Dehati Thiya Apna Dhaba.
//             Experience the authentic taste of Indian food
//             with a traditional dhaba atmosphere.
//           </p>

//           <p>
//             We believe in serving delicious food,
//             quality ingredients and warm hospitality.
//             Come with your family and friends and
//             enjoy memorable moments with us.
//           </p>

//           <h3>Desi Swad, Apno Ke Saath!</h3>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default About;



import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* About Banner
      <div className="about-banner">
        <h1>About Us</h1>
        <p>Home / About</p>
      </div> */}

      {/* About Information */}
      <div className="about-container">

        <div className="about-image">
          <img
            src="/images/4dd08510-acaf-471a-8a00-9f7879c5d364.webp"
            alt="Dehati Thiya Apna Dhaba"
          />
        </div>

        <div className="about-text">

          <h4>ABOUT OUR DHABA</h4>

          <h2>Welcome to Dehati Thiya Apna Dhaba</h2>

          <p>
            Located in the peaceful outskirts of Piperchhedi,
            near Nehru Nagar in Durg, Dehati Thiya Apna Dhaba
            is your go-to destination for authentic Indian
            flavours and a true rural dhaba experience.
          </p>

          <p>
            Whether you are stopping by for a quick bite,
            a late-night meal, or a relaxed dinner with
            family and friends, our doors are open 24 hours
            a day to serve you fresh, flavourful food.
          </p>

          <h3>Desi Swad, Apno Ke Saath!</h3>

        </div>

      </div>

      {/* Our Food & Vibe */}
      <section className="food-vibe">

        <div className="about-section-heading">
          <h4>OUR FOOD & VIBE</h4>
          <h2>A Place Where Taste Meets Comfort</h2>
        </div>

        <p>
          We believe great food tastes even better in a
          comfortable, down-to-earth setting. Our menu features
          a wide variety of vegetarian and non-vegetarian dishes,
          ranging from smoky tandoor starters like Paneer Lehsumi
          and Paneer Pudina to hearty Indian curries and classic
          dhaba favourites.
        </p>

        <p>
          With both indoor and open-air outdoor seating,
          we offer a cozy, laid-back atmosphere away from
          the city rush. Enjoy ample free parking, table
          service, takeout and drive-through options.
        </p>

      </section>


{/* Buddha Peace Section */}
<section className="experience-section">
  <div className="experience-text">
    <span className="section-subtitle">A PLACE OF PEACE</span>
    <h2>Find Your Peace, Feel The Calm</h2>

    <p>
      Hamare dhaba ke outdoor area mein sthit Buddha ki
      sundar pratima aapko sukoon aur positivity ka ehsaas
      karati hai. Yahan aap apne busy din se kuch pal
      nikal kar shaanti ke saath baith sakte hain.
    </p>

    <p>
      Nature ki khoobsurati, shaant mahaul aur apno ka saath
      aapke har visit ko ek yaadgaar experience banata hai.
      Kyunki hamare liye sirf achha khana hi nahi,
      balki aapka sukoon bhi zaroori hai.
    </p>
  </div>

  <div className="experience-image">
    <img src="/images/buddha.jpg" alt="Peaceful Buddha statue in outdoor area" />
  </div>
</section>


{/* Selfie Wall Section */}
<section className="experience-section reverse-section">
  <div className="experience-image">
    <img src="/images/selfie-wall.jpg" alt="Selfie and friends photo wall" />
  </div>

  <div className="experience-text">
    <span className="section-subtitle">MAKE MEMORIES HERE</span>
    <h2>Your Moments, Your Memories!</h2>

    <p>
      Khana ho delicious aur photos ho memorable!
      Hamari specially designed Selfie & Friends Wall
      aapke special moments ko aur bhi khaas banane ke liye hai.
    </p>

    <p>
      Doston ke saath masti, family ke saath yaadein,
      aur har visit ki ek perfect picture!
      Yahan sirf khana enjoy mat kijiye,
      apni khubsurat yaadon ko bhi capture kijiye.
    </p>
  </div>
</section>



      {/* Why Visit Us */}
      <section className="why-visit">

        <div className="about-section-heading">
          <h4>WHY VISIT US?</h4>
          <h2>What Makes Us Special</h2>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <h3>24/7 Open</h3>
            <p>
              Hot, freshly prepared meals whenever hunger strikes.
            </p>
          </div>

          <div className="feature-card">
            <h3>Diverse Menu</h3>
            <p>
              Extensive food options for both vegetarian
              and non-vegetarian lovers.
            </p>
          </div>

          <div className="feature-card">
            <h3>Desi Ambience</h3>
            <p>
              Relaxed indoor and outdoor seating for families,
              groups and solo travellers.
            </p>
          </div>

          <div className="feature-card">
            <h3>Warm Hospitality</h3>
            <p>
              Friendly service that makes you feel right at home.
            </p>
          </div>

        </div>

      </section>

      {/* Location */}
      <section className="about-location">

        <h2>Come as a Guest, Leave as Family!</h2>

        <p>
          Visit us in Piperchhedi, near Nehru Nagar, Durg
          and enjoy the real taste of Apna Dhaba.
        </p>

        <h3>Open 24 Hours | Every Day</h3>

      </section>
    </div>
  );
}

export default About;
