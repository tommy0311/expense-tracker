function renderRecordIcon( categoryId ) {
  switch(categoryId) {
    case 1:
      document.write('<i class="fa-solid fa-house fa-lg"></i>');
      break;
    case 2:
      document.write('<i class="fa-solid fa-van-shuttle fa-lg"></i>');
      break;
    case 3:
      document.write('<i class="fa-solid fa-face-grin-beam fa-lg"></i>');
      break;
    case 4:
      document.write('<i class="fa-solid fa-utensils fa-lg"></i>');
      break;
    case 5:
    default:
      document.write('<i class="fa-solid fa-pen fa-lg"></i>');
      break;
  }
}