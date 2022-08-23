import {
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import * as MUIStyle from "../MUIStyles";

export const SocialShare = () => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid black",
        margin: "20px",
        width: "60%",
        minWidth: "280px",
        marginLeft: "auto",
        marginRight: 'auto',
        backgroundColor: MUIStyle.white,
      }}
    >
      <h3 style={{marginBottom: '5px'}}>Tell the world 🌍</h3>
      <p>
        Why not tell the world how hard you're working on{" "}
        <em>do chuid Ghàidhlig</em>?
      </p>
      <br />
      <br />
      <p>Use the buttons below to help grow the community:</p>
      <br />
      <TwitterShareButton
        url={`http://cairtean.gordonmaloney.info`}
        title="I'm cramming Scottish Gaelic vocab with #càirtean - join me! "
      >
        <TwitterIcon size={40} round />
      </TwitterShareButton>{" "}
      <FacebookShareButton
        url={`http://cairtean.gordonmaloney.info`}
        title="I'm cramming Scottish Gaelic vocab with #càirtean - join me! "
      >
        <FacebookIcon size={40} round />
      </FacebookShareButton>{" "}
      <WhatsappShareButton
        url={`http://cairtean.gordonmaloney.info`}
        title="I'm cramming Scottish Gaelic vocab with #càirtean - join me! "
      >
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
    </div>
  );
};
