# TT-Spectrum Analyzer

A modern, web-based audio spectrum analyzer with real-time visualization capabilities.

## Features

- **Real-time Audio Analysis**: Visualize audio spectrum in real-time from multiple input sources
- **Multiple Input Sources**: 
  - Microphone input
  - Live audio stream (Input I)
  - Additional inputs (Input II, Input III) - ready for future implementation
- **Customizable Display Styles**: 6 different visualization styles to choose from
- **Interactive Controls**:
  - Volume control (0-200%)
  - MAX DECIBELS control (-40 dB to 0 dB)
  - MIN DECIBELS control (-120 dB to -60 dB)
  - Scale X/Y toggles
  - Peak line visualization
  - Peak mosaic display
  - FPS display
  - Freeze functionality
- **Zoom and Pan**: Use mouse wheel to zoom and click-drag to pan the frequency display
- **Peak Frequency Detection**: Shows the top 1-5 peak frequencies with adjustable count
- **Responsive Design**: Modern audio plugin-style interface that adapts to different screen sizes

## Technology Stack

- **HTML5**: Structure and audio elements
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Core functionality and audio processing
- **Web Audio API**: Real-time audio analysis
- **audioMotion-analyzer**: Core spectrum analysis engine

## Dependencies

This project utilizes the [audioMotion-analyzer](https://github.com/hvianna/audioMotion-analyzer) JavaScript library by hvianna for the core spectrum analysis functionality. The audioMotion-analyzer provides:

- High-performance FFT-based spectrum analysis
- Multiple visualization modes
- Customizable gradients and display options
- Web Audio API integration

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Main application logic
├── audioMotion-analyzer.js  # Core spectrum analyzer library
└── README.md           # This file
```

## Usage

1. Open `index.html` in a modern web browser
2. Select an input source:
   - **MIC**: Use your device's microphone (requires permission)
   - **Input I**: Live audio stream from a predefined source
3. Adjust the controls:
   - **Volume**: Control the overall audio level
   - **MAX DECIBELS**: Set the upper limit of the display range
   - **MIN DECIBELS**: Set the lower limit of the display range
   - **Display Styles**: Choose from 6 different visualization styles
   - **Display Functions**: Toggle scale displays, peak lines, and other features
4. Use mouse interactions:
   - **Mouse wheel**: Zoom in/out on the frequency scale
   - **Click and drag**: Pan across the frequency range
   - **FREEZE**: Pause the real-time analysis
   - **RESET**: Return to the default frequency range

## Configuration

The analyzer is configured with the following default settings:

- **FFT Size**: 4096 (provides good frequency resolution)
- **Frequency Range**: 10 Hz to 2100 Hz (adjustable via zoom/pan)
- **MAX DECIBELS**: -40 dB (adjustable via slider)
- **MIN DECIBELS**: -120 dB (adjustable via slider)
- **Smoothing**: 0.5 (provides balanced responsiveness)

## Browser Compatibility

This application requires a modern web browser with support for:
- Web Audio API
- ES6+ JavaScript features
- HTML5 audio elements
- CSS3 features

Recommended browsers:
- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Credits

- **Core Spectrum Analysis**: [audioMotion-analyzer](https://github.com/hvianna/audioMotion-analyzer) by hvianna
- **Interface Design**: Custom modern audio plugin-style interface
- **Audio Processing**: Web Audio API integration

## License

This project uses the audioMotion-analyzer library. Please refer to the [audioMotion-analyzer repository](https://github.com/hvianna/audioMotion-analyzer) for its licensing terms.

## Development

To modify or extend this spectrum analyzer:

1. The main application logic is in `script.js`
2. Visual styling can be adjusted in `styles.css`
3. HTML structure modifications go in `index.html`
4. The audioMotion-analyzer library provides extensive configuration options - refer to its documentation for advanced features

## Future Enhancements

- Implementation of Input II and Input III sources
- Additional visualization modes
- Export functionality for analysis data
- Preset configurations for different use cases
- Advanced filtering options
