import styled from 'styled-components';

interface WrapperProps {
    width?: number;
    height?: number;
    radius?: string | number;
}

const ImageWrapper = styled.div<WrapperProps>`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  overflow: hidden;
  border-radius: ${props => typeof props.radius === 'number' ? props.radius + 'px' : props.radius};
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity .5s;
  }
  
  &.image-loading, &.image-error {
    background: #ddd;
    
    img {
      opacity: 0;
    }
  }
  
  &.image-error:before {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ImageWrapper;
