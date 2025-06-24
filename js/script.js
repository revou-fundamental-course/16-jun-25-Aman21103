const shapeSelect = document.getElementById("shape-select");
const calcTypeSelect = document.getElementById("calc-type-select");
const calcTypeLabel = document.getElementById("calc-type-label");
const inputForm = document.getElementById("input-form");
const resultDiv = document.getElementById("result");

// Opsi perhitungan berdasarkan bangun
const calcOptions = {
  "persegi": ["Luas", "Keliling", "Sisi"],
  "persegi-panjang": ["Luas", "Keliling", "Panjang", "Lebar"],
  "segitiga": ["Luas", "Alas", "Tinggi"],
  "jajar-genjang": ["Luas", "Alas", "Tinggi"],
  "belah-ketupat": ["Luas", "Diagonal 1", "Diagonal 2"],
  "layang-layang": ["Luas", "Diagonal 1", "Diagonal 2"],
  "trapesium": ["Luas", "Sisi Atas", "Sisi Bawah", "Tinggi"],
  "lingkaran": ["Luas", "Keliling", "Jari-jari"],
  "kubus": ["Volume", "Luas Permukaan", "Sisi"],
  "balok": ["Volume", "Panjang", "Lebar", "Tinggi"],
  "prisma-segitiga": ["Volume", "Alas", "Tinggi Segitiga", "Tinggi Prisma"],
  "tabung": ["Volume", "Jari-jari", "Tinggi"],
  "limas-segitiga": ["Volume", "Alas", "Tinggi Segitiga", "Tinggi Limas"],
  "limas-segiempat": ["Volume", "Sisi", "Tinggi"],
  "kerucut": ["Volume", "Jari-jari", "Tinggi"],
  "bola": ["Volume", "Jari-jari"]
};

// Input form untuk tiap kombinasi
const inputTemplates = {
  "persegi": {
    "Luas": ["sisi"],
    "Keliling": ["sisi"],
    "Sisi": ["luas"]
  },
  "persegi-panjang": {
    "Luas": ["panjang", "lebar"],
    "Keliling": ["panjang", "lebar"],
    "Panjang": ["luas", "lebar"],
    "Lebar": ["luas", "panjang"]
  },
  "segitiga": {
    "Luas": ["alas", "tinggi"],
    "Alas": ["luas", "tinggi"],
    "Tinggi": ["luas", "alas"]
  },
  "jajar-genjang": {
    "Luas": ["alas", "tinggi"],
    "Alas": ["luas", "tinggi"],
    "Tinggi": ["luas", "alas"]
  },
  "belah-ketupat": {
    "Luas": ["d1", "d2"],
    "Diagonal 1": ["luas", "d2"],
    "Diagonal 2": ["luas", "d1"]
  },
  "layang-layang": {
    "Luas": ["d1", "d2"],
    "Diagonal 1": ["luas", "d2"],
    "Diagonal 2": ["luas", "d1"]
  },
  "trapesium": {
    "Luas": ["a", "b", "tinggi"],
    "Sisi Atas": ["luas", "b", "tinggi"],
    "Sisi Bawah": ["luas", "a", "tinggi"],
    "Tinggi": ["luas", "a", "b"]
  },
  "lingkaran": {
    "Luas": ["jari"],
    "Keliling": ["jari"],
    "Jari-jari": ["luas"]
  },
  "kubus": {
    "Volume": ["sisi"],
    "Luas Permukaan": ["sisi"],
    "Sisi": ["volume"]
  },
  "balok": {
    "Volume": ["panjang", "lebar", "tinggi"],
    "Panjang": ["volume", "lebar", "tinggi"],
    "Lebar": ["volume", "panjang", "tinggi"],
    "Tinggi": ["volume", "panjang", "lebar"]
  },
  "prisma-segitiga": {
    "Volume": ["alas", "tinggiSegitiga", "tinggiPrisma"],
    "Alas": ["volume", "tinggiSegitiga", "tinggiPrisma"],
    "Tinggi Segitiga": ["volume", "alas", "tinggiPrisma"],
    "Tinggi Prisma": ["volume", "alas", "tinggiSegitiga"]
  },
  "tabung": {
    "Volume": ["jari", "tinggi"],
    "Jari-jari": ["volume", "tinggi"],
    "Tinggi": ["volume", "jari"]
  },
  "limas-segitiga": {
    "Volume": ["alas", "tinggiSegitiga", "tinggiLimas"],
    "Alas": ["volume", "tinggiSegitiga", "tinggiLimas"],
    "Tinggi Segitiga": ["volume", "alas", "tinggiLimas"],
    "Tinggi Limas": ["volume", "alas", "tinggiSegitiga"]
  },
  "limas-segiempat": {
    "Volume": ["sisi", "tinggi"],
    "Sisi": ["volume", "tinggi"],
    "Tinggi": ["volume", "sisi"]
  },
  "kerucut": {
    "Volume": ["jari", "tinggi"],
    "Jari-jari": ["volume", "tinggi"],
    "Tinggi": ["volume", "jari"]
  },
  "bola": {
    "Volume": ["jari"],
    "Jari-jari": ["volume"]
  }
};

// Saat memilih bangun
shapeSelect.addEventListener("change", () => {
  const selectedShape = shapeSelect.value;
  const options = calcOptions[selectedShape];
  if (!options) return;

  // Tampilkan dropdown ke-2
  calcTypeLabel.style.display = "block";
  calcTypeSelect.style.display = "block";

  // Reset opsi dropdown
  calcTypeSelect.innerHTML = "";
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    calcTypeSelect.appendChild(option);
  });

  // Kosongkan form dan hasil
  inputForm.innerHTML = "";
  resultDiv.innerHTML = "";
});

// Saat memilih jenis perhitungan
calcTypeSelect.addEventListener("change", () => {
  const shape = shapeSelect.value;
  const calcType = calcTypeSelect.value;
  const inputs = inputTemplates[shape][calcType];

  inputForm.innerHTML = "";

  if (!inputs) return;

  // Fungsi untuk validasi input dan ubah warna tombol
  function validateInputs() {
    let allFilled = true;
    inputs.forEach(id => {
      const inputElem = document.getElementById(id);
      if (!inputElem || inputElem.value === "" || isNaN(parseFloat(inputElem.value))) {
        allFilled = false;
      }
    });
    if (allFilled) {
      button.style.backgroundColor = "green";
      button.style.color = "white";
      button.disabled = false;
    } else {
      button.style.backgroundColor = "";
      button.style.color = "";
      button.disabled = true;
    }
  }

  inputs.forEach((input) => {
    const label = document.createElement("label");
    label.for = input;
    label.textContent = input.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    const field = document.createElement("input");
    field.type = "number";
    field.id = input;
    field.required = true;

    // Tambahkan event listener untuk validasi saat input berubah
    field.addEventListener("input", validateInputs);

    inputForm.appendChild(label);
    inputForm.appendChild(field);
  });

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Hitung";
  button.onclick = () => calculate(shape, calcType);
  button.disabled = true; // tombol awalnya disabled
  inputForm.appendChild(button);
  validateInputs(); // cek validasi awal
});

// Fungsi menghitung (dipersingkat di sini - LENGKAP versi sebelumnya)
function calculate(shape, calcType) {
  const val = id => parseFloat(document.getElementById(id)?.value) || 0;
  const π = Math.PI;
  let hasil = '';

  try {
    switch (shape) {
      case "persegi":
        if (calcType === "Luas") {
          const sisi = val("sisi");
          hasil = `Luas Persegi: ${sisi * sisi}`;
        } else if (calcType === "Keliling") {
          const sisi = val("sisi");
          hasil = `Keliling Persegi: ${4 * sisi}`;
        } else if (calcType === "Sisi") {
          const luas = val("luas");
          if (luas < 0) throw new Error("Nilai luas tidak boleh negatif");
          hasil = `Sisi Persegi: ${Math.sqrt(luas)}`;
        }
        break;

      case "persegi-panjang":
        if (calcType === "Luas") {
          const panjang = val("panjang");
          const lebar = val("lebar");
          hasil = `Luas Persegi Panjang: ${panjang * lebar}`;
        } else if (calcType === "Keliling") {
          const panjang = val("panjang");
          const lebar = val("lebar");
          hasil = `Keliling Persegi Panjang: ${2 * (panjang + lebar)}`;
        } else if (calcType === "Panjang") {
          const luas = val("luas");
          const lebar = val("lebar");
          if (lebar === 0) throw new Error("Lebar tidak boleh nol");
          hasil = `Panjang Persegi Panjang: ${luas / lebar}`;
        } else if (calcType === "Lebar") {
          const luas = val("luas");
          const panjang = val("panjang");
          if (panjang === 0) throw new Error("Panjang tidak boleh nol");
          hasil = `Lebar Persegi Panjang: ${luas / panjang}`;
        }
        break;

      case "segitiga":
        if (calcType === "Luas") {
          const alas = val("alas");
          const tinggi = val("tinggi");
          hasil = `Luas Segitiga: ${(alas * tinggi) / 2}`;
        } else if (calcType === "Alas") {
          const luas = val("luas");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Alas Segitiga: ${(2 * luas) / tinggi}`;
        } else if (calcType === "Tinggi") {
          const luas = val("luas");
          const alas = val("alas");
          if (alas === 0) throw new Error("Alas tidak boleh nol");
          hasil = `Tinggi Segitiga: ${(2 * luas) / alas}`;
        }
        break;

      case "jajar-genjang":
        if (calcType === "Luas") {
          const alas = val("alas");
          const tinggi = val("tinggi");
          hasil = `Luas Jajar Genjang: ${alas * tinggi}`;
        } else if (calcType === "Alas") {
          const luas = val("luas");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Alas Jajar Genjang: ${luas / tinggi}`;
        } else if (calcType === "Tinggi") {
          const luas = val("luas");
          const alas = val("alas");
          if (alas === 0) throw new Error("Alas tidak boleh nol");
          hasil = `Tinggi Jajar Genjang: ${luas / alas}`;
        }
        break;

      case "belah-ketupat":
        if (calcType === "Luas") {
          const d1 = val("d1");
          const d2 = val("d2");
          hasil = `Luas Belah Ketupat: ${(d1 * d2) / 2}`;
        } else if (calcType === "Diagonal 1") {
          const luas = val("luas");
          const d2 = val("d2");
          if (d2 === 0) throw new Error("Diagonal 2 tidak boleh nol");
          hasil = `Diagonal 1 Belah Ketupat: ${(2 * luas) / d2}`;
        } else if (calcType === "Diagonal 2") {
          const luas = val("luas");
          const d1 = val("d1");
          if (d1 === 0) throw new Error("Diagonal 1 tidak boleh nol");
          hasil = `Diagonal 2 Belah Ketupat: ${(2 * luas) / d1}`;
        }
        break;

      case "layang-layang":
        if (calcType === "Luas") {
          const d1 = val("d1");
          const d2 = val("d2");
          hasil = `Luas Layang-layang: ${(d1 * d2) / 2}`;
        } else if (calcType === "Diagonal 1") {
          const luas = val("luas");
          const d2 = val("d2");
          if (d2 === 0) throw new Error("Diagonal 2 tidak boleh nol");
          hasil = `Diagonal 1 Layang-layang: ${(2 * luas) / d2}`;
        } else if (calcType === "Diagonal 2") {
          const luas = val("luas");
          const d1 = val("d1");
          if (d1 === 0) throw new Error("Diagonal 1 tidak boleh nol");
          hasil = `Diagonal 2 Layang-layang: ${(2 * luas) / d1}`;
        }
        break;

      case "trapesium":
        if (calcType === "Luas") {
          const a = val("a");
          const b = val("b");
          const tinggi = val("tinggi");
          hasil = `Luas Trapesium: ${((a + b) * tinggi) / 2}`;
        } else if (calcType === "Sisi Atas") {
          const luas = val("luas");
          const b = val("b");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Sisi Atas Trapesium: ${(2 * luas) / tinggi - b}`;
        } else if (calcType === "Sisi Bawah") {
          const luas = val("luas");
          const a = val("a");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Sisi Bawah Trapesium: ${(2 * luas) / tinggi - a}`;
        } else if (calcType === "Tinggi") {
          const luas = val("luas");
          const a = val("a");
          const b = val("b");
          if ((a + b) === 0) throw new Error("Jumlah sisi atas dan bawah tidak boleh nol");
          hasil = `Tinggi Trapesium: ${(2 * luas) / (a + b)}`;
        }
        break;

      case "lingkaran":
        if (calcType === "Luas") {
          const jari = val("jari");
          hasil = `Luas Lingkaran: ${π * jari * jari}`;
        } else if (calcType === "Keliling") {
          const jari = val("jari");
          hasil = `Keliling Lingkaran: ${2 * π * jari}`;
        } else if (calcType === "Jari-jari") {
          const luas = val("luas");
          if (luas < 0) throw new Error("Luas tidak boleh negatif");
          hasil = `Jari-jari Lingkaran: ${Math.sqrt(luas / π)}`;
        }
        break;

      case "kubus":
        if (calcType === "Volume") {
          const sisi = val("sisi");
          hasil = `Volume Kubus: ${sisi ** 3}`;
        } else if (calcType === "Luas Permukaan") {
          const sisi = val("sisi");
          hasil = `Luas Permukaan Kubus: ${6 * sisi * sisi}`;
        } else if (calcType === "Sisi") {
          const volume = val("volume");
          if (volume < 0) throw new Error("Volume tidak boleh negatif");
          hasil = `Sisi Kubus: ${Math.cbrt(volume)}`;
        }
        break;

      case "balok":
        if (calcType === "Volume") {
          const panjang = val("panjang");
          const lebar = val("lebar");
          const tinggi = val("tinggi");
          hasil = `Volume Balok: ${panjang * lebar * tinggi}`;
        } else if (calcType === "Panjang") {
          const volume = val("volume");
          const lebar = val("lebar");
          const tinggi = val("tinggi");
          if (lebar === 0 || tinggi === 0) throw new Error("Lebar dan tinggi tidak boleh nol");
          hasil = `Panjang Balok: ${volume / (lebar * tinggi)}`;
        } else if (calcType === "Lebar") {
          const volume = val("volume");
          const panjang = val("panjang");
          const tinggi = val("tinggi");
          if (panjang === 0 || tinggi === 0) throw new Error("Panjang dan tinggi tidak boleh nol");
          hasil = `Lebar Balok: ${volume / (panjang * tinggi)}`;
        } else if (calcType === "Tinggi") {
          const volume = val("volume");
          const panjang = val("panjang");
          const lebar = val("lebar");
          if (panjang === 0 || lebar === 0) throw new Error("Panjang dan lebar tidak boleh nol");
          hasil = `Tinggi Balok: ${volume / (panjang * lebar)}`;
        }
        break;

      case "prisma-segitiga":
        if (calcType === "Volume") {
          const alas = val("alas");
          const tinggiSegitiga = val("tinggiSegitiga");
          const tinggiPrisma = val("tinggiPrisma");
          hasil = `Volume Prisma Segitiga: ${(alas * tinggiSegitiga * tinggiPrisma) / 2}`;
        } else if (calcType === "Alas") {
          const volume = val("volume");
          const tinggiSegitiga = val("tinggiSegitiga");
          const tinggiPrisma = val("tinggiPrisma");
          if (tinggiSegitiga === 0 || tinggiPrisma === 0) throw new Error("Tinggi segitiga dan tinggi prisma tidak boleh nol");
          hasil = `Alas Prisma Segitiga: ${(2 * volume) / (tinggiSegitiga * tinggiPrisma)}`;
        } else if (calcType === "Tinggi Segitiga") {
          const volume = val("volume");
          const alas = val("alas");
          const tinggiPrisma = val("tinggiPrisma");
          if (alas === 0 || tinggiPrisma === 0) throw new Error("Alas dan tinggi prisma tidak boleh nol");
          hasil = `Tinggi Segitiga Prisma: ${(2 * volume) / (alas * tinggiPrisma)}`;
        } else if (calcType === "Tinggi Prisma") {
          const volume = val("volume");
          const alas = val("alas");
          const tinggiSegitiga = val("tinggiSegitiga");
          if (alas === 0 || tinggiSegitiga === 0) throw new Error("Alas dan tinggi segitiga tidak boleh nol");
          hasil = `Tinggi Prisma: ${(2 * volume) / (alas * tinggiSegitiga)}`;
        }
        break;

      case "tabung":
        if (calcType === "Volume") {
          const jari = val("jari");
          const tinggi = val("tinggi");
          hasil = `Volume Tabung: ${π * jari * jari * tinggi}`;
        } else if (calcType === "Jari-jari") {
          const volume = val("volume");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Jari-jari Tabung: ${Math.sqrt(volume / (π * tinggi))}`;
        } else if (calcType === "Tinggi") {
          const volume = val("volume");
          const jari = val("jari");
          if (jari === 0) throw new Error("Jari-jari tidak boleh nol");
          hasil = `Tinggi Tabung: ${volume / (π * jari * jari)}`;
        }
        break;

      case "limas-segitiga":
        if (calcType === "Volume") {
          const alas = val("alas");
          const tinggiSegitiga = val("tinggiSegitiga");
          const tinggiLimas = val("tinggiLimas");
          hasil = `Volume Limas Segitiga: ${(alas * tinggiSegitiga * tinggiLimas) / 6}`;
        } else if (calcType === "Alas") {
          const volume = val("volume");
          const tinggiSegitiga = val("tinggiSegitiga");
          const tinggiLimas = val("tinggiLimas");
          if (tinggiSegitiga === 0 || tinggiLimas === 0) throw new Error("Tinggi segitiga dan tinggi limas tidak boleh nol");
          hasil = `Alas Limas Segitiga: ${(6 * volume) / (tinggiSegitiga * tinggiLimas)}`;
        } else if (calcType === "Tinggi Segitiga") {
          const volume = val("volume");
          const alas = val("alas");
          const tinggiLimas = val("tinggiLimas");
          if (alas === 0 || tinggiLimas === 0) throw new Error("Alas dan tinggi limas tidak boleh nol");
          hasil = `Tinggi Segitiga Limas: ${(6 * volume) / (alas * tinggiLimas)}`;
        } else if (calcType === "Tinggi Limas") {
          const volume = val("volume");
          const alas = val("alas");
          const tinggiSegitiga = val("tinggiSegitiga");
          if (alas === 0 || tinggiSegitiga === 0) throw new Error("Alas dan tinggi segitiga tidak boleh nol");
          hasil = `Tinggi Limas: ${(6 * volume) / (alas * tinggiSegitiga)}`;
        }
        break;

      case "limas-segiempat":
        if (calcType === "Volume") {
          const sisi = val("sisi");
          const tinggi = val("tinggi");
          hasil = `Volume Limas Segiempat: ${(sisi * sisi * tinggi) / 3}`;
        } else if (calcType === "Sisi") {
          const volume = val("volume");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Sisi Limas Segiempat: ${Math.sqrt((3 * volume) / tinggi)}`;
        } else if (calcType === "Tinggi") {
          const volume = val("volume");
          const sisi = val("sisi");
          if (sisi === 0) throw new Error("Sisi tidak boleh nol");
          hasil = `Tinggi Limas Segiempat: ${(3 * volume) / (sisi * sisi)}`;
        }
        break;

      case "kerucut":
        if (calcType === "Volume") {
          const jari = val("jari");
          const tinggi = val("tinggi");
          hasil = `Volume Kerucut: ${(1/3) * π * jari * jari * tinggi}`;
        } else if (calcType === "Jari-jari") {
          const volume = val("volume");
          const tinggi = val("tinggi");
          if (tinggi === 0) throw new Error("Tinggi tidak boleh nol");
          hasil = `Jari-jari Kerucut: ${Math.sqrt((3 * volume) / (π * tinggi))}`;
        } else if (calcType === "Tinggi") {
          const volume = val("volume");
          const jari = val("jari");
          if (jari === 0) throw new Error("Jari-jari tidak boleh nol");
          hasil = `Tinggi Kerucut: ${(3 * volume) / (π * jari * jari)}`;
        }
        break;

      case "bola":
        if (calcType === "Volume") {
          const jari = val("jari");
          hasil = `Volume Bola: ${(4/3) * π * jari * jari * jari}`;
        } else if (calcType === "Jari-jari") {
          const volume = val("volume");
          if (volume < 0) throw new Error("Volume tidak boleh negatif");
          hasil = `Jari-jari Bola: ${Math.cbrt((3 * volume) / (4 * π))}`;
        }
        break;

      default:
        hasil = "Bangun tidak dikenali.";
    }
  } catch (error) {
    hasil = "Perhitungan gagal: " + error.message;
  }

  resultDiv.innerHTML = hasil || 'Perhitungan gagal.';
}
