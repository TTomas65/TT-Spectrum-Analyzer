/**
 * This pen demonstrates how to use audioMotion's getData() method to
 * detect fundamental frequencies (works best for single instruments).
 *
 * It also shows how to implement a way to interactively change
 * the selected frequency range, using the mouse wheel and drag.
 *
 * For documentation and more demos visit https://audiomotion.dev
 */

// load module from Skypack CDN
import AudioMotionAnalyzer from './audioMotion-analyzer.js';

let micStream;

const micButton = document.getElementById('mic'),
      input1Button = document.getElementById('input1'),
      input2Button = document.getElementById('input2'),
      input3Button = document.getElementById('input3'),
      style1Button = document.getElementById('style1'),
      style2Button = document.getElementById('style2'),
      style3Button = document.getElementById('style3'),
      style4Button = document.getElementById('style4'),
      style5Button = document.getElementById('style5'),
      style6Button = document.getElementById('style6'),
      scaleX = document.getElementById('scaleX'),
      scaleY = document.getElementById('scaleY'),
      peaklineButton = document.getElementById('peakline'),
      peakmosaicButton = document.getElementById('peakmosaic'),
      showfpwButton = document.getElementById('showfpw'),
      freezeButton = document.getElementById('freeze'),
      resetButton = document.getElementById('reset'),
      volumeSlider = document.getElementById('volumeSlider'),
      volumeValue = document.getElementById('volumeValue'),
      maxDecibelSlider = document.getElementById('maxDecibelSlider'),
      maxDecibelValue = document.getElementById('maxDecibelValue'),
      minDecibelSlider = document.getElementById('minDecibelSlider'),
      minDecibelValue = document.getElementById('minDecibelValue');

const initialMinFreq = 10,
      initialMaxFreq = 2100;

// Create a gain node for spectrum amplitude control
let spectrumGainNode = null;

// audio source
const audioEl = document.getElementById('audio');


// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
  document.getElementById('container'),
  {
    source: audioEl,
    channelLayout: 'single',
    height: document.getElementById('container').clientHeight || window.innerHeight * 0.59,
    showScaleX: +scaleX.dataset.active,
    showScaleY: +scaleY.dataset.active,
    mode: 10, // Style I. alapértelmezett módja
    gradient: 'rainbow', // Style I. alapértelmezett gradiens
    showPeaks: false,
    fillAlpha: .2,
    lineWidth: 1.5,
    minFreq: initialMinFreq,
    maxFreq: initialMaxFreq,
    smoothing: 0.5,
    maxDecibels: -40,
    minDecibels: -120,
    maxFreq: 22000,
    fftSize: 4096, // 2^12, a megengedett tartományban (32-32768)
    peakLine: true,
    onCanvasDraw: analyzeData
  }
);

// Create gain node for spectrum amplitude control
spectrumGainNode = audioMotion.audioCtx.createGain();
spectrumGainNode.gain.value = 1; // Initial volume

// display module version
//document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;

// toggle microphone on/off
micButton.addEventListener( 'click', () => {
  // Deactivate other input buttons
  input1Button.dataset.active = '0';
  input2Button.dataset.active = '0';
  
  micButton.dataset.active = +!+micButton.dataset.active;
  if ( micButton.dataset.active == '1' ) {
    if ( navigator.mediaDevices ) {
      navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( stream => {
        // create stream using audioMotion audio context
        micStream = audioMotion.audioCtx.createMediaStreamSource( stream );
        // connect microphone stream to analyzer
        audioMotion.connectInput( micStream );
        // mute output to prevent feedback loops from the speakers
        audioMotion.volume = 0;
      })
      .catch( err => {
        alert('Microphone access denied by user');
      });
    }
    else {
      alert('User mediaDevices not available');
    }
  }
  else {
    // disconnect and release microphone stream
    audioMotion.disconnectInput( micStream, true );
  }
});

// toggle input 1 on/off
input1Button.addEventListener( 'click', () => {
  // Deactivate other input buttons
  micButton.dataset.active = '0';
  input2Button.dataset.active = '0';
  input3Button.dataset.active = '0';
  
  input1Button.dataset.active = +!+input1Button.dataset.active;
  if ( input1Button.dataset.active == '1' ) {
    // Live stream lejátszása
    audioEl.src = 'https://icast.connectmedia.hu/5201/live.mp3';
    audioEl.crossOrigin = 'anonymous';
    
    // Connect audio through gain node for spectrum amplitude control
    const audioSource = audioMotion.audioCtx.createMediaElementSource(audioEl);
    audioSource.connect(spectrumGainNode);
    spectrumGainNode.connect(audioMotion.audioCtx.destination); // For audio output
    audioMotion.connectInput(spectrumGainNode); // For spectrum analysis
    
    // Restore volume to normal level in case it was muted by microphone
    audioMotion.volume = 1;
    audioEl.play()
      .then(() => {
        console.log('Live stream playing');
      })
      .catch(error => {
        console.error('Error playing live stream:', error);
        alert('Nem sikerült a stream lejátszása: ' + error.message);
        input1Button.dataset.active = '0';
      });
  }
  else {
    // Live stream leállítása
    audioEl.pause();
    audioMotion.disconnectInput(spectrumGainNode);
    console.log('Input 1 deactivated');
  }
});

// toggle input 2 on/off
input2Button.addEventListener( 'click', () => {
  // Deactivate other input buttons
  micButton.dataset.active = '0';
  input1Button.dataset.active = '0';
  input3Button.dataset.active = '0';
  
  input2Button.dataset.active = +!+input2Button.dataset.active;
  if ( input2Button.dataset.active == '1' ) {
    // TODO: Implement input 2 functionality
    console.log('Input 2 activated');
  }
  else {
    // TODO: Implement input 2 deactivation
    console.log('Input 2 deactivated');
  }
});

// toggle input 3 on/off
input3Button.addEventListener( 'click', () => {
  // Deactivate other input buttons
  micButton.dataset.active = '0';
  input1Button.dataset.active = '0';
  input2Button.dataset.active = '0';
  
  input3Button.dataset.active = +!+input3Button.dataset.active;
  if ( input3Button.dataset.active == '1' ) {
    // TODO: Implement input 3 functionality
    console.log('Input 3 activated');
  }
  else {
    // TODO: Implement input 3 deactivation
    console.log('Input 3 deactivated');
  }
});

// Style buttons event listeners
const styleButtons = [style1Button, style2Button, style3Button, style4Button, style5Button, style6Button];

// Function to deactivate all style buttons
function deactivateStyleButtons() {
  styleButtons.forEach(button => {
    button.dataset.active = '0';
  });
}

// Add event listeners to all style buttons
styleButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Deactivate all style buttons first
    deactivateStyleButtons();
    
    // Activate the clicked button
    button.dataset.active = '1';
    
    // Apply the selected style
    applyStyle(index + 1);
  });
});

// Function to apply the selected style
function applyStyle(styleNumber) {
  console.log(`Style ${styleNumber} activated`);
  
  // TODO: Implement different visualization styles
  switch(styleNumber) {
    case 1:
      // Default style
      audioMotion.gradient = 'rainbow';
      audioMotion.mode = 10;
      break;
    case 2:
      // Blue-green style
      audioMotion.gradient = 'prism';
      audioMotion.mode = 10;
      break;
    case 3:
      // Fire style
      audioMotion.gradient = 'rainbow';
      audioMotion.mode = 0;
      break;
    case 4:
      // Electric style
      audioMotion.gradient = 'prism';
      audioMotion.mode = 0;
      break;
    case 5:
      // Monochrome style
      audioMotion.gradient = 'rainbow';
      audioMotion.mode = 1;
      break;
    case 6:
      // Custom style
      audioMotion.gradient = 'prism';
      audioMotion.mode = 1;
      break;
  }
}

// toggle scales on/off
scaleX.addEventListener( 'click', () => {
  scaleX.dataset.active = audioMotion.showScaleX = +!+scaleX.dataset.active;
});
scaleY.addEventListener( 'click', () => {
  scaleY.dataset.active = audioMotion.showScaleY = +!+scaleY.dataset.active;
});

// toggle peakline on/off
peaklineButton.addEventListener( 'click', () => {
  peaklineButton.dataset.active = +!+peaklineButton.dataset.active;
  audioMotion.peakLine = +peaklineButton.dataset.active;
  console.log('Peakline:', audioMotion.peakLine ? 'ON' : 'OFF');
});

// toggle peakmosaic on/off (using showPeaks property)
peakmosaicButton.addEventListener( 'click', () => {
  peakmosaicButton.dataset.active = +!+peakmosaicButton.dataset.active;
  audioMotion.showPeaks = +peakmosaicButton.dataset.active;
  console.log('Peakmosaic (showPeaks):', audioMotion.showPeaks ? 'ON' : 'OFF');
});

// toggle showfpw on/off (using showFPS property)
showfpwButton.addEventListener( 'click', () => {
  showfpwButton.dataset.active = +!+showfpwButton.dataset.active;
  audioMotion.showFPS = +showfpwButton.dataset.active;
  console.log('ShowFPW (showFPS):', audioMotion.showFPS ? 'ON' : 'OFF');
});

// toggle analyzer on/off
freezeButton.addEventListener( 'click', () => {
  freezeButton.dataset.active = +!+freezeButton.dataset.active;
  audioMotion.toggleAnalyzer( !+freezeButton.dataset.active );
});

// reset frequency range
resetButton.addEventListener( 'click', () => {
  audioMotion.setFreqRange( initialMinFreq, initialMaxFreq );
  updateFreqRange();
});

// volume control
volumeSlider.addEventListener('input', () => {
  const volume = parseFloat(volumeSlider.value);
  audioMotion.volume = volume;
  
  // Control spectrum amplitude through gain node
  if (spectrumGainNode) {
    spectrumGainNode.gain.value = volume;
  }
  
  updateVolumeDisplay(volume);
});

// update volume display
function updateVolumeDisplay(volume) {
  const percentage = Math.round(volume * 100);
  volumeValue.textContent = percentage + '%';
}

// initialize volume display
updateVolumeDisplay(parseFloat(volumeSlider.value));

// max decibels control
maxDecibelSlider.addEventListener('input', () => {
  const maxDb = parseInt(maxDecibelSlider.value);
  // Közvetlenül állítjuk be az audioMotion objektum maxDecibels tulajdonságát
  audioMotion.maxDecibels = maxDb;
  console.log('MAX DECIBELS értéke változott:', maxDb);
  updateMaxDecibelDisplay(maxDb);
});

// update max decibels display
function updateMaxDecibelDisplay(maxDb) {
  maxDecibelValue.textContent = maxDb + ' dB';
}

// initialize max decibels display and set initial value
updateMaxDecibelDisplay(parseInt(maxDecibelSlider.value));
// Biztosítjuk, hogy az audioMotion objektum maxDecibels értéke megegyezzen a csúszka értékével
audioMotion.maxDecibels = parseInt(maxDecibelSlider.value);

// min decibels control
minDecibelSlider.addEventListener('input', () => {
  const minDb = parseInt(minDecibelSlider.value);
  // Közvetlenül állítjuk be az audioMotion objektum minDecibels tulajdonságát
  audioMotion.minDecibels = minDb;
  console.log('MIN DECIBELS értéke változott:', minDb);
  updateMinDecibelDisplay(minDb);
});

// update min decibels display
function updateMinDecibelDisplay(minDb) {
  minDecibelValue.textContent = minDb + ' dB';
}

// initialize min decibels display and set initial value
updateMinDecibelDisplay(parseInt(minDecibelSlider.value));
// Biztosítjuk, hogy az audioMotion objektum minDecibels értéke megegyezzen a csúszka értékével
audioMotion.minDecibels = parseInt(minDecibelSlider.value);

// minimum distance (in Hz) between two data points for them to be considered different peaks
const minDistance = 3;

// display peak frequencies
const elPeakSelect = document.getElementById('peak-count'),
      ctx      = audioMotion.canvasCtx,
      canvas   = ctx.canvas,
      fontSize = 16;

function analyzeData() {
  const bars = audioMotion.getBars();
  
  // sort bars by value (amplitude)
  bars.sort( ( a, b ) => b.value - a.value );
  
  if ( bars[0].value == 0 )
    return;
  
  ctx.fillStyle = '#fff';
  ctx.font = `${fontSize}px sans-serif`;

  for ( let i = 0, peaks = [], peakCount = elPeakSelect.value; i < peakCount; i++ ) {
    const peak = bars[ i ];

    // check if data points are not too close
    if ( peaks.find( f => Math.abs( peak.freqLo - f ) < minDistance ) ) {
      if ( peakCount < bars.length )
        peakCount++;
      continue; // skip this peak
    }

    // save this peak
    peaks.push( peak.freqLo );

    ctx.textAlign = peak.posX < canvas.width * .9 ? 'left' : 'right';
    const posY = Math.max( fontSize, canvas.height * ( 1 - peak.value ) );
    ctx.fillText( peak.freqLo.toFixed(2) + 'Hz', peak.posX, posY );
  }
}

// limit mouse wheel / touchpad sensitivity
let wheelDelay    = 50,
    wheelUpdating = false;

// zoom horizontal scale in/out
canvas.addEventListener( 'wheel', e => {
	e.preventDefault();
	if ( wheelUpdating )
		return;
	wheelUpdating = true;
	setTimeout( () => wheelUpdating = false, wheelDelay );

  const minFreq = audioMotion.minFreq,
        maxFreq = audioMotion.maxFreq,
        incr    = e.deltaY < 0 ? .8 : 1.25;
  
  // limit max zoom-in
  if ( e.deltaY < 0 && Math.log10( maxFreq ) - Math.log10( minFreq ) < .778 )
    return;
  
  audioMotion.setFreqRange(
    Math.max( 10, minFreq * 1 / incr | 0 ),
    Math.min( 20000, maxFreq * incr | 0 )
  );
  
  updateFreqRange();
});

// click+drag on canvas moves the analyzer window
let scaleDragX, isScaleDrag = false;
canvas.addEventListener( 'mousedown', e => {
	scaleDragX = e.offsetX;
	isScaleDrag = true;
});

canvas.addEventListener( 'mousemove', e => {
	if ( ! isScaleDrag )
		return;

	const dragRatio = ( e.offsetX - scaleDragX ) / audioMotion.canvas.width,
		    minFreq   = audioMotion.minFreq,
		    maxFreq   = audioMotion.maxFreq;

	scaleDragX = e.offsetX;

	if (
		( dragRatio >= 0 && minFreq <= 10 ) ||
		( dragRatio < 0  && maxFreq >= 22000 )
	)
		return;

	const minLog  = Math.log10( minFreq ),
			  diffLog = Math.log10( maxFreq ) - minLog,
			  newMin  = minLog * ( 1 + dragRatio * -1 ),
			  newMax  = newMin + diffLog;

	audioMotion.setFreqRange(
    Math.max( 10, 10 ** newMin ),
	  Math.min( 22000, 10 ** newMax )
  );
  
  updateFreqRange();
});

window.addEventListener( 'mouseup', e => {
	isScaleDrag = false;
});

function updateFreqRange() {
  document.getElementById('minFreq').textContent = Math.round(audioMotion.minFreq);
  document.getElementById('maxFreq').textContent = Math.round(audioMotion.maxFreq);
}

updateFreqRange();