package com.smartparking.service;

import com.smartparking.dto.request.LoginRequest;
import com.smartparking.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
