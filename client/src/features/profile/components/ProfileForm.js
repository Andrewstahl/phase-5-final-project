import React from "react";
import Error from "../../../components/Error";
import { useSystemMode } from "../../../SystemModeContext";

export default function ProfileForm({
  userData,
  deleteConfirmation,
  errors,
  onChange,
  onUsernameSubmit,
  onPasswordSubmit,
  onDelete,
}) {
  const systemMode = useSystemMode();

  return (
    <div className="profile-change-container">
      <form
        className="profile-change-username form-formatting profile-form"
        onSubmit={onUsernameSubmit}
      >
        <label htmlFor="username">Enter New Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          id="username"
          value={userData.username}
          onChange={(e) => onChange(e)}
        />
        <input
          className={`colors-${systemMode.toLowerCase()}`}
          type="submit"
          value="Change Username"
        />
      </form>
      <form
        className="profile-change-password form-formatting profile-form"
        onSubmit={onPasswordSubmit}
      >
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          value={userData.password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          value={userData.passwordConfirmation}
          onChange={(e) => onChange(e)}
        />
        <input
          className={`colors-${systemMode.toLowerCase()}`}
          type="submit"
          value="Change Password"
        />
      </form>
      <form
        className="profile-change-delete form-formatting profile-form"
        onSubmit={onDelete}
      >
        <label htmlFor="deleteConfirmation">
          Type in "Delete" in the field below and press submit
        </label>
        <input
          type="text"
          placeholder="Enter 'Delete' below to delete account"
          name="deleteConfirmation"
          id="deleteConfirmation"
          value={deleteConfirmation}
          onChange={(e) => onChange(e)}
        />
        <input
          className="delete-account"
          type="submit"
          value="Delete Account"
        />
      </form>
      {errors.map((error) => (
        <Error key={error} error={error}></Error>
      ))}
    </div>
  );
}
