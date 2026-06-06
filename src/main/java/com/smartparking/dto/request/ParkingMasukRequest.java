package com.smartparking.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ParkingMasukRequest {
    
    @NotBlank(message = "Plat nomor tidak boleh kosong")
    @Size(max = 10, message = "Plat nomor maksimal 10 karakter")
    private String platNomor;

    @NotBlank(message = "Jenis kendaraan tidak boleh kosong")
    @Pattern(regexp = "^(Motor|Mobil)$", message = "Jenis kendaraan harus 'Motor' atau 'Mobil'")
    private String jenis;

    public ParkingMasukRequest() {}

    public String getPlatNomor() { return platNomor; }
    public void setPlatNomor(String platNomor) { this.platNomor = platNomor != null ? platNomor.toUpperCase() : null; }

    public String getJenis() { return jenis; }
    public void setJenis(String jenis) { this.jenis = jenis; }
}
