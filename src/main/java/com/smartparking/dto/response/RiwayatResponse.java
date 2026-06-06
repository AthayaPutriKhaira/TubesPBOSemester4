package com.smartparking.dto.response;

import java.util.List;
import java.util.Map;
import com.smartparking.model.entity.RiwayatParkir;

public class RiwayatResponse {
    private long totalTransaksi;
    private long totalPendapatan;
    private double rataRata;
    private List<RiwayatParkir> transaksi;
    private List<Map<String, Object>> chart7Hari;

    public RiwayatResponse() {}

    public long getTotalTransaksi() { return totalTransaksi; }
    public void setTotalTransaksi(long totalTransaksi) { this.totalTransaksi = totalTransaksi; }

    public long getTotalPendapatan() { return totalPendapatan; }
    public void setTotalPendapatan(long totalPendapatan) { this.totalPendapatan = totalPendapatan; }

    public double getRataRata() { return rataRata; }
    public void setRataRata(double rataRata) { this.rataRata = rataRata; }

    public List<RiwayatParkir> getTransaksi() { return transaksi; }
    public void setTransaksi(List<RiwayatParkir> transaksi) { this.transaksi = transaksi; }

    public List<Map<String, Object>> getChart7Hari() { return chart7Hari; }
    public void setChart7Hari(List<Map<String, Object>> chart7Hari) { this.chart7Hari = chart7Hari; }
}
