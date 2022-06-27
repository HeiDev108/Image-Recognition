import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="flex-column br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-black o-90">
      <div className="white f6 f5-ns f5-m f3-l">
        <p className="">
          {'Enter an image URL to detect faces'}
        </p>
          <div className='center pa4 br3'>
            <input 
              className='pa2 input-reset ba bg-transparent white w-70 f6' 
              type='text' onChange={onInputChange}
            />
            <button
              className='w-30 f6 f4-ns f4-m f4-m link ph3 pv2 dib white bg-purple 0-100'
              onClick={onButtonSubmit}
            >Detect</button>
          </div>
        </div>
    </div>
  );
}

export default ImageLinkForm;