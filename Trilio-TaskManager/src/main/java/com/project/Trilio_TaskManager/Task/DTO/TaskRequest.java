package com.project.Trilio_TaskManager.Task.DTO;

import lombok.Data;


public class TaskRequest {
    private String title;
    private String description;
    private String status;
    private String priority;
    private Long assignedToId;

    public TaskRequest(Long assignedToId, String description, String priority, String status, String title) {
        this.assignedToId = assignedToId;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.title = title;
    }

    public Long getAssignedToId() {
        return assignedToId;
    }

    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // user ID
}
