package com.smartparking.controller;

import com.smartparking.dto.request.LoginRequest;
import com.smartparking.dto.response.ApiResponse;
import com.smartparking.dto.response.LoginResponse;
import com.smartparking.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse loginResponse = authService.login(request);
        return ResponseEntity.ok(new ApiResponse<>("success", "Login berhasil", loginResponse));
    }
}
