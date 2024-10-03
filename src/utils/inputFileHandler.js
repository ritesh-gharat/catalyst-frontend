import config from "../config/config.js";

class FileHandler {
  constructor() {
    this.result = {
      url: null,
      file: null,
      success: false,
    };
  }

  handleImageFile() {
    return new Promise((resolve, reject) => {
      // Create an input element of type file
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*"; // Accept only image files

      // Listen for the file selection event
      fileInput.onchange = e => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
          this.readFileData(file)
            .then(dataUrl => {
              this.result.url = dataUrl;
              this.result.file = file;
              this.result.success = true;
              resolve(this.result); // Resolve the promise with the result
            })
            .catch(error => {
              reject(error); // Reject the promise if there's an error
            });
        } else {
          reject(new Error("No file selected"));
        }
      };

      // Trigger the file input dialog
      fileInput.click();
    });
  }

  handleCameraFile() {
    return new Promise((resolve, reject) => {
      // Create an input element of type file
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*"; // Accept only image files
      fileInput.capture = "environment"; // Use "user" for the front camera

      // Listen for the file selection event
      fileInput.onchange = e => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
          this.readFileData(file)
            .then(dataUrl => {
              this.result.url = dataUrl;
              this.result.file = file;
              this.result.success = true;
              resolve(this.result); // Resolve the promise with the result
            })
            .catch(error => {
              reject(error); // Reject the promise if there's an error
            });
        } else {
          reject(new Error("No file selected"));
        }
      };

      // Trigger the file input dialog
      fileInput.click();
    });
  }

  // Function to handle the file upload
  handleFileUpload() {
    return new Promise((resolve, reject) => {
      try {
        if (this.result.success) {
          const formData = new FormData();
          formData.append("file", this.result.file);

          fetch(config.fileUploadURL, {
            method: "POST",
            body: formData,
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  `Failed to upload file: ${response.statusText}`
                );
              }
            })
            .then(data => {
              //console.log("File uploaded successfully:");
              resolve(data);
            })
            .catch(error => {
              console.error("Error handling file upload:", error);
              reject(error);
            });
        } else {
          reject(new Error("File upload not successful"));
        }
      } catch (error) {
        console.error("Error handling file upload:", error);
        reject(error);
      }
    });
  }

  // Function to remove the file
  handleRemoveFile() {
    // Reset the result object
    this.result = {
      url: null,
      file: null,
      success: false,
    };
  }

  // Function to read the file data
  readFileData(file) {
    return new Promise((resolve, reject) => {
      //console.log(file);
      if (file) {
        if (file.size < 1 * 1024 * 1024) {
          // Check if the file size is less than 2MB
          // Use FileReader to read the file's data URL
          const reader = new FileReader();
          reader.onload = loadEvent => {
            resolve(loadEvent.target.result); // Resolve the promise with the file data URL
          };
          reader.onerror = error => {
            reject(error); // Reject the promise if there's an error
          };
          reader.readAsDataURL(file); // Read the file as a data URL
        } else {
          //alert("File is too large. Please select a file less than 1MB.");
          reject(new Error("File is too large")); // Reject the promise if the file is too large
        }
      } else {
        reject(new Error("No file selected")); // Reject the promise if no file is selected
      }
    });
  }
}

// Create an instance of the FileHandler class
const fileHandler = new FileHandler();

export default fileHandler;