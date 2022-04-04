import {useState} from 'react';
import logo1 from '../assets/gambar1.jpg'
import logo2 from '../assets/gambar2.jpg'
import logo3 from '../assets/gambar3.jpg'
import { Carousel } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item style={{ height: '25rem' }}>
          <img
            className="d-block w-100"
            src={logo1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item style={{ height: '25rem' }}>
          <img
            className="d-block w-100"
            src={logo2}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Membaca</h3>
            <p>"Membaca adalah napas hidup dan jembatan emas ke masa depan."</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: '25rem' }}>
          <img
            className="d-block w-100"
            src={logo3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Temukan jati dirimu</h3>
            <p>
            "Membaca akan membantumu menemukan dirimu."
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
 export default ControlledCarousel;