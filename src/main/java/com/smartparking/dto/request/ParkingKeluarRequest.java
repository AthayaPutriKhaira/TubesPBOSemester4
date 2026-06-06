package com.smartparking.dto.request;

import jakarta.validation.constraints.NotNull;

public class ParkingKeluarRequest {

    @NotNull(message = "ID tidak boleh kosong")
    private Long id;

    public ParkingKeluarRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}
