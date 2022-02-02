import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    background-color: ${(prop) => prop.theme.bgColor};
    color: black;
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Helmet>
            <title>KANBAN</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
