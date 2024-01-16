/** 
    const { save } = useFile();

    save("Hello World", "hello.txt", "text/plain");
*/

const useFile = () => {
  // read the contents of a file input
  const readInputFile = (inputElement, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsText(inputElement.files[0]);
  };
  // create a file input and destroy it after reading it
  const openFile = (callback) => {
    var el = document.createElement("input");
    el.setAttribute("type", "file");
    el.style.display = "none";
    document.body.appendChild(el);
    el.onchange = () => {
      readInputFile(el, (data) => {
        callback(data);
        document.body.removeChild(el);
      });
    };
    el.click();
  };

  function saveFile(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  return { saveFile, openFile };
};

export default useFile;
