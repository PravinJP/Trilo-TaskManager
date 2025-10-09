import React, { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useTeams } from "../../hooks/useTeams";

const TeamsDashboard = () => {
  const {
    createTeam,
    ownedTeams,
    joinedTeams,
    invitations,
    loading,
  } = useTeams();

  const [teamName, setTeamName] = useState("");

  const handleCreate = () => {
    if (!teamName.trim()) {
      alert("Team name cannot be empty!");
      return;
    }
    createTeam(teamName);
    setTeamName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     
      {/* Main Content */}
      <main className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Teams</h1>

        {/* Grid of 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Create a Team */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Create a Team</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team name"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Create
              </button>
            </div>
          </div>

          {/* Card 2: Invitations */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Invitations</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : invitations.length === 0 ? (
              <p className="text-gray-400">No pending invitations</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {invitations.map((inv) => (
                  <li
                    key={inv.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>{inv.team.name}</span>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
                        Accept
                      </button>
                      <button className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded">
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card 3: Teams You Own */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Teams You Own</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : ownedTeams.length === 0 ? (
              <p className="text-gray-400">You don’t own any teams</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {ownedTeams.map((team) => (
                  <li
                    key={team.id}
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => console.log("Navigate to /teams/" + team.id)}
                  >
                    {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card 4: Teams You've Joined */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Teams You’ve Joined</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : joinedTeams.length === 0 ? (
              <p className="text-gray-400">Not a member of any team</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {joinedTeams.map((team) => (
                  <li
                    key={team.id}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition">
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TeamsDashboard;
