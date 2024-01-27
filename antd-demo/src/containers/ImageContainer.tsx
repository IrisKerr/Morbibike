import Image from '../../src/assets/morbibike.png'

const ImageContainer = () => {
  return (
    <>
      <div className="svg-container">
        <div className="svg-content">
          <svg
            preserveAspectRatio="xMidYMid meet"
            id="sw-js-blob-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              href={Image}
              x="0"
              y="0"
              width="150%"
              height="100%"
              clipPath="url(#myClip)"
            />
            <defs></defs>
            <clipPath id="myClip">
              <path
                width="100%"
                height="100%"
                transform="translate(50 50)"
                strokeWidth="0"
                style={{ transition: 'all 0.3s ease 0s' }}
                d="M25,-34.4C31.1,-29.9,34,-20.9,36.3,-12.2C38.7,-3.4,40.4,5.1,37.5,11.7C34.7,18.2,27.2,22.7,20.2,26.5C13.2,30.2,6.6,33.2,-0.5,33.9C-7.6,34.6,-15.3,33,-21,28.9C-26.7,24.7,-30.5,17.9,-33.8,10.4C-37.2,2.8,-40,-5.6,-37.7,-12.1C-35.3,-18.6,-27.8,-23.2,-20.6,-27.4C-13.5,-31.5,-6.7,-35.2,1.3,-37C9.4,-38.8,18.8,-38.8,25,-34.4Z"
              />
            </clipPath>
            {/* <path
          fill="url(#bg)"
          d="M25,-34.4C31.1,-29.9,34,-20.9,36.3,-12.2C38.7,-3.4,40.4,5.1,37.5,11.7C34.7,18.2,27.2,22.7,20.2,26.5C13.2,30.2,6.6,33.2,-0.5,33.9C-7.6,34.6,-15.3,33,-21,28.9C-26.7,24.7,-30.5,17.9,-33.8,10.4C-37.2,2.8,-40,-5.6,-37.7,-12.1C-35.3,-18.6,-27.8,-23.2,-20.6,-27.4C-13.5,-31.5,-6.7,-35.2,1.3,-37C9.4,-38.8,18.8,-38.8,25,-34.4Z"
          width="50%"
          height="50%"
          transform="translate(50 50)"
          strokeWidth="0"
          style={{ transition: 'all 0.3s ease 0s' }}
        ></path> */}
          </svg>
        </div>
      </div>
    </>
  )
}

export default ImageContainer
