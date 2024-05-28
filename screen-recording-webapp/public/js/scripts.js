// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startRecording');
    const stopBtn = document.getElementById('stopRecording');
    const videoElement = document.getElementById('recordedVideo');
    const downloadLink = document.getElementById('downloadLink');

    let mediaRecorder;
    let recordedChunks = [];

    // Disable stop button initially
    stopBtn.disabled = true;

    // Start recording
    startBtn.addEventListener('click', async () => {
        // Disable start button and enable stop button
        startBtn.disabled = true;
        stopBtn.disabled = false;

        // Capture the screen
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" }
            });
            videoElement.srcObject = stream;
            videoElement.muted = true;

            // Setup MediaRecorder
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = handleStop;
            mediaRecorder.start();
        } catch (error) {
            console.error("Error capturing screen:", error);
            resetButtons();
        }
    });

    // Stop recording
    stopBtn.addEventListener('click', () => {
        mediaRecorder.stop();
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
    });

    // Collect recorded chunks
    function handleDataAvailable(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    }

    // Handle stop event
    async function handleStop() {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });

        // Reset recorded chunks for the next recording
        recordedChunks = [];

        // Create a URL for the blob
        const videoURL = window.URL.createObjectURL(blob);
        videoElement.src = videoURL;
        videoElement.controls = true;
        videoElement.muted = false;

        // Enable download link
        downloadLink.href = videoURL;
        downloadLink.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
        downloadLink.style.display = 'block';

        // Reset buttons
        resetButtons();
    }

    // Reset buttons to initial state
    function resetButtons() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});
```