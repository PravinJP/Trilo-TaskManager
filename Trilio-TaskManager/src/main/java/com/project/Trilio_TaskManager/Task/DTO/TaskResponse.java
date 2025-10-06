package com.project.Trilio_TaskManager.Task.DTO;

import lombok.Data;


public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private Long assignedToId;
    private Long createdById;
    private String completionTime;
    private String createdAt;
    private String updatedAt;

    public TaskResponse(Long assignedToId, String completionTime, String createdAt, Long createdById, String description, Long id, String priority, String status, String title, String updatedAt) {
        this.assignedToId = assignedToId;
        this.completionTime = completionTime;
        this.createdAt = createdAt;
        this.createdById = createdById;
        this.description = description;
        this.id = id;
        this.priority = priority;
        this.status = status;
        this.title = title;
        this.updatedAt = updatedAt;
    }

    public Long getAssignedToId() {
        return assignedToId;
    }

    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }

    public String getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(String completionTime) {
        this.completionTime = completionTime;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}

