package com.smartparking.model.domain;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * Abstract class: tidak bisa di-instantiate langsung
 */
public abstract class Kendaraan {
    private String platNomor;
    private LocalDateTime waktuMasuk;

    public Kendaraan(String platNomor, LocalDateTime waktuMasuk) {
        this.platNomor = platNomor;
        this.waktuMasuk = waktuMasuk;
    }

    // Abstract methods — wajib di-override oleh subclass
    public abstract int hitungTarif(int durasiMenit);
    public abstract String getJenis();
    public abstract int getTarifPerJam();

    // Concrete methods — DIWARISI subclass via inheritance, tidak perlu ditulis ulang
    public int hitungDurasiMenit(LocalDateTime waktuKeluar) {
        return (int) ChronoUnit.MINUTES.between(waktuMasuk, waktuKeluar);
    }

    public int hitungLamaJam(int durasiMenit) {
        return (int) Math.ceil(durasiMenit / 60.0);
    }

    // Getter & Setter manual (tanpa Lombok)
    public String getPlatNomor() {
        return platNomor;
    }

    public void setPlatNomor(String platNomor) {
        this.platNomor = platNomor;
    }

    public LocalDateTime getWaktuMasuk() {
        return waktuMasuk;
    }

    public void setWaktuMasuk(LocalDateTime waktuMasuk) {
        this.waktuMasuk = waktuMasuk;
    }
}
