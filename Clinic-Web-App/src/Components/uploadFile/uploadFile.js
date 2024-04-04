export  function handleFileSelect(event, setFieldValue, fileName) {
    const selectedFile = event.target.files[0];
    readFileAsBase64(selectedFile, setFieldValue, fileName);
  }


  function readFileAsBase64(file, setFieldValue, fileName) {
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result;
      setFieldValue(fileName, `${base64String}`);
    };

    reader.readAsDataURL(file);
  }