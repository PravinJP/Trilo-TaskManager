package com.project.Trilio_TaskManager.teams.Controller;

import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.auth.repository.UserRepository;
import com.project.Trilio_TaskManager.teams.DTO.TeamRequest;
import com.project.Trilio_TaskManager.teams.Service.InvitationService;
import com.project.Trilio_TaskManager.teams.Service.TeamService;
import com.project.Trilio_TaskManager.teams.model.Invitation;
import com.project.Trilio_TaskManager.teams.model.Team;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;
    private final InvitationService invitationService;
    private final UserRepository userRepo;

    public TeamController(TeamService teamService, InvitationService invitationService, UserRepository userRepo) {
        this.teamService = teamService;
        this.invitationService = invitationService;
        this.userRepo = userRepo;
    }

    private User getCurrentUser(Authentication auth) {
        String email = auth.getName();
        return userRepo.findByEmail(email).orElseThrow();
    }

    // ✅ 1️⃣ Create a team (only name required)
    @PostMapping("/create")
    public Map<String, Object> createTeam(@RequestBody TeamRequest req, Authentication auth) {
        User user = getCurrentUser(auth);
        Team team = teamService.createTeam(req.getName(), user);
        return Map.of("status", "success", "data", Map.of("team", team));
    }

    // ✅ 2️⃣ Get teams owned by current user
    @GetMapping("/owned")
    public Map<String, Object> getOwnedTeams(Authentication auth) {
        User user = getCurrentUser(auth);
        List<Team> teams = teamService.getOwnedTeams(user);
        return Map.of("status", "success", "data", Map.of("teams", teams));
    }

    // ✅ 3️⃣ Get teams joined by current user
    @GetMapping("/joined")
    public Map<String, Object> getJoinedTeams(Authentication auth) {
        User user = getCurrentUser(auth);
        List<Team> teams = teamService.getJoinedTeams(user);
        return Map.of("status", "success", "data", Map.of("teams", teams));
    }

    // ✅ 4️⃣ Get all invitations for current user
    @GetMapping("/invitations")
    public Map<String, Object> getInvitations(Authentication auth) {
        User user = getCurrentUser(auth);
        List<Invitation> invitations = invitationService.getInvitations(user);
        return Map.of("status", "success", "data", Map.of("invitations", invitations));
    }

    // ✅ 5️⃣ Respond to an invitation (accept / reject)
    @PatchMapping("/invitations/{id}")
    public Map<String, Object> respondToInvitation(
            @PathVariable Long id,
            @RequestBody TeamRequest req,
            Authentication auth
    ) {
        User user = getCurrentUser(auth);
        invitationService.respondToInvitation(id, req.getAction(), user);
        return Map.of("status", "success", "message", "Invitation " + req.getAction() + "ed successfully");
    }

    // ✅ 6️⃣ Invite a member (teamId via path variable)
    @PostMapping("/{teamId}/invite")
    public Map<String, Object> inviteMember(
            @PathVariable Long teamId,
            @RequestBody TeamRequest req,
            Authentication auth
    ) {
        User user = getCurrentUser(auth);
        Invitation invite = teamService.inviteMember(teamId, req.getInviteeId(), user);
        return Map.of("status", "success", "data", invite);
    }

    // ✅ 7️⃣ Remove a member (teamId via path variable)
    @DeleteMapping("/{teamId}/remove-member")
    public Map<String, Object> removeMember(
            @PathVariable Long teamId,
            @RequestBody TeamRequest req
    ) {
        teamService.removeMember(teamId, req.getMemberId());
        return Map.of("status", "success", "message", "Member removed successfully");
    }
}
