import React from "react";
import { useNavigate } from "react-router-dom";

export const MenuCard = ({ content, link, mini }) => {
  const navigate = useNavigate();

  if (mini) {
    return (
      <div
        className="miniMenuCard"
        onClick={() => {
          link && navigate(link);
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="menuCard"
      onClick={() => {
        link && navigate(link);
      }}
    >
      {content}
    </div>
  );
};
