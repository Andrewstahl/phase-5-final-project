import React, { useRef, useState } from "react";
import { useUser } from "../../../components/App";
import { useSystemMode } from "../../../SystemModeContext";
import useUsers from "../../../utils/useUsers";

export default function NewConversationModal({ onSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const user = useUser();
  const users = useUsers();
  const systemMode = useSystemMode();

  const selectedUserRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(selectedUserRef.current.value)
  }

  return (
    <div className="conversation-modal__div">
      <div className="conversation-modal__action-buttons-div">
        <button
          onClick={() => setShowModal(!showModal)}
          className={`conversation-modal__action-button colors-${systemMode.toLowerCase()}`}
        >
          New
        </button>
      </div>
      {showModal ? (
        <div className="conversation-modal__form-div">
          <form className="conversation-modal__form" onSubmit={(e) => handleSubmit(e)}>
            <select ref={selectedUserRef} className="conversation-modal__select">
              {users
                .filter((selectedUser) => selectedUser.id !== user.id)
                .map((user) => {
                  return (
                    <option key={user.id} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
            </select>
            <input type="Submit" value="Create" className={`new-conversation-modal-submit colors-${systemMode.toLowerCase()}`}/>
          </form>
        </div>
      ) : null}
    </div>
  );
}
