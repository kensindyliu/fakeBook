const uploadDiv = document.getElementById('uploadDiv');
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

uploadDiv.addEventListener('click', function () {
  fileInput.click(); // Trigger file input click on div click
});

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the selected file

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgData = e.target.result; // Get the image data
    
      // Display the image in a div
      const newImageDiv = document.createElement('div');
      newImageDiv.style.width = '300px'; // Set a specific width for the image div
      newImageDiv.style.height = '200px'; // Set a specific height for the image div
      newImageDiv.style.backgroundImage = `url(${imgData})`; // Set the background image
      newImageDiv.style.backgroundSize = 'cover'; // Adjust background size as needed
      newImageDiv.style.backgroundRepeat = 'no-repeat'; // Adjust background repeat as needed

      // Upload the file (You can perform AJAX upload here)
      // Simulating the upload process (Replace this with actual upload code)
      setTimeout(() => {
        // Once uploaded, append the div to display the image
        imageContainer.appendChild(newImageDiv);
      }, 2000); // Simulating a delay of 2 seconds for the upload process (replace with actual upload time)
    };

    reader.readAsDataURL(file); // Read the file as data URL
  }
});
