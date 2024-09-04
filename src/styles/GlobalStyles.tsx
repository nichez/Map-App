import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  .mapboxgl-ctrl-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px 15px;
    background: #ffffff;
    border-radius: 16px;
  }

  .mapboxgl-ctrl-group .mapbox-gl-draw_ctrl-draw-btn, .mapboxgl-ctrl-group button:first-child, .mapboxgl-ctrl-group button:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    border-radius: 50%;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid black;
  }

  .mapboxgl-ctrl-group .mapbox-gl-draw_ctrl-draw-btn.active {
    background-color: #7fc99b;
  }

  .mapboxgl-ctrl-group .mapboxgl-ctrl-icon:hover {
    background-color: #0056b3;
  }

  .mapboxgl-ctrl-group .mapboxgl-ctrl-icon svg {
    fill: #ffffff;
    width: 20px;
    height: 20px;
  }

  .mapboxgl-canvas {
    border-radius: 16px;

    @media (max-width: 600px) {
        border-radius: 0;
    }
  }

  .mapboxgl-ctrl .mapboxgl-ctrl-logo {
    display: none;
  }

`;

export default GlobalStyles;
