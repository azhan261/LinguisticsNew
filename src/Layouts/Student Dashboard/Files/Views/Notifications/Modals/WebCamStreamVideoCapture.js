import React from 'react';
import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Webcam from "react-webcam";
import { createAudioFile } from '../../../Apis/apiForAudioSending';


function WebCamStreamVideoCapture() {
    
  useEffect(() => {
    const fetchItems = async function() {
        loadFiles()
      }
    fetchItems()
    }, []);
    var PathName = window.location.pathname
    var findingIndex = PathName.indexOf("video")
    console.log(findingIndex)
    var UrlId = PathName.slice((findingIndex + 6), PathName.length)
    console.log(UrlId)
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [filesSetting, setFilesSetting] = React.useState({files: [], file: '',});
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);
  const loadFiles = () => {
    fetch('/api/files')
      .then(res => res.json())
      .then(files => {
        if (files.message) {
          console.log('No Files');
          setFilesSetting({ files: [] })
        } else {
          setFilesSetting({ files })
        }
      });
  }


  const fileChanged = (data) => {
    //const f = event.target.files[0];
    //const test = this.state.blobURL
    //console.log(f)
    console.log(data, "testing")
    filesSetting.file = data
    uploadFile()
  }
  
  const deleteFile = (event) =>{
    event.preventDefault();
    const id = event.target.id;

    fetch('/api/files/'+id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.success){
          loadFiles()
        }
        else alert('Delete Failed');
      })
  }
  
  

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      var randomValue = Math.floor((Math.random() * 100000) + 1)
      var newFileName = UrlId + "_" + randomValue + ".webm"
      var file = new File([blob], newFileName , { type: blob.type })
      fileChanged(file)
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([30]);
    }
  }, [recordedChunks]);

  const createVideoRecordingFile = (todo) => fetch("http://localhost:3001/video/create", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  }) 
  const handleClick = React.useCallback(() => {
   //createVideoRecordingFile()
  })

  const uploadFile = (event) => {
    //event.preventDefault();
    console.log(filesSetting.file)
    let data = new FormData();
    data.append('file', filesSetting.file);
    console.log(data)
    createAudioFile(data)
    /*
    fetch('/api/files', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          loadFiles();
        } else {
          alert('Upload failed');
        }
      });
      */
    }
  
    return (
      <>
               <div>
<div>
{/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid mt-5">
    {/* Page Heading */}
    <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}></h1>
    {/* DataTales Example */}
    <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
      <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}></h5>
      </div>
      <div className="card-body">
      <Webcam audio={false} ref={webcamRef} style={{height:"250px"}} />
      {capturing ? (
        <div>
           <div className="buttonNewTheme mb-2">
                        <button  className="btn m-2 shadow-sm  btn-outline-muted" style = {{fontWeight : "bold"}}  onClick={handleStopCaptureClick}>
                          <i className="fa fa-stop fa-lg"></i>
                        </button>
                    </div>
        </div>
      ) : (
        <div>
          <div className="buttonNewTheme mb-2">
                        <button  className="btn m-2 shadow-sm  btn-outline-muted" style = {{fontWeight : "bold"}}  onClick={handleStartCaptureClick}>
                          <i className="fa fa-play fa-lg"></i>
                        </button>
                    </div>
        </div>
      )}
      {recordedChunks.length > 0 && (
         <div className="buttonNewTheme mb-2">
         <button  className="btn m-2 shadow-sm  btn-outline-muted" style = {{fontWeight : "bold"}}  onClick={handleDownload}>
           <i className="fa fa-download fa-lg"></i>
         </button>
     </div>
      )}
      </div>
    </div>
  </div>
  {/* /.containerBlackDashboard-fluid */}
</div>
{/* End of Main Content */}
{/* Footer */}

{/* End of Footer */}
</div>
{/* End of Content Wrapper */}
{/* End of Page Wrapper */}
      </div>
      </div>
      </>
    );
}

export default WebCamStreamVideoCapture
