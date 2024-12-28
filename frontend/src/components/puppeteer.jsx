import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const Puppeteer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const location = useLocation();
  const [clickedTextContent, setClickedTextContent] = useState({}); 
  const [keyValue, setKeyValue] = useState('');
        const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.htmlContent && location.state.key) {
      setHtmlContent(location.state.htmlContent);
      setKeyValue(location.state.key);
    }
  }, [location]);


const welcome=async()=>{
  try{
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      credentials: 'include',
   
})
if(!response.ok){
  throw new Error(`${response.status}`)
}
const result=await response.json()
console.log(result.terms)
navigate('/welcome', { state: result } );

} catch(error){
console.log("Error due to :",error)
}

}

useEffect(() => {
  const handleClick = (event) => {
    const element = event.target;

  
    element.style.backgroundColor = 'yellow';
    element.style.border = '2px solid red';

    if (keyValue > 0) {
      setClickedTextContent((prev) => ({
        ...prev,
        [Object.keys(location.state.column)[Object.keys(prev).length]]: element.textContent.trim(),
      }));
      
      setKeyValue((prev) => prev - 1);
    }

    if (keyValue === 1) {
      setTimeout(() => {
        sendtoserver({ ...clickedTextContent, 
          [Object.keys(location.state.column)[Object.keys(clickedTextContent).length]]: element.textContent.trim() 
        });
        console.log('Clicked Text Content:', clickedTextContent);

        setKeyValue(location.state.key);
        setClickedTextContent({});
        alert('Selection complete! Ready for new selection.');
      }, 0);
    }

    event.stopPropagation();
  };

  document.addEventListener('click', handleClick);


  return () => {
    document.removeEventListener('click', handleClick);
  };
}, [keyValue, clickedTextContent, location.state.key]);

  const sendLinkToServer = (link) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/load`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: link }),
    })
      .then((response) => response.text())
      .then((newHtml) => {
        setHtmlContent(newHtml);
      })
      .catch((error) => {
        console.error('Error sending link to server:', error);
      });
  };

  const sendtoserver = (clickedTextContent) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       dataset_name:location.state.dataset_name,
       rows:{...clickedTextContent}
      }),
      credentials: 'include',
    })
    .then((response) => response.json()) 
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error('Error sending data to server:', error);
    });
  };

  return (<><div id="content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  <button onClick={welcome} 
  className='home'
  style={{
    color: 'white',
        backgroundColor: 'blue',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '9px',
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: '1000', 
  
  
  }}>Home </button>
    
  </>)
};

export default Puppeteer;
