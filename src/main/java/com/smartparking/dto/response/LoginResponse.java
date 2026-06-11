package com.smartparking.dto.response;

public class LoginResponse {

    private Long id;
    private String username;
    private String role;
    private String nama;

    public LoginResponse() {}

    public LoginResponse(Long id, String username, String role, String nama) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.nama = nama;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }
}
