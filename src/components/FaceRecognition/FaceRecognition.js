import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {

  const faceBoxes = boxes.map((box, i) => {
    return (
      <div
        key={i}
        className={'bounding-box'}
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
        }}
      ></div>
    );
  });

  return (
    <div className='flex-column center mw6 mv4 br3 b--black-10 shadow-5 bg-near-black'>
      <p className='white f6 f5-l'>Search for an image to see if faces are detected</p>
      <div className=''>
        <div className='flex justify-center relative m-2'>
          {imageUrl !== '' && (
            <img
              className=""
              id="inputimage"
              alt="inputimage"
              src={imageUrl}
              width="480px"
              height="auto"
            />
          )}
          {boxes.length > 0 && faceBoxes}
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;
