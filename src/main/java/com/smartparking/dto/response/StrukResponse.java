package com.smartparking.dto.response;

public class StrukResponse {
    private String platNomor;
    private String jenis;
    private String waktuMasuk;
    private String waktuKeluar;
    private int durasiMenit;
    private int tarifPerJam;
    private int lamaJam;
    private int totalBayar;

    public StrukResponse() {}

    public String getPlatNomor() { return platNomor; }
    public void setPlatNomor(String platNomor) { this.platNomor = platNomor; }

    public String getJenis() { return jenis; }
    public void setJenis(String jenis) { this.jenis = jenis; }

    public String getWaktuMasuk() { return waktuMasuk; }
    public void setWaktuMasuk(String waktuMasuk) { this.waktuMasuk = waktuMasuk; }

    public String getWaktuKeluar() { return waktuKeluar; }
    public void setWaktuKeluar(String waktuKeluar) { this.waktuKeluar = waktuKeluar; }

    public int getDurasiMenit() { return durasiMenit; }
    public void setDurasiMenit(int durasiMenit) { this.durasiMenit = durasiMenit; }

    public int getTarifPerJam() { return tarifPerJam; }
    public void setTarifPerJam(int tarifPerJam) { this.tarifPerJam = tarifPerJam; }

    public int getLamaJam() { return lamaJam; }
    public void setLamaJam(int lamaJam) { this.lamaJam = lamaJam; }

    public int getTotalBayar() { return totalBayar; }
    public void setTotalBayar(int totalBayar) { this.totalBayar = totalBayar; }
}
