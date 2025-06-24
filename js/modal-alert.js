document.addEventListener("DOMContentLoaded", () => {
  // Modal sudah ada di HTML, cukup ambil elemen
  const modalOverlay = document.getElementById("modal-alert-overlay");
  const closeButton = document.getElementById("modal-alert-close");

  // Tampilkan modal dengan animasi smooth dan pastikan style display flex
  modalOverlay.style.display = "flex";
  setTimeout(() => {
    modalOverlay.classList.add("show");
  }, 10);

  // Tutup modal saat tombol "MENGERTI" diklik
  closeButton.textContent = "MENGERTI";

  closeButton.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
  });

  // Tutup modal jika klik di luar konten modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("show");
    }
  });
});
