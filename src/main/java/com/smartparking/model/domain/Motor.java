package com.smartparking.model.domain;

import com.smartparking.config.TarifConfig;
import java.time.LocalDateTime;

/**
 * Motor MEWARISI platNomor, waktuMasuk, hitungDurasiMenit(), hitungLamaJam()
 * dari parent class Kendaraan tanpa menulis ulang
 */
public class Motor extends Kendaraan {
    public Motor(String platNomor, LocalDateTime waktuMasuk) {
        super(platNomor, waktuMasuk);
    }

    @Override
    public String getJenis() {
        return "Motor";
    }

    @Override
    public int getTarifPerJam() {
        return TarifConfig.TARIF_MOTOR;
    }

    @Override
    public int hitungTarif(int durasiMenit) {
        int jam = (int) Math.ceil(durasiMenit / 60.0);
        return Math.max(1, jam) * TarifConfig.TARIF_MOTOR; // minimum 1 jam
    }
}
