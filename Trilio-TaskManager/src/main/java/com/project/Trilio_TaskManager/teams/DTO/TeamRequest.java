package com.project.Trilio_TaskManager.teams.DTO;

public class TeamRequest {

    private String name;       // Required when creating a team
    private Long inviteeId;    // Optional
    private Long memberId;     // Optional
    private String action;     // Optional (e.g., "invite", "remove", "accept")

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getInviteeId() {
        return inviteeId;
    }

    public void setInviteeId(Long inviteeId) {
        this.inviteeId = inviteeId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
