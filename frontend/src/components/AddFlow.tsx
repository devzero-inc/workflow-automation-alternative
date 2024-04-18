/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import IconEdit from "../assets/icons/edit_icon";
import Modal from "./AddConModal";
import {githubAuth, getRepos, storeIssues} from '../../http/api';
import { useNavigate } from "react-router-dom";

const addFlowStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100vh",
  overflowY: "auto",
  backgroundColor: "#fafafa",
  padding: "1rem",
  gap: "1rem",
});

const cardStyle = css({
  backgroundColor: "#fff",
  borderRadius: "0.3rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "800px",
  padding: "1rem",
});

const headerStyle = css({
  fontSize: "1.2rem",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const sectionStyle = css({
  // marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const sectionTitleStyle = css({
  fontSize: "1rem",
  fontWeight: "bold",
});

const sectionContentStyle = css({
  padding: "1rem",
  border: "1px solid #dcd0f5",
  borderRadius: "0.3rem",
  width: "100%",
  textAlign: "left",
  backgroundColor: "#f7fafc",
  cursor: "pointer",
  "&:focus": {
    outline: "none",
    borderColor: "#362259",
    border: "2px solid #362259",
  },
});

const AddFlow = () => {
  const [flowName, setFlowName] = useState("Name your flow");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [authUrl, setAuthUrl] = useState("");

  const [triggerApp, setTriggerApp] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [triggerRepo, setTriggerRepo] = useState("");

  const [repos, setRepos] = useState([]);

  const [actionApp, setActionApp] = useState("");
  const [actionEvent, setActionEvent] = useState("");  
  const [actionComment, setActionComment] = useState("");

  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleAuth = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await githubAuth(clientId, clientSecret);
      setAuthUrl(response.url);
    } catch (error) {
      console.error("Error authenticating with Github:", error);
    }
  }

  const fetchRepos = async () => {
    try {
      const response = await getRepos();
      const repos = response.data.map((repo:any) => (repo.name));
      setRepos(repos);
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  }

  const publishFlow = async () => {
    try {
      const response = await storeIssues(triggerRepo, actionComment, flowName);
      alert("Flow published successfully!");
      navigate('/');
    } catch (error) {
      console.log("Error storing issues:", error)
    }
  }

  return (
    <div css={addFlowStyle}>
      <div css={headerStyle}>
        <div
          css={css({
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          })}
        >
          <IconEdit />
          <input
            css={css({
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
              backgroundColor: "transparent",
              width: "fit-content",
            })}
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            placeholder="Name your flow"
          />
        </div>
        <button
          css={css({
            padding: "0.5rem 1rem",
            borderRadius: "0.3rem",
            cursor: "pointer",
            fontSize: "1.2rem",
            backgroundColor: "#362259",
            color: "white",
            border: "none",
            "&:hover": {
              backgroundColor: "#674c9f ",
            },
          })}
          onClick={publishFlow}
        >
          Publish
        </button>
      </div>
      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Trigger</div>
          <select css={sectionContentStyle} onChange={(e) => setTriggerApp(e.target.value)} value={triggerApp}>
            <option value="" disabled >
              Choose an app
            </option>
            <option value="github">Github</option>
          </select>
          <select css={sectionContentStyle} onChange={(e) => setTriggerEvent(e.target.value)} value={triggerEvent}>
            <option value="" disabled >
              Choose an event
            </option>
            <option value="new_issue">New Issue</option>
          </select>
          <button css={sectionContentStyle} onClick={openModal}>
            Add Connection
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Add Connection Details</h2>
            <form onSubmit={handleAuth} css={css({
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            })}>
              <input
                css={sectionContentStyle}
                type="text"
                placeholder="Client ID"
                onChange={(e) => setClientId(e.target.value)}
              />
              <input
                css={sectionContentStyle}
                type="text"
                placeholder="Client Secret"
                onChange={(e) => setClientSecret(e.target.value)}
              />
              <button
                css={css({
                  padding: "10px",
                  background: "#362259",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "#674c9f",
                  },
                })}
                type="submit"
              >
                Submit
              </button>
            </form>
            {authUrl &&
            <div>
              <span>Click on this URL to authenticate: </span>
              <a href={authUrl} target="_blank">Authenticate</a>
            </div>
            }
          </Modal>
          {repos.length === 0 && 
            <button 
              css={css({
                padding: "10px",
                background: "#362259",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  background: "#674c9f",
                },
              })}
              type="submit" 
              onClick={fetchRepos}
            >
              Fetch Repos
            </button>
          }
          {repos.length !==0 &&
            <select css={sectionContentStyle} onChange={(e) => setTriggerRepo(e.target.value)} value={triggerRepo}>
              <option value="" disabled >
                Choose a repo
              </option>
              {repos && repos.map((repo, ind) => (
                <option key={ind} value={repo}>{repo}</option>
              ))}
            </select>
          }
        </div>
      </div>

      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Action</div>
          <select css={sectionContentStyle} onChange={(e) => setActionApp(e.target.value)} value={actionApp}>
            <option value="" disabled >
              Choose an app
            </option>
            <option value="github">Github</option>
          </select>
          <select css={sectionContentStyle} onChange={(e) => setActionEvent(e.target.value)} value={actionEvent}>
            <option value="" disabled >
              Choose an event
            </option>
            <option value="new_comment">Create automated comment</option>
          </select>
          <input
            css={sectionContentStyle}
            type="text"
            placeholder="Comment"
            onChange={(e) => setActionComment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddFlow;
