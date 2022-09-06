import * as MUIStyle from "../MUIStyles";
import {
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Grid, Hidden } from "@mui/material";
import { useState } from "react";
import { Box, Modal, Button } from "@mui/material";

export const Footer = () => {
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="footer">
        <Grid
          container
          spacing={0}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            
          >
            <Hidden smDown><span>Share Cairtean:</span></Hidden>
            <div>
              <TwitterShareButton
                url={`http://cairtean.gordonmaloney.info`}
                title="I'm cramming Scottish Gaelic vocab with #cairtean - join me! "
              >
                <TwitterIcon size={30} round />
              </TwitterShareButton>{" "}
              <FacebookShareButton
                url={`http://cairtean.gordonmaloney.info`}
                title="I'm cramming Scottish Gaelic vocab with #cairtean - join me! "
              >
                <FacebookIcon size={30} round />
              </FacebookShareButton><Hidden smDown>{" "}
              <WhatsappShareButton
                url={`http://cairtean.gordonmaloney.info`}
                title="I'm cramming Scottish Gaelic vocab with #cairtean - join me! "
              >
                <WhatsappIcon size={30} round />
              </WhatsappShareButton></Hidden>
            </div>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <center>
                <a href="mailto:gordonmaloney+cairtean@gmail.com?subject=Cairtean">
                  Get in touch
                </a>
              </center>
            </div>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                size="small"
                variant="contained"
                sx={MUIStyle.ButtonStyle}
                onClick={() => setOpen(true)}
              >
                Support<Hidden smDown> Cairtean</Hidden>
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...MUIStyle.ModalStyleWide,
            backgroundColor: MUIStyle.offwhite,
          }}
        >
          <h3>Support Càirtean</h3>
          <br />
          <br />
          <p>
            Càirtean is free for you to use, but it took{" "}
            <b>a huge amount of time and energy</b> to build, requires{" "}
            <b>ongoing maintenance</b>, and <b>costs money</b> to host.
            <br />
            <br />
            Alongside Càirtean, I have also built{" "}
            <a target="_blank" href="facle.netlify.app">
              <u>Facle</u>
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://cuimhne.netlify.app/">
              <u>Cuimhne</u>
            </a>
            , and have big ambitions and plans for{" "}
            <b>more Gaelic-learning software</b>.
            <br />
            <br />I know money is tight for everyone right now. But if you can
            spare just a few pounds, it will make it possible for me to carry on
            working on{" "}
            <b>this app and other tools to help people learn Gaelic</b>.
            <br />
            <br />
            <center>
              <b>
                If you've found this or any of my other apps useful, please chip
                in to support them here:
              </b>
            </center>
            <br />
            <br />
            <center>
              <Button
                size="large"
                variant="contained"
                sx={MUIStyle.ButtonStyle}
                target="_blank"
                href="http://ko-fi.com/gordonmaloney"
              >
                Chip In
              </Button>
            </center>
            <br />
          </p>
        </Box>
      </Modal>
    </>
  );
};
