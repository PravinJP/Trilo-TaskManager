package com.project.Trilio_TaskManager.Task.Service;

import com.project.Trilio_TaskManager.Task.DTO.TaskRequest;
import com.project.Trilio_TaskManager.Task.Model.Task;
import com.project.Trilio_TaskManager.Task.Repository.TaskRepository;
import com.project.Trilio_TaskManager.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // Create task
    public Task createTask(TaskRequest request, Long creatorId) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setCreatedBy(userRepository.findById(creatorId).orElseThrow());

        return (Task) taskRepository.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Update task
    public Task updateTask(Long taskId, TaskRequest request) {
        Task task = (Task) taskRepository.findById(taskId).orElseThrow();
        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
            if ("completed".equalsIgnoreCase(request.getStatus())) {
                task.setCompletionTime(LocalDateTime.now());
            }
        }
        if (request.getPriority() != null) task.setPriority(request.getPriority());

        return (Task) taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}