// import "../App.css";
// import { useState, useEffect } from "react";

// function Carousel() {
//   const images = [
//     "/images/hero-carousel-1.jpg",
//     "/images/hero-carousel-2.jpg",
//     "/images/hero-carousel-3.jpg"
//   ];

//   const [current, setCurrent] = useState(0);

//   // Next image
//   function nextSlide() {
//     setCurrent((current + 1) % images.length);
//   }

//   // Previous image
//   function prevSlide() {
//     setCurrent((current - 1 + images.length) % images.length);
//   }

//   // Automatic slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="carousel">

//       <img
//         src={images[current]}
//         alt="Dehati Thiya Apna Dhaba"
//       />

//       <button className="prev" onClick={prevSlide}>
//         ❮
//       </button>

//       <button className="next" onClick={nextSlide}>
//         ❯
//       </button>

//       <div className="carousel-text">
//         <h1>Dehati Thiya Apna Dhaba</h1>
//         <p>Desi Swad, Apno Ke Saath!</p>
//       </div>

//       <div className="dots">
//         {images.map((image, index) => (
//           <span
//             key={index}
//             className={current === index ? "dot active-dot" : "dot"}
//             onClick={() => setCurrent(index)}
//           ></span>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Carousel;





import { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {

  const images = [
    "/images/hero-carousel-1.jpg",
    "/images/hero-carousel-2.jpg",
    "/images/hero-carousel-3.jpg"
  ];

  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent((current + 1) % images.length);
  }

  function prevSlide() {
    setCurrent((current - 1 + images.length) % images.length);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-carousel">

      <img
        src={images[current]}
        alt="Dehati Thiya Apna Dhaba"
        className="hero-image"
      />

      <div className="hero-overlay"></div>

      <button className="slider-arrow left-arrow" onClick={prevSlide}>
        ❮
      </button>

      <div className="hero-content">

        <h1>
          <span>Dehati Thiya</span> Apna Dhaba
        </h1>

        <p>
          Enjoy the authentic taste of India at Dehati Thiya Apna Dhaba.
          Delicious food, traditional flavours and warm hospitality.
          Come hungry, leave happy!
        </p>

        <div className="hero-buttons">
          <a href="/menu">Our Menu</a>
          <a href="/contact">Book a table</a>
        </div>

      </div>

      <button className="slider-arrow right-arrow" onClick={nextSlide}>
        ❯
      </button>

      <div className="slider-dots">
        {images.map((image, index) => (
          <button
            key={index}
            className={current === index ? "dot selected" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    </section>
  );
}

export default Carousel;
