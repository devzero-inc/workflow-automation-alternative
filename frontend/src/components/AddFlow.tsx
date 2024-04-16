/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import IconEdit from "../assets/icons/edit_icon";
import Modal from "./AddConModal";

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

// Sample repos for the select dropdown, will be fetched from the backend later
const sampleRepos = [
  {
    name: "devzero",
    owner: "devzero",
    description:
      "DevZero is a platform for developers to build, share and collaborate on projects.",
  },
  {
    name: "devzero",
    owner: "devzero",
    description:
      "DevZero is a platform for developers to build, share and collaborate on projects.",
  },
  {
    name: "devzero",
    owner: "devzero",
    description:
      "DevZero is a platform for developers to build, share and collaborate on projects.",
  },
];

const AddFlow = () => {
  const [flowName, setFlowName] = useState("Name your flow");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

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
        >
          Publish
        </button>
      </div>
      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Trigger</div>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose an app
            </option>
            <option value="github">Github</option>
          </select>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose an event
            </option>
            <option value="new_issue">New Issue</option>
          </select>
          <button css={sectionContentStyle} onClick={openModal}>
            Add Connection
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Add Connection Details</h2>
            <input
              css={sectionContentStyle}
              type="text"
              placeholder="Client ID"
            />
            <input
              css={sectionContentStyle}
              type="text"
              placeholder="Client Secret"
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
              onClick={closeModal}
            >
              Submit
            </button>
          </Modal>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose a repo
            </option>
            {sampleRepos.map((repo) => (
              <option value={repo.name}>{repo.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Action</div>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose an app
            </option>
            <option value="github">Github</option>
          </select>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose an event
            </option>
            <option value="new_issue">Create Ticket</option>
          </select>
          <button css={sectionContentStyle} onClick={openModal}>Add Connection</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Add Connection Details</h2>
            <input
              css={sectionContentStyle}
              type="text"
              placeholder="Client ID"
            />
            <input
              css={sectionContentStyle}
              type="text"
              placeholder="Client Secret"
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
              onClick={closeModal}
            >
              Submit
            </button>
          </Modal>
          <select css={sectionContentStyle}>
            <option value="" disabled selected>
              Choose a repo
            </option>
            {sampleRepos.map((repo) => (
              <option value={repo.name}>{repo.name}</option>
            ))}
          </select>
          <input css={sectionContentStyle} type="text" placeholder="Title" />
          <input
            css={sectionContentStyle}
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFlow;
