import React, { useRef, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './imageslider.scss'

const ImageSlider = ({images}) => {
    const imagesRef = useRef();
    const [imgIndex, setImgIndex] = useState(0);
    function swipe(direction) {
        if (direction === "left") {
            if (imgIndex === 0) {
                setImgIndex(images.length - 1);
            } else {
                setImgIndex(imgIndex - 1);
            }
        } else {
            if (imgIndex === images.length - 1) {
                setImgIndex(0);
            } else {
                setImgIndex(imgIndex + 1);
            }
        }
    }
    return (
        <div className="imageSection">
            {
                images.length != 1 && (
                    <div className="leftBtn" onClick={() => swipe('left')}>
                        <ArrowLeftIcon />
                    </div>
                )
            }
            <div className="postImages" ref={imagesRef}>
                <img src={images[imgIndex]} alt="postImg" />
            </div>
            {
                images.length != 1 && (
                    <div className="rightBtn" onClick={() => swipe('right')}>
                        <ArrowRightIcon />
                    </div>
                )
            }
        </div>
    )
}

export default ImageSlider
