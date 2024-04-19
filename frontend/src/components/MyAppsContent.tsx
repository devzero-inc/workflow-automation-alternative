/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IconGithub from "../assets/icons/github_icon";

const MyAppsContent = () => {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "1.2rem",
        backgroundColor: "#f4f4f4",
        color: "#CECECE",
      })}
    >
      <div
        css={css({
          display: "flex",
          gap: "1rem",
          // justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: "0.3rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "800px",
          color: "black",
        })}
      >
        <IconGithub />
        <p css={css({fontSize: "1.3rem"})}>Github</p>
      </div>
    </div>
  );
};

export default MyAppsContent;
