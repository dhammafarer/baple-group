import { styled, Box } from "primithemes";

export const Content = styled(Box)`
  font-family: ${props => props.theme.fonts.sans};
  color: ${props => props.theme.colors.text.dark};
  text-align: center;
  ${props => props.theme.devices[2]} {
    text-align: center;
  }
  & * {
    margin: 0;
    padding: 0;
  }
  & h1 {
    font-weight: ${props => props.theme.fontWeights[2]};
    margin: ${props => props.theme.sizes[3]} 0;
  }
  & h2 {
    color: ${props => props.theme.colors.primary.main};
    font-weight: ${props => props.theme.fontWeights[3]};
    font-size: ${props => props.theme.fontSizes[3]};
    margin: ${props => props.theme.sizes[3]} 0;
  }
  & p {
    font-weight: ${props => props.theme.fontWeights[3]};
    font-size: ${props => props.theme.fontSizes[2]};
    margin: ${props => props.theme.sizes[3]} 0;
    line-height: ${props => props.theme.lineHeights[2]};
  }
`;
