import * as React from "react";

const styles = require("./imageBrochure.scss");

interface IProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {}

interface IState {
  isOpen: boolean;
}
export default class ImageBrochure extends React.PureComponent<IProps, IState> {
  private originImageElement = React.createRef<HTMLImageElement>();

  public constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public render() {
    const { children, style, ref: _foo1, onClick: _foo2, ...rest } = this.props;
    return (
      <React.Fragment>
        <img
          {...rest}
          ref={this.originImageElement}
          onClick={this.setBrochureOpen}
          style={{
            cursor: "pointer",
            ...style,
          }}
        >
          {children}
        </img>
        {this.state.isOpen ? this.renderBrochure() : null}
      </React.Fragment>
    );
  }

  setBrochureOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  setBrochureClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  renderBrochure = () => {
    if (!this.originImageElement) {
      return null;
    }
    const target = this.originImageElement.current;
    const naturalWidth = target.naturalWidth
      ? target.naturalWidth
      : target.width;
    const naturalHeight = target.naturalHeight
      ? target.naturalHeight
      : target.height;

    return (
      <div className={styles.brochureWrapper} onClick={this.setBrochureClose}>
        <img width={naturalWidth} height={naturalHeight} src={target.src} />
      </div>
    );
  };
}
