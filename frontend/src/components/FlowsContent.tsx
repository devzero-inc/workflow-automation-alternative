/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { getFlows } from "../../http/api";
import IconPlusCircle from "../assets/icons/plus";
import { useNavigate } from "react-router-dom";
import IconGithub from "../assets/icons/github_icon";

interface Flow {
  name: string;
  repo: string;
}

const FlowsContent = () => {
  const [flows, setFlows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFlows().then((data) => {
      setFlows(data.data);
    });
  }, []);

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
      {flows.length > 0 &&
        flows.map((flow: Flow, ind) => (
          <div
            key={ind}
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
              color: 'black'
            })}
          >
            <IconGithub/>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
              })}
            >
              <p css={css({fontSize: "1.3rem"})}>{flow.name}</p>
              <p css={css({color: "gray"})}>{flow.repo}</p>
            </div>
          </div>
        ))}
      {!flows.length && (
        <div
          css={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <p>No Flows yet. Click on the plus icon to create a new flow.</p>
          <IconPlusCircle
            css={css({
              color: "#362259",
              cursor: "pointer",
              "&:hover": {
                color: "#584E6A",
              },
            })}
            onClick={() => navigate("/add-flow")}
          />
        </div>
      )}
    </div>
  );
};

export default FlowsContent;
