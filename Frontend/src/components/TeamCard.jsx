import React from "react";

const TeamCard = ({ team, onClick }) => {
  return (
    <div
      onClick={() => onClick(team)}
      className="border border-gray-200 rounded-lg p-4 hover:shadow cursor-pointer transition"
    >
      <h3 className="font-semibold text-blue-600">{team.name}</h3>
      <p className="text-sm text-gray-500">ID: {team.id}</p>
    </div>
  );
};

export default TeamCard;
