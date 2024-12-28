
import React, { useState ,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import './page1.css';

function Welcome() {
      const location = useLocation();
      console.log("thse is",location.state.username)
      const terms = location.state?.terms || [];
        const navigate = useNavigate();
      
    
    const [isDatasetDropdownOpen, setIsDatasetDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isdownload,setIsDownload]=useState(false);

    const downloadButtonRef = useRef(null);
    const dropdownRef = useRef(null);
    
    const toggleDatasetDropdown = () => {
        setIsDatasetDropdownOpen(!isDatasetDropdownOpen);
    };

  const homepage=()=>{
    navigate('/home' );
  }

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };
    
    const handleMouseEnter = () => {
        setIsDownload(true);
    };

    const handleMouseLeave = (event) => {
        if (
            downloadButtonRef.current &&
            !dropdownRef.current.contains(event.relatedTarget)
        ) {
            setIsDownload(false);
        }
    };

    async function getcsv(name){
        try{
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get/${name}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          
            credentials: 'include',
         
      })
    
      if (response.ok) {
        const a = document.createElement('a');
        a.href = response.url;
        a.download = '${name}.csv'; 
        a.click(); 
      } else {
        console.error('Failed to fetch CSV file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    }


    return (
        <>
            <div className="header">
                <div className="scraping">
                    <span className="material-icons">public</span> Web Scraping
                </div>
                <div className="download">
                <button ref={downloadButtonRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="downloadoption"
>
                    <span className="material-icons">download</span> 
                   </button>
                  
                   {isdownload && (
        <div
            ref={dropdownRef}
            className="dragdownload"
            onMouseLeave={(event) => {
                if (
                    !downloadButtonRef.current.contains(event.relatedTarget) &&
                    !dropdownRef.current.contains(event.relatedTarget)
                ) {
                    setIsDownload(false);
                }
            }}
        >
                     {terms.map((item, index)=>(
                 
                        <div className="optiondownload" 
                          onMouseLeave={handleMouseLeave}
                          key={index}
                        onClick={() => getcsv(item[0])}>
                        <span className="material-icons logo">description</span>
                        {item[0]}</div>
                    ))}
                         
                       
                        </div>
                  )}
                </div>
                <div className="question">
                    <span className="material-icons">help_outline</span>
                </div>
                <div className="circle"> { location.state ? location.state.username.charAt(0) : 'U'}
               </div>
            </div>
            <div className="layout">
                <div className="menu">
                    <div className="firstcontent">
                     
                        <div className="dropdown">
                            <button onClick={toggleDatasetDropdown} className="dropdown-toggle">
                                <span className="material-icons">format_list_bulleted</span> My Dataset
                            </button>
                            {isDatasetDropdownOpen && (
                                <div className="dropdown-options">
                                    <button onClick={homepage} className='dropdown-toggle'>
                                    <div className="option">New Dataset</div>
                                    </button>
                                    <div className="option" id="edit">Edit Dataset</div>
                                </div>
                            )}
                        </div>

                        
                        <div
                            className="dropdown"
                            style={{
                                marginTop: isDatasetDropdownOpen ? '80px' : '10px'
                            }}
                        >
                            <button onClick={toggleAccountDropdown} className="dropdown-toggle2">
                            <span className="material-icons">security</span> Account & Security
                            </button>
                            {isAccountDropdownOpen && (
                                <div className="dropdown-options">
                                    <div className="option">Account Profile</div>
                                    <div className="option">Edit Profile</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='bodypart'>
                   <div className='greet'>Good evening user
                   </div>
                   <div className='unknown'>
                   <div className='firstbox'>
                      <p> Recent activity </p>
                      
                      <div className='row header-row'>
        <h2 style={{ flex: '1', textAlign: 'center' }}>Dataset</h2>
        <h2 style={{ flex: '1', textAlign: 'center' }}>Rows</h2>
        <h2 style={{ flex: '1', textAlign: 'center' }}>Action</h2>
    </div>
    <div className='fadedline'></div>

    {terms.map((item, index) => (
    <div className="row" key={index}>
        <h2 style={{ flex: '1', textAlign: 'center' }}>{item[0] || ' '}</h2>
        <h2 style={{ flex: '1', textAlign: 'center' }}>{item[1] || ' '}</h2>
        <h2 style={{ flex: '1', textAlign: 'center' ,color:'lightblue'}}>continue</h2>
        <div className="fadingline"></div>
    </div>
))}

  
   
                
                    
                   </div>
                   <div className='user'>
                     <div id='circle'>{location.state  ? location.state.username.charAt(0) : 'U'}</div>
                     <div className='name'>{location.state ?location.state.username : 'Unknown'}</div>
                     <div className="name1">{location.state ? location.state.email : 'Unknown@gmail.com'}</div>
                   </div>
                   </div>
                </div>
            </div>
        </>
    );
}

export default Welcome;
