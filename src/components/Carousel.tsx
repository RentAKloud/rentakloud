import { Component } from "solid-js";

const Carousel: Component = () => {
  return (
    <div class="carousel carousel-center rounded-box">
      <div class="carousel-item">
        <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Pizza" />
      </div>
      <div class="carousel-item">
        <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Pizza" />
      </div>
      <div class="carousel-item">
        <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Pizza" />
      </div>
      {/* <div class="carousel-item">
        <img src="/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Pizza" />
      </div>
      <div class="carousel-item">
        <img src="/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Pizza" />
      </div>
      <div class="carousel-item">
        <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Pizza" />
      </div>
      <div class="carousel-item">
        <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Pizza" />
      </div> */}
    </div>
  )
}

export default Carousel