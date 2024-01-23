import styled from "styled-components";



export default CircularLoader;

const Loading = styled.div`
  .loader {
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
  }

  /*
  Set the color of the icon
*/
  svg path,
  svg rect {
    fill: #fff;
  }
`;
