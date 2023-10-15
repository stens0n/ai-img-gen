import React, { useRef, useState, useEffect } from 'react';
import Default_image from '../Assets/mariosleep.gif';

const ImageGen = () => {
  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  

  // Theme state for light/dark mode
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Set the dark class to body on component mount
    document.body.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      setTheme('light');
    } else {
      document.body.classList.add('dark');
      setTheme('dark');
    }
  }

  const imageGenerator = async () => {

    
    if (inputRef.current.value === '') {
      return 0;
    }
    setloading(true);
    setError(null); // reset any previous errors

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Change hard coded API KEY at some point
           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: '512x512'
        }),
      });

      if (!response.ok) {
        throw new Error(`Script goes against OPENAI's terms of service ${response.status}`);
      }

      let data = await response.json();
      if (data && data.data && data.data[0] && data.data[0].url) {
        setImage_url(data.data[0].url);
      } else {
        throw new Error("Unexpected response format from API");
      }
    } catch (err) {
      setError(`Error generating image: ${err.message}`);
    } finally {
      setloading(false);
    }

    
  };


  return (
    
    <div 
      className={`flex flex-col items-center justify-center min-h-screen min-w-full overflow-hidden ${theme === 'light' ? 'bg-white' : 'dark:bg-gray-800'}`}
    >

      <div className='text-7xl font-light pb-8 items-center'>
         <span className='text-[#FFB612] font-bold'>AI Image Generator</span>
      </div>
      
      {/* Error message display */}
      {error && <div className="text-red-500 p-4 border border-red-600 bg-red-100 rounded-md mb-4">{error}</div>}
      
      <div className='flex flex-col items-center justify-center space-y-8'>
        <div className="Image"><img src={image_url === '/' ? Default_image : image_url} alt="Generated" /></div>
        <div className="loading" style={{display: loading ? 'block' : 'none'}}>
          <div className={loading ? 'w-full md:w-[512px] lg:w-[512px] h-2 bg-[#FFB612] animate-loadingEffect' : 'w-0 h-2 bg-[#FFB612]'}></div>
          <div className={loading ? 'text-lg' : 'text-lg invisible'}>Loading Image...</div>
        </div>
      </div>
      
      <div className='flex w-full md:w-[800px] lg:w-[1000px] h-[95px] justify-around items-center rounded-full bg-[#1F3540]'>
        <input type="text" ref={inputRef} className='w-2/3 md:w-[500px] lg:w-[600px] h-[50px] bg-[#1F3540] border border-[#FFB612] rounded-full outline-none text-white text-lg pl-9 mr-9' placeholder='Detailed Description' />
        <button className='flex items-center justify-center w-1/3 md:w-[250px] lg:w-[300px] h-[85px] text-lg rounded-full bg-[#FFB612] hover:bg-[#EAA500] active:bg-[#D69400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB612] cursor-pointer' onClick={() => { imageGenerator() }}>Generate</button>
      </div>
      
      <button 
          onClick={toggleTheme}
          className={`mt-4 px-2 md:px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 text-sm md:text-base ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      
      <footer className="w-full bg-gray-900 p-4 flex justify-center items-center text-white mt-4">
        <p className="text-sm">
            Made with ❤️ by
          <div>
            <a
            className='text-[#FFB612] font-semibold' 
            href="https://www.linkedin.com/in/anthony-stenson-b33472217/" target="_blank" rel="noopener noreferrer">
                  Anthony Stenson
        
            </a>
          </div>
            
          <div className='flex items-centerflex justify-center items-center'>&copy; {new Date().getFullYear()}</div>
    
        </p>
      </footer>
    </div>
  );
};
console.log(process.env.REACT_APP_OPENAI_API_KEY);

export default ImageGen;