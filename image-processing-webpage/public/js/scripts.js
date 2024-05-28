// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const optionsForm = document.getElementById('options-form');
    const resultSection = document.getElementById('result-section');

    function showLoader() {
        const loader = document.createElement('div');
        loader.innerHTML = 'Loading...';
        loader.id = 'loader';
        document.body.appendChild(loader);
    }

    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) document.body.removeChild(loader);
    }

    // Event listener for the image upload form
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);

        showLoader();

        // Fetch API to send the image to the server
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hideLoader();
            if(data.success) {
                alert('Image uploaded successfully!');
                // Display options for processing
                optionsForm.style.display = 'block';
                optionsForm.dataset.imageId = data.imageId; // Assuming the server returns an image ID
            } else {
                alert('Failed to upload image.');
            }
        })
        .catch(error => {
            hideLoader();
            console.error('Error:', error);
            alert('Error uploading image. Please check your network connection or try again later.');
        });
    });

    // Event listener for the image processing options form
    optionsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const imageId = optionsForm.dataset.imageId;
        const processingOptions = new FormData(optionsForm);

        showLoader();
        resultSection.innerHTML = ''; // Clear previous results

        // Fetch API to send processing options to the server
        fetch(`/process/${imageId}`, {
            method: 'POST',
            body: processingOptions,
        })
        .then(response => {
            if (!response.ok) {
                throw Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hideLoader();
            if(data.success) {
                // Display processed image or download link
                if(data.processedImageUrl) {
                    resultSection.innerHTML = `<img src="${data.processedImageUrl}" alt="Processed Image"/>`;
                } else if(data.downloadLink) {
                    resultSection.innerHTML = `<a href="${data.downloadLink}" download>Download Processed Image</a>`;
                }
                resultSection.style.display = 'block';
            } else {
                alert('Failed to process image.');
            }
        })
        .catch(error => {
            hideLoader();
            console.error('Error:', error);
            alert('Error processing image. Please check your network connection or try again later.');
        });
    });
});
```